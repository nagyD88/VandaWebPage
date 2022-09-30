﻿namespace VandasPage.Models
{

    public class User
    {

        public int Id  { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Admin { get; set; }
        public string Name { get; set; }
        public string? ReasonForApplication { get; set; }
        public bool? DirectInquiry { get; set; }
        public string? Communication { get; set; }
        private List<Questionnaire>? _questionnaires;
        public string? MBTI { get; set; }
        public decimal? Price { get; set; }
        public int? NumberOfDetailsStart { get; set; }
        public string? MeetingLog { get; set; }
        public int? NumberOfDetailsLeft { get; set; }
        public decimal? priceLeft { get; set; }

        public void PayADetail(decimal amount)
        {
            NumberOfDetailsLeft--;
            priceLeft -= amount;
        }

        public decimal? GetEvenAmounts()
        {
            return priceLeft / NumberOfDetailsLeft;
        }


    }
}