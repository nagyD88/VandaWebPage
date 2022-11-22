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
    }
}
