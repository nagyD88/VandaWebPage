using Microsoft.AspNetCore.Mvc;
using VandasPage.Data;
using VandasPage.Models;

namespace VandasPage.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : Controller
    {
        
        private readonly VandaContext _context;
        
        public UserController(VandaContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            return await _context.GetUsers();
        }
        [HttpGet]
        [Route("api/user/{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            User user =  await _context.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }
        [HttpPost]
        public async Task<ActionResult<User>> CreateNewUser(User user)
        {
            return await _context.CreateNewUser(user);
        }
        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            return await _context.UpdateUser(user);
        }
    }
}
