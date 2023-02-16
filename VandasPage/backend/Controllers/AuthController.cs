using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using VandasPage.Services;
using VandasPage.Models;
using VandasPage.Models.DTOs;
using VandasPage.Data;

namespace VandasPage.Controllers



{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Context _context;
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public AuthController(IUserService userService, IAuthService authService, Context context)
        {
            _userService = userService;
            _authService = authService;
            _context = context;
        }



        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegDTO request)
        {
            _authService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User user = await _userService.GetUserById(request.Id);

            if (user == null)
            {
                return NotFound();
            }
            if  (user.PasswordHash != null)
            {
                return BadRequest("user registered");
            }
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            User updatedUser =await _userService.constructPassword(user);
            return Ok(updatedUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLogDTO request)
        {
            User user = await _userService.GetUserByEmail(request.Email);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (!_authService.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = _authService.CreateToken(user);

            var refreshToken = _authService.GenerateRefreshToken();
            SetRefreshToken(refreshToken, user);

            return Ok(token);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken(long Id)
        {
            User user = await _userService.GetUserById(Id);

            if (user == null)
            {
                return NotFound();
            }

            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Token.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = _authService.CreateToken(user);
            var newRefreshToken = _authService.GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, user);

            return Ok(token);
        }


        private void SetRefreshToken(RefreshToken newRefreshToken, User user)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            user.RefreshToken = newRefreshToken;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
        }
    }
}