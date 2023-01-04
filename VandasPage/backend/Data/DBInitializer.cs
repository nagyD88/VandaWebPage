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
                        StudyName = "psycho",
                        LevelNumber = 1
                    },
                    new Level
                    {
                        StudyName = "psycho",
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
                        Levels = new HashSet<Level>{ context.Levels.FirstOrDefault(x=>x.StudyName=="psycho" && x.LevelNumber==1) }
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


            }
        }
    }
}
