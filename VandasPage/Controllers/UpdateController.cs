using Microsoft.AspNetCore.Mvc;
using VandasPage.Models;
using VandasPage.Services;

namespace VandasPage.Controllers;

public class UpdateController : Controller
{
    [HttpPut]
    [Route("update/ProcessUpdate")]
    public string RegistrationProcess([FromBody] User user)
    {
        UsersDAO usersDAO = new UsersDAO();
        bool success =usersDAO.UpdateUser(user);
        string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(success);
        return serializeObject;
    }
}