using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using VandasPage.Models;

namespace VandasPage.Data
{
    public class VandaContext : DbContext
    {
        public VandaContext(DbContextOptions<VandaContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Questionnaire> Questionnaires { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Question>().ToTable("questions");
            modelBuilder.Entity<Questionnaire>().ToTable("questionnaires");
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
        public async Task<User> UpdateUser(User user)
        {
            var updatedUser= Users.Update(user);
            await SaveChangesAsync();
            return updatedUser.Entity;
        }
            
    }
}

