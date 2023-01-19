using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models
{

    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id  { get; set; }
        [Required]
        public string Email { get; set; }
        public bool Admin { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string? ReasonForApplication { get; set; }
        public bool? DirectInquiry { get; set; }
        public string? Communication { get; set; }
        private List<Questionnaire>? _questionnaires;
        public string? MBTI { get; set; }
        public decimal? Price { get; set; }
        public int? NumberOfDetailsStart { get; set; }
        public HashSet<MeetingLog> MeetingLogs { get; set; }
        public int? NumberOfDetailsLeft { get; set; }
        public decimal? priceLeft { get; set; }
        public string? Password { get; set; }
        public HashSet<Level> Levels { get; set; }

    }
}