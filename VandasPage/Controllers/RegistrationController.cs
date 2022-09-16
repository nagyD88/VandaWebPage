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
        public void RegistrationProcess(User user)//viszajelzés még kell
        {
            UsersDAO usersDAO = new UsersDAO();
            usersDAO.RegisterNewUser(user);
        }
    }
}
