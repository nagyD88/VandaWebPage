using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.RegularExpressions;
using VandasPage.Models;
using VandasPage.Models.DTOs;
using System.Security.Cryptography;

namespace VandasPage.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<MeetingLog> MeetingLogs { get; set; }
        
        public DbSet<Question> Questions { get; set; }
        public DbSet<Questionnaire> Questionnaires { get; set; }


        private const string EMAIL_PATTERN = @"^[a-zA-Z0-9][a-zA-Z0-9!#$%&'*+-/=?^_`{|]{0,63}@[a-zA-Z0-9-.]{0,253}.(com|net|org|hu)$";

        public DbSet<Level> Levels { get; set; }

        public DbSet<EducationalMaterial> EducationMaterials { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Question>().ToTable("questions");
            modelBuilder.Entity<Questionnaire>().ToTable("questionnaires");
            modelBuilder.Entity<MeetingLog>().ToTable("meetinglogs");
            modelBuilder.Entity<Level>().ToTable("levels");
            modelBuilder.Entity<EducationalMaterial>().ToTable("educationmaterials");
        }
        public Task<List<User>> GetUsers()
        {
            return Users.Include(user=>user.Levels).ToListAsync();
        }
        public Task<User>? GetUserById(long id)
        {
                return Users.Include(x=>x.Levels).FirstOrDefaultAsync(x => x.Id == id);   
        }
        
        public async Task<User> CreateNewUser(UserPreRegistrationDTO user)
        {
            if (Users.Any(x => x.Email == user.Email))
            {
                return null;
            }
            var newUser = new User
            {
                FirstName =  user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Admin = user.Admin
            };
            var regUser = await Users.AddAsync(newUser);

            await SaveChangesAsync();

            return regUser.Entity;
        }

        public bool EmailValidation(string email)
        {
            return Regex.IsMatch(email, EMAIL_PATTERN);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<User> constructPassword(UserRegDTO userRegDTO)
        {
            var userToGetPassword = Users.FirstOrDefault(x => x.Id == userRegDTO.Id);
            if (userToGetPassword == null)
            {
                return null;
            }

            CreatePasswordHash(userRegDTO.Password, out byte[] passwordHash, out byte[] passwordSalt);
            userToGetPassword.UserName = userRegDTO.UserName;
            userToGetPassword.PasswordHash = passwordHash;
            userToGetPassword.PasswordSalt = passwordSalt;
            var updatedUser = Users.Update(userToGetPassword);
            await SaveChangesAsync();
            return updatedUser.Entity;
        }
       
        public async Task<User> UpdateUser(UserUpdateDTO user)
        {
            var userToUpdate= Users.FirstOrDefault(x=>x.Id == user.Id);
            if (userToUpdate == null)
            {
                return null;
            }
            userToUpdate.FirstName= user.FirstName;
            userToUpdate.LastName= user.LastName;
            userToUpdate.Email= user.Email;
            userToUpdate.MBTI= user.MBTI;
            userToUpdate.Communication=user.Communication;
            if (user.levelId != null)
            {
                Level level = await GetLevelById((long)user.levelId);
                userToUpdate.Levels.Add(level);
            }
            var updatedUser = Users.Update(userToUpdate);
            await SaveChangesAsync();
            return updatedUser.Entity;
        }

        public async Task<User> DeleteUser(int id)
        {
            var userToDelete = Users.FirstOrDefault(x=>x.Id == id);
            if (userToDelete == null) { return null; }
            var userDeleted =Users.Remove(userToDelete);
            await SaveChangesAsync();
            return userDeleted.Entity;
        }
            
        public Task<User> GetUserLogedIn(string password, string email)
        {
            return Users.Include(x=>x.Levels).FirstOrDefaultAsync(x=>x.Email == email );//jelszót még ellenörizni kell
        }

        public Task<List<EducationalMaterial>> GetEducationMaterials()
        {
            return EducationMaterials.ToListAsync();
        }
        public Task<List<Level>> GetLevels()
        {
            return Levels.Include(x=>x.users).Include(x=>x.educationalMaterials).OrderBy(x=> x.Index).ToListAsync();
        }
        public async Task<Level> CreateNewLevel(Level level)
        {
            var newLevel = await Levels.AddAsync(level);
            await SaveChangesAsync();
            return newLevel.Entity;
        }
        public async Task<EducationalMaterial> CreateEducationMaterial(EducationalMaterial educationalMaterial)
        {
            var newEducationMaterial = await EducationMaterials.AddAsync(educationalMaterial);
            await SaveChangesAsync();
            return newEducationMaterial.Entity;
        }

        public async Task<EducationalMaterial> GetEducationMaterialById(long id)
        {
            return await EducationMaterials.FirstOrDefaultAsync(x=>x.Id == id);
        }

        public async Task<Level> GetLevelById(long id)
        {
            return await Levels.Include(x=> x.educationalMaterials.OrderBy(x=>x.Index)).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Level> DeleteLevelById(long id)
        {
            var levelToDelete = Levels.FirstOrDefault(x => x.Id == id);
            if (levelToDelete == null) { return null; }
            var levelDeleted = Levels.Remove(levelToDelete);
            await SaveChangesAsync();
            return levelDeleted.Entity;
        }

        public async Task<EducationalMaterial> DeleteEducationMaterialById(long id)
        {
            var EducationMaterialToDelete = EducationMaterials.FirstOrDefault(x => x.Id == id);
            if (EducationMaterialToDelete == null) { return null; }
            var levelDeleted = EducationMaterials.Remove(EducationMaterialToDelete);
            await SaveChangesAsync();
            return levelDeleted.Entity;
        }
        public async Task<List<Level>> GetLevelsByCategoryName (string categoryName)
        {
            return await Levels.Include(x => x.educationalMaterials).OrderBy(x=>x.Index).ToListAsync();
        }

        public async Task<Level> UpdateLevel(Level level)
        {
            if (level == null) { return null; }
            Levels.Update(level);
            return level;
        }


        public async Task<Level> AddMaterialToLevel(long levelId, long MaterialId)
        {
            Level level = await GetLevelById(levelId);
            EducationalMaterial material = await GetEducationMaterialById(MaterialId);
            material.Index = level.educationalMaterials.Count;
            var updatedMaterial = EducationMaterials.Update(material);
            level.educationalMaterials.Add(updatedMaterial.Entity);
            var levelUpdated=Levels.Update(level);
            await SaveChangesAsync();
            return levelUpdated.Entity;
        }
        public async Task<Level> RemoveMaterialFromLevel(long levelId, long MaterialId)
        {
            Level level = await GetLevelById(levelId);
            EducationalMaterial material = await GetEducationMaterialById(MaterialId);
            level.educationalMaterials.Remove(material);
            var levelUpdated = Levels.Update(level);
            await SaveChangesAsync();
            return levelUpdated.Entity;
        }

        public async Task<List<EducationalMaterial>> ChangeEducationMaterialOrder(List<EducationalMaterial> materials)
        {
            List<EducationalMaterial> eduMaterials = new List<EducationalMaterial>();
            for(int i=0; i<materials.Count; i++)
            {
                var eduMaterial = await GetEducationMaterialById(materials[i].Id);
                eduMaterial.Index = i;
                var updatedMaterial = EducationMaterials.Update(eduMaterial);
                await SaveChangesAsync();
                eduMaterials.Add(updatedMaterial.Entity);
            }
            return eduMaterials;
        }

        public async Task<List<Level>> ChangeLevelOrder(List<LevelChangeOrderDTO> levels)
        {
            List<Level> updatedLevels= new List<Level>();
            for (int i = 0; i < levels.Count; i++)
            {
                var level = await GetLevelById(levels[i].Id);
                level.Index = i;
                var updatedLevel = Levels.Update(level);
                await SaveChangesAsync();
                updatedLevels.Add(updatedLevel.Entity);
            }
            return updatedLevels;
        }

        public async Task<User> AddlevelToUser(long userId, long levelId)
        {
            User user = await GetUserById(userId);
            Level level = await GetLevelById(levelId);
            user.Levels.Add(level);
            var updatedUser = Users.Update(user);
            await SaveChangesAsync();
            return updatedUser.Entity;
        }

    }
}

