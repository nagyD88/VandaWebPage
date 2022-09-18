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
        /*public IActionResult ProcessLogin(User user)
        {
            SecurityService security=new SecurityService();

            if (security.IsValid(user))
            {
                return View("LoginSuccess", user);
            }
            else
            {
                return View("LoginFailer", user);
            }
        }*/
        
        [Route("Login/ProcessLogin/{password}/{email}")]
        public string ProcessLogin(string email, string password)
        {
            User user = new User{Email = email, Password = password};
            SecurityService security=new SecurityService();
            UsersDAO usersDAO = new UsersDAO();
            

            if (security.IsValid(user))
            {

                User user2=usersDAO.FindUserByEmail(email);
                string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(user2);
                Console.WriteLine(serializeObject);
                
                return serializeObject;
                
            }
            else //viszajelzés még szükséges a hibás probálkozásról!!!
            {
                return null;
            }
            
        }
    }
}
