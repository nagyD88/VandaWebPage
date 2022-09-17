using Microsoft.AspNetCore.Mvc;
using VandasPage.Models;
using VandasPage.Services;

namespace VandasPage.Controllers
{
    public class RegistrationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [Route("register/Processregister/{password}/{email}/{admin}")]
        public void RegistrationProcess(string email,string password, string admin)//viszajelzés még kell
        {
            bool Admin=admin == "true";
            User user = new User { Email = email, Admin = Admin, Password = password };
            UsersDAO usersDAO = new UsersDAO();
            usersDAO.RegisterNewUser(user);
        }
    }
}
