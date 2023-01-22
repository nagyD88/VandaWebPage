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
        public AuthController(Context context)
        {
            _context= context;
        }
        private readonly IConfiguration _configuration;
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public AuthController(IConfiguration configuration, IUserService userService, IAuthService authService)
        {
            _configuration = configuration;
            _userService = userService;
            _authService = authService;
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var userName = _userService.GetMyName();
            return Ok(userName);
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegDTO request)
        {
            _authService.CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            User user = await _context.GetUserById(request.Id);

            if (user == null)
            {
                return NotFound();
            }
            user.UserName = request.UserName;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            var updatedUser =_context.constructPassword(user);
            return Ok(updatedUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserRegDTO request)
        {
            User user = await _context.GetUserById(request.Id);

            if (user == null)
            {
                return BadRequest("User not found.");
            }
            if (user.UserName != request.UserName)
            {
                return BadRequest("Wrong username.");
            }

            if (!_authService.VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = _authService.CreateToken(user);

            var refreshToken = _authService.GenerateRefreshToken();
            SetRefreshToken(refreshToken);

            return Ok(token);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<string>> RefreshToken(long Id)
        {
            User user = await _context.GetUserById(Id);

            if (user == null)
            {
                return NotFound();
            }

            var refreshToken = Request.Cookies["refreshToken"];

            if (!user.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (user.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = _authService.CreateToken(user);
            var newRefreshToken = _authService.GenerateRefreshToken();
            SetRefreshToken(newRefreshToken);

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

            user.RefreshToken = newRefreshToken.Token;
            user.TokenCreated = newRefreshToken.Created;
            user.TokenExpires = newRefreshToken.Expires;
        }
    }
}