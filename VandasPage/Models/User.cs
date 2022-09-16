namespace VandasPage.Models
{

    public class User
    {

        public int Id  { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }


        private string? _reasonForApplication;
        private bool? _directInquiry;
        private string? _communication;
        private List<Questionnaire>? _questionnaires;
        private string? MBTI;
        private decimal? price;
        private int? numberOfDetails;
        private string? meetingLog;

      
    }
}