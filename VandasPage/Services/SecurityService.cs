using VandasPage.Models;

namespace VandasPage.Services
{
    public class SecurityService
    {
        List<User> users = new List<User>();

        public SecurityService()
        {
            users.Add(new User("Admin", "oliverdikker@gmail.com" ));
            users.Add(new User("1234", "alma@alma.hu"));
        }
        public bool IsValid(User user) 
        {
            return users.Any(x => x.Emial == user.Emial && x.Password== user.Password);
        }
    }
}
