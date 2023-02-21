using Microsoft.EntityFrameworkCore;
using VandasPage.Models;


namespace VandasPage.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<MeetingLog> MeetingLogs { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Questionnaire> Questionnaires { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Level> Levels { get; set; }

        public DbSet<EducationalMaterial> EducationMaterials { get; set; }
        public DbSet<Email> Emails { get; set; }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<User>().HasOne(a => a.RefreshToken).WithOne(a => a.User).HasForeignKey<RefreshToken>(x => x.UserId);
            modelBuilder.Entity<Question>().ToTable("questions");
            modelBuilder.Entity<Questionnaire>().ToTable("questionnaires");
            modelBuilder.Entity<MeetingLog>().ToTable("meetinglogs");
            modelBuilder.Entity<Level>().ToTable("levels");
            modelBuilder.Entity<EducationalMaterial>().ToTable("educationmaterials");
            modelBuilder.Entity<RefreshToken>().ToTable("refreshTokens");
            modelBuilder.Entity<Email>().ToTable("emails");
            modelBuilder.Entity<Picture>().ToTable("pictures");
        }
    }
}

