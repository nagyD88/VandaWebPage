using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using VandasPage.Models;
using VandasPage.Models.DTOs;

namespace VandasPage.Data
{
    public class VandaContext : DbContext
    {
        public VandaContext(DbContextOptions<VandaContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<MeetingLog> MeetingLogs { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Questionnaire> Questionnaires { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Question>().ToTable("questions");
            modelBuilder.Entity<Questionnaire>().ToTable("questionnaires");
            modelBuilder.Entity<MeetingLog>().ToTable("meetinglogs");
        }

        public Task<List<User>> GetUsers()
        {
            return Users.ToListAsync();
        }
        public Task<User>? GetUserById(int id)
        {
                return Users.FirstOrDefaultAsync(x => x.Id == id);   
        }

        public async Task<User> CreateNewUser(User user)
        {
            var newUser = await Users.AddAsync(user);

            await SaveChangesAsync();

            return newUser.Entity;
        }
        public async Task<User> UpdateUser(UserUpdateDTO user)
        {
            var UserToUpdate= Users.FirstOrDefault(x=>x.Id == user.Id);
            if (UserToUpdate == null)
            {
                return null;
            }
            UserToUpdate.FirstName= user.FirstName;
            UserToUpdate.LastName= user.LastName;
            UserToUpdate.Email= user.Email;
            UserToUpdate.MBTI= user.MBTI;
            UserToUpdate.Communication=user.Communication;

            var updatedUser = Users.Update(UserToUpdate);
            await SaveChangesAsync();
            return updatedUser.Entity;
        }
            
    }
}

