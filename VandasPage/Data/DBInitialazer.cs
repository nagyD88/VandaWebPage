using Microsoft.EntityFrameworkCore;
using System.Linq;
using VandasPage.Models;

namespace VandasPage.Data
{
    public class DBInitialazer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new VandaContext(
                serviceProvider.GetRequiredService<
                DbContextOptions<VandaContext>>()))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                if (context.Users.Any())
                {
                    return;
                }
                context.Users.AddRange(
                    new User
                    {
                        FirstName = "Alma",
                        LastName = "Alma",
                        Password = "alma",
                        Email = "alma@alma.hu",
                        Admin = true
                    },
                    new User
                    {
                        FirstName = "cucu",
                        LastName = "malac",
                        Password = "malac",
                        Email = "malac@malac.hu",
                        Admin = false
                    }
                 );
                context.SaveChanges();
                context.Questions.AddRange(
                    new Question
                    {

                    }
                    );

            }
        }
    }
}
