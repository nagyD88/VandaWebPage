using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using VandasPage.Models;
using VandasPage.Services;

namespace VandasPage.Controllers
{
    public class RegistrationController : Controller
    {
        [HttpPost]
        [Route("register/ProcessRegister")]
        public string RegistrationProcess([FromBody] User user)
        {
            UsersDAO usersDAO = new UsersDAO();
            bool success =usersDAO.RegisterNewUser(user);
            string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(success);
            return serializeObject;
        }
    }
}
