using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{
    public class Text
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; init; }
        public string Path { get; init; }
        public string ContentType { get; set; }
    }
}
