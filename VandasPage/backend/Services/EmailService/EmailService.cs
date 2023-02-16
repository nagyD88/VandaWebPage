using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using VandasPage.Data;
using VandasPage.Models;
using VandasPage.Models.DTOs;


namespace VandasPage.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly Context context;

        public EmailService(IConfiguration config, Context context)
        {
            _config = config;
            this.context = context;
        }

        public void SendEmail(EmailDTO request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = request.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 465, true);
            smtp.Authenticate(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }

        public async Task<Email> GetEmailById(long id)
        {
            return await context.Emails.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Email>> GetAllEmails()
        {
            return await context.Emails.ToListAsync();
        }
    }
}