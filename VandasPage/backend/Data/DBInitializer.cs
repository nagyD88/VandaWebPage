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
                        UserName = "Alma",
                        PasswordHash = Encoding.ASCII.GetBytes("k8ahcyCs6OIFR/lwIPq5A3bXTP9sHfsuksiODcbY+eXbtwfcQdA7ZxpO6wK9//CsBUelGLBcGOrVIckqp1xWBw=="),
                        PasswordSalt = Encoding.ASCII.GetBytes("euWyoG6b6pewJaTCT8abS5T2sPjlRIJyW0758OdysmGg1W94R19XaA6g49WR8EDkcrOPQaBKSnaC4j0n1FXQobXIHgaFN5hZzH+uZ9JhwfVIxAGyxcOUY6jshbZAS45NDOg7zVobdrcay1TcbwxH2We/pix97hqWFIGybHLg24w="),
                        Levels = new HashSet<Level> { context.Levels.FirstOrDefault(x => x.Index == 0) }
                    },

                    new User
                    {
                        FirstName = "cucu",
                        LastName = "malac",
                        Email = "malac@malac.hu",
                        UserName = "malac",
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
                    ); ;
                context.SaveChanges();

            }
        }
    }
}
