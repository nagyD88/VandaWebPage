using Microsoft.AspNetCore.Mvc;
using VandasPage.Data;
using VandasPage.Models;
using VandasPage.Models.DTOs;
using VandasPage.Services;

namespace VandasPage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EducationController : ControllerBase
    {
        private readonly IEducationService educationService;

        public EducationController(Context context, IEducationService educationService)
        {
            this.educationService = educationService;
        }

        [HttpGet]
        public async Task<List<EducationalMaterial>> GetAllEducationMaterials()
        {
            return await educationService.GetEducationMaterials();
        }
        [HttpPost]
        public async Task<EducationalMaterial> CreateEducatoinMatrial(EducationalMaterial educationalMaterial)
        {
            return await educationService.CreateEducationMaterial(educationalMaterial);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<EducationalMaterial>> GetEducationMaterialById(long id)
        {
            EducationalMaterial eductaionMaterial = await educationService.GetEducationMaterialById(id);
            if (eductaionMaterial == null)
            {
                return NotFound();
            }
            return eductaionMaterial;
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<EducationalMaterial>> DeleteEducationMaterial(long id)
        {
            EducationalMaterial educationMaterial = await educationService.DeleteEducationMaterialById(id);
            if (educationMaterial == null)
            {
                return NotFound();
            }
            return educationMaterial;
        }

        [HttpGet]
        [Route("level")]
        public async Task<List<Level>> GetLevels()
        {
            return await educationService.GetLevels();
        }

        [HttpPost]
        [Route("level")]
        public async Task<Level> CreateLevel(Level level)
        {
            return await educationService.CreateNewLevel(level);
        }

        [HttpGet]
        [Route("level/{id}")]
        public async Task<ActionResult<Level>> GetLevelById(long id)
        {
            Level level = await educationService.GetLevelById(id);
            if (level == null)
            {
                return NotFound();
            }
            return level;
        }

        [HttpPut]
        [Route("level/{id}")]
        public async Task<ActionResult<Level>> UpdateLevel(long id, Level level)
        {
            Level levelToUpdate = await educationService.GetLevelById(id);
            if (levelToUpdate == null || level.Id != id)
            {
                return NotFound("wrong ID");
            }
            if (educationService.UpdateLevel(level) == null) { return NotFound(); }
            return Ok(educationService.UpdateLevel(level));
        }

        [HttpPatch]
        [Route("level/{levelId}/material")]
        public async Task<ActionResult<Level>> AddnewMaterialToLevel(long levelId, long MaterialId)
        {
            Level levelToUpdate = await educationService.GetLevelById(levelId);
            EducationalMaterial material = await educationService.GetEducationMaterialById(MaterialId);
            if (levelToUpdate == null || material == null)
            {
                return NotFound("wrong ID");
            }
            if (levelToUpdate.educationalMaterials.Any(x => x.Id == MaterialId))
            {
                return BadRequest("this material alredy conected to this level");
            }
            return await educationService.AddMaterialToLevel(levelId, MaterialId);
        }

        [HttpPost("upload")]
        
        public async Task<IActionResult> UploadFile(IFormCollection data, IFormFile file)
        {
            string extension = data["extension"];
            long size = file.Length;
            string filePath = Path.GetTempPath();
            string fileName = $@"{Guid.NewGuid()}{extension}";
            string fileType = data["uploadType"];
            string MIME = file.ContentType.ToString();

            if (size > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    using (FileStream fileStream = new(filePath + "\\" + fileName, FileMode.Create, FileAccess.Write))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }
            }

            switch (fileType)
            {
                case "text":
                    Text text= new()
                    {
                        Path = filePath + "\\" + fileName,
                        ContentType= MIME
                    };
                    await educationService.CreateText(text);
                    break;
                case "picture":
                    Picture picture = new()
                    {
                        Path = filePath + "\\" + fileName,
                        ContentType = MIME
                    };
                    await educationService.CreatePicture(picture);
                    break;
                case "video":
                    Video video = new()
                    {
                        Path = filePath + "\\" + fileName,
                        ContentType = MIME
                    };
                    await educationService.CreateVideo(video);
                    break;
            }
            return Ok();
        }


        [HttpGet("picture/{id}")]
        public async Task<IActionResult> GetPicture(long id)
        {
            Picture picture = await educationService.GetPictureById(id);
            if (picture == null)
            {
                return BadRequest("wrong ID");
            }
            string path = picture.Path;
            Byte[] b = System.IO.File.ReadAllBytes(path);
            return File(b, picture.ContentType);
        }
        [HttpGet("video/{id}")]
        public async Task<IActionResult> GetVideo(long id)
        {
            Video video = await educationService.GetVideoById(id);
            if (video == null)
            {
                return BadRequest("wrong ID");
            }
            string path = video.Path;
            Byte[] b = System.IO.File.ReadAllBytes(path);
            return File(b, video.ContentType);
        }

        [HttpGet("text/{id}")]
        public async Task<IActionResult> GetText(long id)
        {
            Text text = await educationService.GetTextById(id);
            if (text == null)
            {
                return BadRequest("wrong ID");
            }
            string path = text.Path;
            Byte[] b = System.IO.File.ReadAllBytes(path);
            return File(b, text.ContentType);
        }

        [HttpPatch]
        [Route("level/{levelId}/material/remove")]
        public async Task<ActionResult<Level>> RemoveMaterialFromLevel(long levelId, long MaterialId)
        {
            Level levelToUpdate = await educationService.GetLevelById(levelId);
            EducationalMaterial material = await educationService.GetEducationMaterialById(MaterialId);
            if (levelToUpdate == null || material == null)
            {
                return NotFound("wrong ID");
            }
            if (!levelToUpdate.educationalMaterials.Any(x => x.Id == MaterialId))
            {
                return BadRequest("this material not conected to this level");
            }
            return await educationService.RemoveMaterialFromLevel(levelId, MaterialId);
        }

        [HttpPatch]
        [Route("level/materials/changeorder")]
        public async Task<ActionResult<List<EducationalMaterial>>> ChangeEducationMaterialOrder(List<EducationalMaterial> educationalMaterials)
        {
            if (!educationalMaterials.Any()) { return BadRequest("There is no education material"); }
            return await educationService.ChangeEducationMaterialOrder(educationalMaterials);
        }

        [HttpPatch]
        [Route("level/changeorder")]
        public async Task<ActionResult<List<Level>>> ChangeLevelOrder(List<LevelChangeOrderDTO> levels)
        {
            if (!levels.Any()) { return BadRequest("There is no level"); }
            return await educationService.ChangeLevelOrder(levels);
        }


        [HttpDelete]
        [Route("level/{id}")]
        public async Task<ActionResult<Level>> DeleteLevel(long id)
        {
            Level levelToDelete = await educationService.GetLevelById(id);
            if (levelToDelete == null)
            {
                return NotFound();
            }
            if (levelToDelete.educationalMaterials.Count != 0)
            {
                return BadRequest("first you have to delete the education materials");
            }
            Level level = await educationService.DeleteLevelById(id);

            return level;
        }
    }
}
