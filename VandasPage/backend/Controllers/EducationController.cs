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
        [HttpPost]
        public async Task<EducationalMaterial> CreateEducatoinMatrial(EducationalMaterial educationalMaterial)
        {
            return await _context.CreateEducationMaterial(educationalMaterial);
        }
        [HttpGet]
        [Route ("{id}")]
        public async Task<ActionResult<EducationalMaterial>> GetEducationMaterialById(long id)
        {
            EducationalMaterial eductaionMaterial= await _context.GetEducationMaterialById(id);
            if (eductaionMaterial == null)
            {
                return NotFound();
            }
            return eductaionMaterial;
        }
        [HttpDelete]
        [Route ("{id}")]
        public async Task<ActionResult<EducationalMaterial>> DeleteEducationMaterial(long id)
        {
            EducationalMaterial educationMaterial = await _context.DeleteEducationMaterialById(id);
            if (educationMaterial == null)
            {
                return NotFound();
            }
            return educationMaterial;
        }

        [HttpGet]
        [Route ("level")]
        public async Task<List<Level>> GetLevels()
        {
            return await _context.GetLevels();
        }

        [HttpPost]
        [Route("level")]
        public async Task<Level> CreateLevel(Level level)
        {
            return await _context.CreateNewLevel(level);
        }
        [HttpGet]
        [Route("level/{id}")]
        public async Task<ActionResult<Level>>GetLevelById(long id)
        {
            Level level = await _context.GetLevelById(id);
            if (level == null)
            {
                return NotFound();
            }
            return level;
        }

        [HttpDelete]
        [Route("level/{id}")]
        public async Task<ActionResult<Level>> DeleteLevel(long id)
        {
            Level levelToDelete = await _context.GetLevelById(id);
            if (levelToDelete.educationalMaterials.Count != 0)
            {
                return BadRequest("first you have to delete the education materials");
            }
            Level level = await _context.DeleteLevelById(id);
            if (level == null)
            {
                return NotFound();
            }
            return level;
        }
    }
}
