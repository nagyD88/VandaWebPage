using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{
    public class Question
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Required]
        public string QuestionAsk { get; set; }
        [Required]
        public int[] AnswerOptions { get; set; }
        public int Answer { get ; set; }
        public int Index { get ; set; }
        [Required]
        public Questionnaire Questionnaire { get; set; }

    }
}

