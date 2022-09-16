using Microsoft.AspNetCore.Mvc;
using VandasPage.Models;

namespace VandasPage.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ProcessLogin(User user)
        {
            if (user.Emial=="alma@alma.hu"&& user.password == "1234")
            {
                return View("LoginSuccess", user);
            }
            else
            {
                return View("LoginFailer", user);
            }
            
        }
    }
}
