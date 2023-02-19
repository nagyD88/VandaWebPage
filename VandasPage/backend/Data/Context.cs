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
        public DbSet<Video> Videos { get; set; }
        public DbSet<Text> Texts { get; set; }
        public DbSet<Level> Levels { get; set; }

        public DbSet<EducationalMaterial> EducationMaterials { get; set; }
        public DbSet<Email> Emails { get; set; }

        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().ToTable("users");
            builder.Entity<User>().HasOne(a => a.RefreshToken).WithOne(a => a.User).HasForeignKey<RefreshToken>(x => x.UserId);
            builder.Entity<Question>().ToTable("questions");
            builder.Entity<Questionnaire>().ToTable("questionnaires");
            builder.Entity<MeetingLog>().ToTable("meetinglogs");
            builder.Entity<Level>().ToTable("levels");
            builder.Entity<EducationalMaterial>().ToTable("educationmaterials");
            builder.Entity<RefreshToken>().ToTable("refreshTokens");
            builder.Entity<Email>().ToTable("emails");
            builder.Entity<Picture>().ToTable("pictures");
            builder.Entity<Video>().ToTable("videos");
            builder.Entity<Text>().ToTable("texts");
        }

    }
}

