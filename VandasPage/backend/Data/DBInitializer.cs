using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using VandasPage.Models;
using VandasPage.Services;

namespace VandasPage.Data
{
    public class DBInitializer
    {

        public async static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new Context(
                serviceProvider.GetRequiredService<
                DbContextOptions<Context>>()))
            {
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
                if (context.Users.Any())
                {
                    return;
                }
                context.Levels.AddRange(
                    new Level
                    {
                        Name = "kezdő",
                        Index = 0
                    },
                    new Level
                    {
                        Name = "haladó",
                        Index = 1
                    }
                    );
                context.SaveChanges();
                context.Users.AddRange(
                    new User
                    {
                        FirstName = "Alma",
                        LastName = "Alma",
                        Email = "alma@alma.hu",
                        Admin = true,
                        PasswordHash = Encoding.ASCII.GetBytes("CEHyWslLbPTwA02ua9dxK6gfxhrdrUwJ3pvCqY06BiFjKrj3p1EIHQU9VHbrjOrQjMoE4Rn6b4L9lK+no/a+RA=="),
                        PasswordSalt = Encoding.ASCII.GetBytes("6djtf/1iqrK/V3CpqumOBa6W+rPSTlIRHJbt7Z4c+d5iYbNB24Or8t9RCG2yO0Q7qrR00SDcZwUoJ6jX46UfPTbn8wnOTrPrJlkMxtZjnvZ3dexsO7qcF7TGv6ZI2ivVMu675WoNcWHJu7YNkTVMuPswsJdd51jYUms/4Ny9sO0="),
                        Levels = new HashSet<Level> { context.Levels.FirstOrDefault(x => x.Index == 0) }
                    },

                    new User
                    {
                        FirstName = "cucu",
                        LastName = "malac",
                        Email = "malac@malac.hu",
                        Admin = false,
                        PasswordHash = Encoding.ASCII.GetBytes("s0wotvkLieuy9oYMephdotc18fAAEXSsKdhp0sW0nToTv1b9UT3E2W6CvNRQhQ7JgTzEY2+fXKCjR+aKQ0w36A=="),
                        PasswordSalt = Encoding.ASCII.GetBytes("f4cHp0ZCcyP/qe40TuMf8EvQpJvpfNAv68xWRzbk//bA+dILTs7eUolp1CanZvV5PP/lAwlQv5MOKz9ATx69Yge7gWmJaNnPlW0H0f+qj2EMqX1VnZ+Q6/IWu4A7PByyhxAG3k9Y4lv6wdXJiLSkHBeQjzU1VVw8ZHKjxCQ3rOo=")
                    }
                    );
                context.SaveChanges();


                context.Questionnaires.AddRange(
                    new Questionnaire
                    {
                        Title = "Test"
                    }
                    );
                context.SaveChanges();

                context.Questions.AddRange(
                    new Question
                    {
                        QuestionAsk = "Nah mizu?",

                        Questionnaire = context.Questionnaires.Where(x => x.Title == "Test").First(),
                    },
                    new Question
                    {
                        QuestionAsk = "A nyuszik szeretnek furulyázni?",

                        Questionnaire = context.Questionnaires.Where(x => x.Title == "Test").First(),
                    }
                    );
                context.SaveChanges();

                context.MeetingLogs.AddRange(
                     new MeetingLog
                     {
                         MeetCount = 1,
                         Log = "király volt",
                         User = context.Users.Where(x => x.Id == 1).First()
                     }
                     );
                context.SaveChanges();

                context.EducationMaterials.AddRange(
                    new EducationalMaterial
                    {
                        Name = "Tanc",
                        Level = context.Levels.Where(x => x.Index == 0).First(),
                        Content = "Tancolni Jó",
                        Type = "text",
                        Index = 0

                    },
                    new EducationalMaterial
                    {
                        Name = "Tanc",
                        Level = context.Levels.Where(x => x.Index == 0).First(),
                        Content = "https://www.youtube.com/watch?v=fn3KWM1kuAw",
                        Type = "video",
                        Index = 1
                    },
                    new EducationalMaterial
                    {
                        Name = "Tanc",
                        Level = context.Levels.Where(x => x.Index == 0).First(),
                        Content = "https://cdn.pixabay.com/photo/2018/02/06/14/07/ease-3134828_960_720.jpg",
                        Type = "picture",
                        Index = 2
                    }
                    ); 
                context.SaveChanges();

                context.Emails.AddRange(
                   new Email
                   {
                       Name = "Registration Email",
                       To = string.Empty,
                       Subject = "registrálj Oktató honlapon",
                       Body = "a következő linken kereszül tudsz regisztrálni az oktató honlapra:"
                   });
                context.SaveChanges();

            }
        }
    }
}
