﻿using System.ComponentModel.DataAnnotations;
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
        public string ReasonForApplication { get; set; }=string.Empty;
        public bool? DirectInquiry { get; set; }
        public string Communication { get; set; }=string.Empty;
        private List<Questionnaire>? _questionnaires;
        public string MBTI { get; set; }=String.Empty;
        public decimal? Price { get; set; }
        public int? NumberOfDetailsStart { get; set; }
        public HashSet<MeetingLog> MeetingLogs { get; set; }
        public int? NumberOfDetailsLeft { get; set; }
        public decimal? priceLeft { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public long RefreshTokenID { get; set; }
        public RefreshToken RefreshToken { get; set; }
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        public HashSet<Level> Levels { get; set; }

    }
}