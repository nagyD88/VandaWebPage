using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using VandasPage.Data;
using VandasPage.Models;
using VandasPage.Models.DTOs;

namespace VandasPage.Services
{
    public class UserService : IUserService
    {
        private readonly Context context;
        
        private const string EMAIL_PATTERN = @"^[a-zA-Z0-9][a-zA-Z0-9!#$%&'*+-/=?^_`{|]{0,63}@[a-zA-Z0-9-.]{0,253}.(com|net|org|hu)$";

        public UserService(Context _context)
        {
            context = _context;
            
        }
        public Task<List<User>> GetUsers()
        {
            return context.Users.Include(user => user.Levels).ToListAsync();
        }
        public Task<User>? GetUserById(long id)
        {
            return context.Users.Include(x => x.Levels.OrderBy(y => y.Index)).FirstOrDefaultAsync(x => x.Id == id);
        }
        public Task<User>? GetUserByEmail(string Email)
        {
            return context.Users.Include(x => x.Levels).FirstOrDefaultAsync(x => x.Email == Email);
        }
        public async Task<User> CreateNewUser(UserPreRegistrationDTO user)
        {
            if (context.Users.Any(x => x.Email == user.Email))
            {
                return null;
            }
            var newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Admin = user.Admin
            };
            var regUser = await context.Users.AddAsync(newUser);

            await context.SaveChangesAsync();

            return regUser.Entity;
        }

        public bool EmailValidation(string email)
        {
            return Regex.IsMatch(email, EMAIL_PATTERN);
        }

        public async Task<User> constructPassword(User user)
        {
            var userToGetPassword = context.Users.FirstOrDefault(x => x.Id == user.Id);
            if (userToGetPassword == null)
            {
                return null;
            }
            userToGetPassword.PasswordHash = user.PasswordHash;
            userToGetPassword.PasswordSalt = user.PasswordSalt;
            var updatedUser = context.Users.Update(userToGetPassword);
            await context.SaveChangesAsync();
            return updatedUser.Entity;
        }

        public async Task<bool> isEmailAndIdMatching(string email, long id)
        {
            User user = await GetUserById(id);
            if (user == null)
            {
                return false;
            }
            return user.Email == email;
        }

        public async Task<User> DeleteUser(int id)
        {
            var userToDelete = context.Users.FirstOrDefault(x => x.Id == id);
            if (userToDelete == null) { return null; }
            var userDeleted = context.Users.Remove(userToDelete);
            await context.SaveChangesAsync();
            return userDeleted.Entity;
        }

    }
}