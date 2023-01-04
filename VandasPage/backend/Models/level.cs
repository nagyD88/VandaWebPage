using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{
    public class Level
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string StudyName { get; set; }
        public int LevelNumber { get; set; }
    }
}
