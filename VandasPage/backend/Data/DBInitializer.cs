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
                        Index=0
                    },
                    new Level
                    {
                        Name = "haladó",
                        Index=1
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
                        Levels = new HashSet<Level>{ context.Levels.FirstOrDefault(x=>x.Index==0) }
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
                        Level = context.Levels.Where(x =>  x.Index==0).First(),
                        Content ="Tancolni Jó",
                        Type = "text",
                        Index = 0
              
                    },
                    new EducationalMaterial
                    {
                        Name = "Tanc",
                        Level = context.Levels.Where(x =>  x.Index == 0).First(),
                        Content = "https://www.youtube.com/watch?v=fn3KWM1kuAw",
                        Type = "video",
                        Index = 1
                    },
                    new EducationalMaterial
                    {
                        Name = "Tanc",
                        Level = context.Levels.Where(x =>   x.Index == 0).First(),
                        Content = "https://cdn.pixabay.com/photo/2018/02/06/14/07/ease-3134828_960_720.jpg",
                        Type = "picture",
                        Index=2
                    }
                    );;
                context.SaveChanges();

            }
        }
    }
}
