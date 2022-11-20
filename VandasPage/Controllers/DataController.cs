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

    [Route("/Data/GetAllSettableDataByID/{ID}")]
    public string GetAllSettableDataByID(string ID)
    {
        int Id = Int32.Parse(ID);
        User user = usersDao.FindUserByID(Id);
        string serializeObject = Newtonsoft.Json.JsonConvert.SerializeObject(user);
        return serializeObject;
    }
}