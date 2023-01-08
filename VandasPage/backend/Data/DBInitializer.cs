using Microsoft.EntityFrameworkCore;
using System.Linq;
using VandasPage.Models;

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
                        CategoryName = "psycho",
                        LevelNumber = 1
                    },
                    new Level
                    {
                        Name = "haladó",
                        CategoryName = "psycho",
                        LevelNumber = 2
                    }
                    );
                context.SaveChanges();
                context.Users.AddRange(
                    new User
                    {
                        FirstName = "Alma",
                        LastName = "Alma",
                        Password = "alma",
                        Email = "alma@alma.hu",
                        Admin = true,
                        Levels = new HashSet<Level>{ context.Levels.FirstOrDefault(x=>x.CategoryName=="psycho" && x.LevelNumber==1) }
                    },
                    
                    new User
                    {
                        FirstName = "cucu",
                        LastName = "malac",
                        Password = "malac",
                        Email = "malac@malac.hu",
                        Admin = false
                    }
                 ) ;
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
                        Level = context.Levels.Where(x => x.CategoryName=="psycho" && x.LevelNumber==1).First(),
                        Content ="Tancolni Jó",
                        Type = "text"
                    },
                    new EducationalMaterial
                    {
                        Name = "Tanc",
                        Level = context.Levels.Where(x => x.CategoryName == "psycho" && x.LevelNumber == 1).First(),
                        Content = "https://www.youtube.com/watch?v=fn3KWM1kuAw",
                        Type = "video"
                    },
                    new EducationalMaterial
                    {
                        Name = "Tanc",
                        Level = context.Levels.Where(x => x.CategoryName == "psycho" && x.LevelNumber == 1).First(),
                        Content = "https://cdn.pixabay.com/photo/2018/02/06/14/07/ease-3134828_960_720.jpg",
                        Type = "picture"
                    }
                    );
                context.SaveChanges();

            }
        }
    }
}
