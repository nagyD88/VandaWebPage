using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{
    public class EducationalMaterial
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
        public Level? Level { get; set; }
        public int? Index { get; set; } 
    }
}
