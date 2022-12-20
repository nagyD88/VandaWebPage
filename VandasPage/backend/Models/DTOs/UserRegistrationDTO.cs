using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models.DTOs
{
    public class UserRegistrationDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public bool Admin { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
    }
}