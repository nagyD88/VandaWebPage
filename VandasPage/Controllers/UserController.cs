using Microsoft.AspNetCore.Mvc;

namespace VandasPage.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
