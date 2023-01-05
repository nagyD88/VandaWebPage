using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.RegularExpressions;
using VandasPage.Models;
using VandasPage.Models.DTOs;


namespace VandasPage.Data
{
    public class VandaContext : DbContext
    {
        public VandaContext(DbContextOptions<VandaContext> options) : base(options)
        {
        }
        private const string EMAIL_PATTERN = @"^[a-zA-Z0-9][a-zA-Z0-9!#$%&'*+-/=?^_`{|]{0,63}@[a-zA-Z0-9-.]{0,253}.(com|net|org|hu)$";
        private  Regex emailRe = new Regex(EMAIL_PATTERN);
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
        public Task<User>? GetUserById(long id)
        {
                return Users.FirstOrDefaultAsync(x => x.Id == id);   
        }

        public async Task<User> CreateNewUser(UserRegistrationDTO user)
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
            
    }
}

