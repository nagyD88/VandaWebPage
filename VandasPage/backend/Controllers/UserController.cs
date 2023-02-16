using Microsoft.AspNetCore.Mvc;
using VandasPage.Data;
using VandasPage.Models;
using VandasPage.Models.DTOs;
using VandasPage.Services;

namespace VandasPage.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {

        private readonly Context _context;
        private readonly IUserService userService;

        public UserController(Context context, IUserService userService)
        {
            _context = context;
            this.userService = userService;
        }
        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            return await userService.GetUsers();
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<User>> GetUserById(long id)
        {
            User user = await _context.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }




        [HttpPost]
        public async Task<ActionResult<User>> CreateNewUser(UserPreRegistrationDTO user)
        {
            bool isValid = _context.EmailValidation(user.Email);
            if (!isValid)
            {
                return BadRequest("Invalid email address");
            }

            User newUser = await _context.CreateNewUser(user);
            if (newUser == null)
            {
                return BadRequest("This email is already registered");
            }
            //küldeni emailt az uj regisztrálonak!
            return newUser;
        }

        [HttpPost]
        [Route("ismatching")]
        public async Task<ActionResult<bool>> isEmailAndIdMatching(IdEmailDTO idEmailDTO)
        {
            string email = idEmailDTO.Email;
            long id=idEmailDTO.Id;
            if (email == null)
            {
                return false;
            }

            return await _context.isEmailAndIdMatching(email, id);
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(UserUpdateDTO user)
        {
            if (await _context.GetUserById(user.Id) == null)
            {
                return NotFound();
            }
            return await _context.UpdateUser(user);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var userDeleted = await _context.DeleteUser(id);
            if (userDeleted == null)
            {
                return NotFound();
            }
            return Ok(userDeleted);
        }

        [HttpPatch]
        [Route("{userId}/addlevel")]
        public async Task<ActionResult<User>> AddlevelToUser(long userId, long levelId)
        {
            var user = await _context.GetUserById(userId);
            if (user == null)
            {
                return NotFound("No User found!");
            }
            var level = await _context.GetLevelById(levelId);
            if (level == null)
            {
                return NotFound("NO level found");
            }
            var userUpdated = await _context.AddlevelToUser(userId, levelId);
            return userUpdated;
        }
    }
}
