using VandasPage.Models;
using VandasPage.Models.DTOs;

namespace VandasPage.Services.EmailService
{
    public interface IEmailService
    {
        void SendEmail(EmailDTO request);
        Task<Email> GetEmailById(long id);
        Task<List<Email>> GetAllEmails();
    }
}