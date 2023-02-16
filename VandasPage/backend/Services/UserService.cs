using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using VandasPage.Data;
using VandasPage.Models;

namespace VandasPage.Services
{
    public class UserService : IUserService
    {
        private readonly Context context;

        public UserService(Context _context)
        {
            context = _context;
        }
        public Task<List<User>> GetUsers()
        {
            return context.Users.Include(user => user.Levels).ToListAsync();
        }
    }
}