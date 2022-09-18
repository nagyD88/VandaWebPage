using Microsoft.AspNetCore.Mvc;
using VandasPage.Models;
using VandasPage.Services;

namespace VandasPage.Controllers;

public class DataController : Controller
{
    UsersDAO usersDao = new UsersDAO();
    [Route("/Data/GetAllEmailNameAndId")]
    public string GetAllEmailNameAndId()
    {
        
        List<User> users = usersDao.GetAllEmailNameAndId();
        string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(users);
        return serializeObject;
    }
}