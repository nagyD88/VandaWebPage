using System.ComponentModel.DataAnnotations;

namespace VandasPage.Models.DTOs
{
    public class UserUpdateDTO
    {
        [Required]
        public long Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Communication { get; set; }
        public string? MBTI { get; set; }
        public long? levelId { get; set; }
    }
}
