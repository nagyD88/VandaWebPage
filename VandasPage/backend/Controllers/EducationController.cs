using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Drawing.Imaging;
using VandasPage.Data;
using VandasPage.Models;
using VandasPage.Models.DTOs;

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
        public async Task<List<EducationalMaterial>> GetAllEducationMaterials()
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
        
        [HttpPut]
        [Route("level/{id}")]
        public async Task<ActionResult<Level>> UpdateLevel(long id , Level level)
        {
            Level levelToUpdate = await _context.GetLevelById(id);
            if (levelToUpdate == null|| level.Id!=id)
            {
                return NotFound("wrong ID");
            }
            if (_context.UpdateLevel(level) == null) { return NotFound(); }
            return Ok(_context.UpdateLevel(level));
        }

        [HttpPatch]
        [Route("level/{levelId}/material")]
        public async Task<ActionResult<Level>> AddnewMaterialToLevel(long levelId, long MaterialId)
        {
            Level levelToUpdate = await _context.GetLevelById(levelId);
            EducationalMaterial material = await _context.GetEducationMaterialById(MaterialId);
            if (levelToUpdate == null|| material == null)
            {
                return NotFound("wrong ID");
            }
            if (levelToUpdate.educationalMaterials.Any(x => x.Id == MaterialId))
            {
                return BadRequest("this material alredy conected to this level");
            }
            return await _context.AddMaterialToLevel(levelId, MaterialId);
        }
        [HttpPost]
        [Route("picture")]
        public async Task<EducationalMaterial> CreateMaterialWithPicture(EduMaterialWithPictureDTO eduMaterial)
        {
            Picture picture = await CreatePictureAsync(eduMaterial.File);
            EducationalMaterial educationalMaterial = new EducationalMaterial()
            {
                Picture = picture,
                Name = eduMaterial.Name,
                Type = eduMaterial.Type
            };
            return await _context.CreateEducationMaterial(educationalMaterial);
        }
        private async Task<Picture> CreatePictureAsync(IFormFile file)
        {
            long size = file.Length;
            var filePath = Path.GetTempPath();
            var fileName = $@"{Guid.NewGuid()}.Jpeg";

            Picture picture = new Picture
            {
                Path = filePath + "\\" + fileName
            };
                if (file.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await file.CopyToAsync(memoryStream);
                        
                        using (var img = Image.FromStream(memoryStream))
                        {
                            img.Save(filePath+"\\"+fileName, ImageFormat.Jpeg);
                        }
                    }
                }
            Picture newPicture =await _context.CreatePicture(picture);      
            // Process uploaded files
            return newPicture;
        }

        [HttpGet("picture/{id}")]
        public async Task<IActionResult> GetPicture(long id)
        {
            Picture picture =await _context.GetPictureById(id); 
            if (picture == null) 
            {
                return BadRequest("wrong ID"); 
            }
            string path = picture.Path;
            Byte[] b = System.IO.File.ReadAllBytes(path);        
            return File(b, "image/Jpeg");
        }


        [HttpPatch]
        [Route("level/{levelId}/material/remove")]
        public async Task<ActionResult<Level>> RemoveMaterialFromLevel(long levelId, long MaterialId)
        {
            Level levelToUpdate = await _context.GetLevelById(levelId);
            EducationalMaterial material = await _context.GetEducationMaterialById(MaterialId);
            if (levelToUpdate == null || material == null)
            {
                return NotFound("wrong ID");
            }
            if (!levelToUpdate.educationalMaterials.Any(x => x.Id == MaterialId))
            {
                return BadRequest("this material not conected to this level");
            }
            return await _context.RemoveMaterialFromLevel(levelId, MaterialId);
        }

        [HttpPatch]
        [Route("level/materials/changeorder")]
        public async Task<ActionResult<List<EducationalMaterial>>> ChangeEducationMaterialOrder(List<EducationalMaterial> educationalMaterials)
        {
            if (!educationalMaterials.Any()) { return BadRequest("There is no education material"); }
            return await _context.ChangeEducationMaterialOrder(educationalMaterials);
        }

        [HttpPatch]
        [Route("level/changeorder")]
        public async Task<ActionResult<List<Level>>> ChangeLevelOrder(List<LevelChangeOrderDTO> levels)
        {
            if (!levels.Any()) { return BadRequest("There is no level"); }
            return await _context.ChangeLevelOrder(levels);
        }


        [HttpDelete]
        [Route("level/{id}")]
        public async Task<ActionResult<Level>> DeleteLevel(long id)
        {
            Level levelToDelete = await _context.GetLevelById(id);
            if (levelToDelete == null)
            {
                return NotFound();
            }
            if (levelToDelete.educationalMaterials.Count != 0)
            {
                return BadRequest("first you have to delete the education materials");
            }
            Level level = await _context.DeleteLevelById(id);
            
            return level;
        }
    }
}
