using Microsoft.AspNetCore.Mvc;
using VandasPage.Data;
using VandasPage.Models;
using VandasPage.Models.DTOs;

namespace VandasPage.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        
        private readonly Context _context;
        
        public UserController(Context context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            return await _context.GetUsers();
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<User>> GetUserById(long id)
        {
            User user =  await _context.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }


        //first try version
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> LoginUser(loginDTO login)
        {
            string password = login.Password;
            string email = login.Email;
            User user= await _context.GetUserLogedIn(password, email);
            if (User == null)
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

            User newUser=await _context.CreateNewUser(user);
            if (newUser == null)
            {
                return BadRequest("This email is already registered");
            }
            //küldeni emailt az uj regisztrálonak!
            return newUser;
        }


        [HttpPut]
        [Route("registration")]
        public async Task<ActionResult<User>> registrationUser(UserRegDTO user)
        {
            if (await _context.GetUserById(user.Id) == null)
            {
                return NotFound();
            }
            return await _context.constructPassword(user);
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
            var userDeleted= await _context.DeleteUser(id);
            if (userDeleted == null)
            {
                return NotFound();
            }
            return Ok(userDeleted);
        }
    }
}
