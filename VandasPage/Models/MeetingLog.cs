using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{
    public class MeetingLog
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public int MeetCount { get; set; }
        public string? Log { get; set; }
    }
}
