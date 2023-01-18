using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{
    public class Level
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string CategoryName { get; set; }
        public string Name { get; set; }
        public int LevelNumber { get; set; }
        public int Index { get; set; }
        public HashSet<User> users { get; set; }
        public HashSet<EducationalMaterial> educationalMaterials { get; set; }
    }
}
