using VandasPage.Models;
using VandasPage.Models.DTOs;

namespace VandasPage.Services
{
    public interface IEducationService
    {
        Task<List<EducationalMaterial>> GetEducationMaterials();
        Task<List<Level>> GetLevels();
        Task<Level> CreateNewLevel(Level level);
        Task<EducationalMaterial> CreateEducationMaterial(EducationalMaterial educationalMaterial);
        Task<EducationalMaterial> GetEducationMaterialById(long id);
        Task<Level> GetLevelById(long id);
        Task<Level> DeleteLevelById(long id);
        Task<EducationalMaterial> DeleteEducationMaterialById(long id);
        Task<Level> UpdateLevel(Level level);
        Task<Level> AddMaterialToLevel(long levelId, long MaterialId);
        Task<Level> RemoveMaterialFromLevel(long levelId, long MaterialId);
        Task<List<EducationalMaterial>> ChangeEducationMaterialOrder(List<EducationalMaterial> materials);
        Task<List<Level>> ChangeLevelOrder(List<LevelChangeOrderDTO> levels);
        Task<User> AddlevelToUser(long userId, long levelId);
        Task<Picture> GetPictureById(long id);
        Task<Picture> CreatePicture(Picture picture);
        Task<User> UpdateUser(UserUpdateDTO user);
    }
}
