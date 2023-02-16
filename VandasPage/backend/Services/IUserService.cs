using VandasPage.Models;
using VandasPage.Models.DTOs;

namespace VandasPage.Services
{
    public interface IUserService
    {
        Task<List<User>> GetUsers();
        Task<User>? GetUserById(long id);
        Task<User>? GetUserByEmail(string Email);
        Task<User> CreateNewUser(UserPreRegistrationDTO user);
        bool EmailValidation(string email);
        Task<User> constructPassword(User user);
        Task<bool> isEmailAndIdMatching(string email, long id);
        Task<User> UpdateUser(UserUpdateDTO user);
        Task<User> DeleteUser(int id);
    }
}