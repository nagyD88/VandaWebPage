using VandasPage.Models;

namespace VandasPage.Services
{
    public class SecurityService
    {
        UsersDAO usersDAO = new UsersDAO();
        public SecurityService()
        {
        }
        public bool IsValid(User user) 
        {
            return usersDAO.IsUserByEmailAndPassword(user);
        }
    }
}
