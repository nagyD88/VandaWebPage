namespace VandasPage.Models
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
        public string Communication { get; set; }
        private List<Questionnaire>? _questionnaires;
        public string? MBTI { get; set; }
        public decimal? price { get; set; }
        public int? NumberOfDetailsStart { get; set; }
        public string? MeetingLog { get; set; }
        public int? NumberOfDetailsLeft { get; private set; }
        public decimal? priceLeft { get; private set; }


    }
}