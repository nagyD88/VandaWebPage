using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{
    public class Picture
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Path { get; set; }
    }
}
