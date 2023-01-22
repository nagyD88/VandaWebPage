using VandasPage.Models;

namespace VandasPage.Services
{
    public interface IAuthService
    {
        RefreshToken GenerateRefreshToken();

        string CreateToken(User user);

        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);

        bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt);
    }
}
