using System.Data.SqlClient;
using VandasPage.Models;

namespace VandasPage.Services
{
    public class UsersDAO
    {

        public bool IsUserByEmailAndPassword(User user)
        {
            throw new NotImplementedException();
        }

        public User FindUserByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public bool IsUserByEmail(User user)
        {
            throw new NotImplementedException();
        }

        public bool RegisterNewUser(User user)
        {
            throw new NotImplementedException();
        }


        public bool UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAllEmailNameAndId()
        {
            throw new NotImplementedException();
        }

        public User FindUserByID(int ID)
        {
            throw new NotImplementedException();
        }
    }
}