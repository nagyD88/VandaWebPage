using System.Data.SqlClient;
using VandasPage.Models;

namespace VandasPage.Services
{
    public class UsersDAO
    {
        string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=VandasWebDataBase;
                                       Integrated Security=True;Connect Timeout=30;Encrypt=False;
                                        TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        public bool FindUserByEmailAndPassword(User user)
        {
            bool success=false;
            string SQLstatment = "SELECT * FROM dbo.Users WHERE EMAIL= @email AND PASSWORD= @password";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(SQLstatment, connection);
                command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 100).Value=user.Email;
                command.Parameters.Add("@password", System.Data.SqlDbType.VarChar,40).Value = user.Password;


                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        success = true;
                    }
                }
                catch(Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            } 
            return success;
        }
    }
}
