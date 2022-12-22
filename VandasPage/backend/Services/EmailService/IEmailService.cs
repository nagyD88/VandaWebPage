using VandasPage.Models.DTOs;

namespace VandasPage.Services.EmailService
{
    public interface IEmailService
    {
        void SendEmail(EmailDTO request);
    }
}