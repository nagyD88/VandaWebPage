using Microsoft.AspNetCore.Mvc;
using VandasPage.Models;
using VandasPage.Services;

namespace VandasPage.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
       
        [HttpPost]
        [Route("Login/ProcessLogin")]
        public string ProcessLogin([FromBody] User user)
        {
            SecurityService security=new SecurityService();
            UsersDAO usersDAO = new UsersDAO();
            
            if (security.IsValid(user))
            {

                User user2=usersDAO.FindUserByEmail(user.Email);
                string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(user2);
                Console.WriteLine(serializeObject);
                
                return serializeObject;
                
            }
            else 
            {
                return Newtonsoft.Json.JsonConvert.SerializeObject(false);
            }
            
        }
    }
}
