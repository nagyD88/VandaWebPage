using Microsoft.AspNetCore.Mvc;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using MimeKit;
using MimeKit.Text;
using VandasPage.Services.EmailService;
using VandasPage.Models.DTOs;
using VandasPage.Models;
using VandasPage.Data;

namespace VandasPage.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        public EmailController(IEmailService emailService, Context context)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public IActionResult SendEmail(EmailDTO request)
        {
            _emailService.SendEmail(request);
            return Ok();
        }
        [HttpGet]
        public async Task<List<Email>> GetAllEmails()
        {
            return await _emailService.GetAllEmails();
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Email>> GetEmailById(long id)
        {
            Email email = await _emailService.GetEmailById(id);

            if (email == null)
            {
                return NotFound();
            }
            return email;
        }
    }
}