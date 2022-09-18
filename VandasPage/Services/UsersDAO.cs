using System.Data.SqlClient;
using VandasPage.Models;

namespace VandasPage.Services
{
    public class UsersDAO
    {
        string connectionString = @"Data Source=(localdb)\MSSQLLocalDB;
Initial Catalog=VandasWebDataBase;Integrated Security=True;
Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;
ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
        public bool IsUserByEmailAndPassword(User user)
        {
            bool success = false;
            string SQLstatment = "SELECT * FROM dbo.Users WHERE EMAIL= @email AND PASSWORD= @password";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(SQLstatment, connection);
                command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 100).Value = user.Email;
                command.Parameters.Add("@password", System.Data.SqlDbType.VarChar, 40).Value = user.Password;


                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    Console.WriteLine(reader);
                    if (reader.HasRows)
                    {
                        success = true;
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }

            return success;
        }

        public User FindUserByEmail(string email)
        {
            User user = new User();
            string SQLstatment = "SELECT * FROM dbo.Users WHERE EMAIL= @email";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(SQLstatment, connection);
                command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 100).Value = email;

                    connection.Open();
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        user.Admin = (bool)reader["Admin"];
                        user.Email = reader["EMAIL"].ToString();
                        user.Id = (int)reader["ID"];
                    }
                    connection.Close();
                }

            
            }

            
            return user;
        }


        public bool IsUserByEmail(User user)
            {
                bool success = false;
                string SQLstatment = "SELECT * FROM dbo.Users WHERE EMAIL= @email";
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    SqlCommand command = new SqlCommand(SQLstatment, connection);
                    command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 100).Value = user.Email;


                    try
                    {
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader();
                        if (reader.HasRows)
                        {
                            success = true;
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }

                return success;
            }

            public bool RegisterNewUser(User user)
            {
                bool success = false;
                if (!IsUserByEmail(user))
                {
                    string SQLstatment =
                        "Insert Into dbo.Users (EMAIL, PASSWORD, ADMIN) values (@email, @password, @admin);";
                    using (SqlConnection connection = new SqlConnection(connectionString))
                    {
                        SqlCommand command = new SqlCommand(SQLstatment, connection);
                        command.Parameters.Add("@email", System.Data.SqlDbType.VarChar, 100).Value = user.Email;
                        command.Parameters.Add("@password", System.Data.SqlDbType.VarChar, 40).Value = user.Password;
                        command.Parameters.Add("@admin", System.Data.SqlDbType.Bit).Value = user.Admin;


                        try
                        {
                            connection.Open();
                            int recordsAffected = command.ExecuteNonQuery();
                            success = true;
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine(ex.Message);
                        }
                    }
                }

                return success;
            }

            public List<(string, int)> GetAllNameAndId()
            {
                throw new NotImplementedException();
            }
        }
    }