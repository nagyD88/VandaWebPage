using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
        [Route("register/ProcessRegister/{email}/{password}/{admin}")]
        public string RegistrationProcess(string email, string password, string admin)
        {
            bool Admin = admin == "true"; 
            User user = new User{Email = email, Password = password, Admin = Admin};
            UsersDAO usersDAO = new UsersDAO();
            bool success =usersDAO.RegisterNewUser(user);
            string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(success);
            return serializeObject;
        }
    }
}
