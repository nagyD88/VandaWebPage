using System.ComponentModel.DataAnnotations;

namespace VandasPage.Models.DTOs
{
    public class UserRegistrationDTO
    {
        [Required, EmailAddress(ErrorMessage ="Invalid email address")]
        public string Email { get; set; }
        [Required]
        public bool Admin { get; set; }
        [Required, MinLength(1)]
        public string FirstName { get; set; }
        [Required, MinLength(1)]
        public string LastName { get; set; }
    }
}