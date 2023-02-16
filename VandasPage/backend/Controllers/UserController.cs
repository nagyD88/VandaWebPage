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

        private readonly IEducationService educationService;

        public UserController(Context context, IUserService userService, IEducationService educationService)
        {
            _context = context;
            this.userService = userService;
            this.educationService = educationService;
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
            User user = await userService.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }




        [HttpPost]
        public async Task<ActionResult<User>> CreateNewUser(UserPreRegistrationDTO user)
        {
            bool isValid = userService.EmailValidation(user.Email);
            if (!isValid)
            {
                return BadRequest("Invalid email address");
            }

            User newUser = await userService.CreateNewUser(user);
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

            return await userService.isEmailAndIdMatching(email, id);
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(UserUpdateDTO user)
        {
            if (await userService.GetUserById(user.Id) == null)
            {
                return NotFound();
            }
            return await userService.UpdateUser(user);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var userDeleted = await userService.DeleteUser(id);
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
            var user = await userService.GetUserById(userId);
            if (user == null)
            {
                return NotFound("No User found!");
            }
            var level = await educationService.GetLevelById(levelId);
            if (level == null)
            {
                return NotFound("NO level found");
            }
            var userUpdated = await educationService.AddlevelToUser(userId, levelId);
            return userUpdated;
        }
    }
}
