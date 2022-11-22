using Microsoft.EntityFrameworkCore;
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
    }
}

