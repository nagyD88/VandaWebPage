using Microsoft.EntityFrameworkCore;
using VandasPage.Data;
using VandasPage.Models;
using VandasPage.Models.DTOs;

namespace VandasPage.Services
{
    public class EducationService : IEducationService
    {
        private readonly Context context;
        private readonly IUserService userService;

        public EducationService(Context _context, IUserService userService)
        {
            context = _context;
            this.userService = userService;
        }

        public Task<List<EducationalMaterial>> GetEducationMaterials()
        {
            return context.EducationMaterials.ToListAsync();
        }

        public Task<List<Level>> GetLevels()
        {
            return context.Levels.Include(x => x.users).Include(x => x.educationalMaterials).OrderBy(x => x.Index).ToListAsync();
        }

        public async Task<Level> CreateNewLevel(Level level)
        {
            var newLevel = await context.Levels.AddAsync(level);
            await context.SaveChangesAsync();
            return newLevel.Entity;
        }

        public async Task<EducationalMaterial> CreateEducationMaterial(EducationalMaterial educationalMaterial)
        {
            var newEducationMaterial = await context.EducationMaterials.AddAsync(educationalMaterial);
            await context.SaveChangesAsync();
            return newEducationMaterial.Entity;
        }
        public async Task<EducationalMaterial> GetEducationMaterialById(long id)
        {
            return await context.EducationMaterials.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Level> GetLevelById(long id)
        {
            return await context.Levels.Include(x => x.educationalMaterials.OrderBy(x => x.Index)).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Level> DeleteLevelById(long id)
        {
            var levelToDelete = context.Levels.FirstOrDefault(x => x.Id == id);
            if (levelToDelete == null) { return null; }
            var levelDeleted = context.Levels.Remove(levelToDelete);
            await context.SaveChangesAsync();
            return levelDeleted.Entity;
        }
        public async Task<EducationalMaterial> DeleteEducationMaterialById(long id)
        {
            var EducationMaterialToDelete = context.EducationMaterials.FirstOrDefault(x => x.Id == id);
            if (EducationMaterialToDelete == null) { return null; }
            var levelDeleted = context.EducationMaterials.Remove(EducationMaterialToDelete);
            await context.SaveChangesAsync();
            return levelDeleted.Entity;
        }

        public async Task<Level> UpdateLevel(Level level)
        {
            if (level == null) { return null; }
            context.Levels.Update(level);
            return level;
        }
        public async Task<Level> AddMaterialToLevel(long levelId, long MaterialId)
        {
            Level level = await GetLevelById(levelId);
            EducationalMaterial material = await GetEducationMaterialById(MaterialId);
            material.Index = level.educationalMaterials.Count;
            var updatedMaterial = context.EducationMaterials.Update(material);
            level.educationalMaterials.Add(updatedMaterial.Entity);
            var levelUpdated = context.Levels.Update(level);
            await context.SaveChangesAsync();
            return levelUpdated.Entity;
        }
        public async Task<Level> RemoveMaterialFromLevel(long levelId, long MaterialId)
        {
            Level level = await GetLevelById(levelId);
            EducationalMaterial material = await GetEducationMaterialById(MaterialId);
            level.educationalMaterials.Remove(material);
            var levelUpdated = context.Levels.Update(level);
            await context.SaveChangesAsync();
            return levelUpdated.Entity;
        }
        public async Task<List<EducationalMaterial>> ChangeEducationMaterialOrder(List<EducationalMaterial> materials)
        {
            List<EducationalMaterial> eduMaterials = new List<EducationalMaterial>();
            for (int i = 0; i < materials.Count; i++)
            {
                var eduMaterial = await GetEducationMaterialById(materials[i].Id);
                eduMaterial.Index = i;
                var updatedMaterial = context.EducationMaterials.Update(eduMaterial);
                await context.SaveChangesAsync();
                eduMaterials.Add(updatedMaterial.Entity);
            }
            return eduMaterials;
        }
        public async Task<List<Level>> ChangeLevelOrder(List<LevelChangeOrderDTO> levels)
        {
            List<Level> updatedLevels = new List<Level>();
            for (int i = 0; i < levels.Count; i++)
            {
                var level = await GetLevelById(levels[i].Id);
                level.Index = i;
                var updatedLevel = context.Levels.Update(level);
                await context.SaveChangesAsync();
                updatedLevels.Add(updatedLevel.Entity);
            }
            return updatedLevels;
        }
        public async Task<User> AddlevelToUser(long userId, long levelId)
        {
            User user = await userService.GetUserById(userId);
            Level level = await GetLevelById(levelId);
            user.Levels.Add(level);
            var updatedUser = context.Users.Update(user);
            await context.SaveChangesAsync();
            return updatedUser.Entity;
        }
        public async Task<Picture> GetPictureById(long id)
        {
            return await context.Pictures.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Picture> CreatePicture(Picture picture)
        {
            var newPicture = await context.Pictures.AddAsync(picture);
            await context.SaveChangesAsync();
            return newPicture.Entity;
        }
        public async Task<User> UpdateUser(UserUpdateDTO user)
        {
            var userToUpdate = context.Users.FirstOrDefault(x => x.Id == user.Id);
            if (userToUpdate == null)
            {
                return null;
            }
            userToUpdate.FirstName = user.FirstName;
            userToUpdate.LastName = user.LastName;
            userToUpdate.Email = user.Email;
            userToUpdate.MBTI = user.MBTI;
            userToUpdate.Communication = user.Communication;
            if (user.levelId != null)
            {
                Level level = await GetLevelById((long)user.levelId);
                userToUpdate.Levels.Add(level);
            }
            var updatedUser = context.Users.Update(userToUpdate);
            await context.SaveChangesAsync();
            return updatedUser.Entity;
        }
    }
}
