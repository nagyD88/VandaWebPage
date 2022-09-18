using Microsoft.AspNetCore.Mvc;
using VandasPage.Models;
using VandasPage.Services;

namespace VandasPage.Controllers;

public class DataController : Controller
{
    [Route("/Data/GetAllEmailNameAndId")]
    public string GetAllEmailNameAndId()
    {
        UsersDAO usersDao = new UsersDAO();
        List<User> users = usersDao.GetAllEmailNameAndId();
        string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(users);
        return serializeObject;
    }
}