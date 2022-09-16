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

        [Route("Login/ProcessLogin/{password}/{email}")]
        public string ProcessLogin(string email, string password)
        {
            User user = new User{Email = email, Password = password};
            SecurityService security=new SecurityService();

            if (security.IsValid(user))
            {
                string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(user);
                Console.WriteLine(serializeObject);
                
                return serializeObject;
                
            }
            else
            {
                return null;
            }
            
        }
    }
}
