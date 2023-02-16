using VandasPage.Models;

namespace VandasPage.Services
{
    public interface IUserService
    {
        Task<List<User>> GetUsers();
    }
}