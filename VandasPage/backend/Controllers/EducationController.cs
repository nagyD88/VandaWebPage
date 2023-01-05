using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VandasPage.Data;
using VandasPage.Models;

namespace VandasPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ControllerBase
    {
        private readonly Context _context;

        public EducationController(Context context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<List<EducationalMaterial>> GetAllUsers()
        {
            return await _context.GetEducationMaterials();
        }
        [HttpGet]
        [Route ("level")]
        public async Task<List<Level>> GetLevels()
        {
            return await _context.GetLevels();
        }
    }
}
