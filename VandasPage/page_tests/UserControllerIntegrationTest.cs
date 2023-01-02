using VandasPage.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Xunit;
using System.Text;
using VandasPage.Models.DTOs;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace TestProject
{
    public class ControllerIntegrationTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public ControllerIntegrationTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        private JsonSerializerOptions options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };


        [Theory]
        [InlineData("api/user/-1")]

        public async Task Get_EndpointsReturnBadrequestAndCorrectContentType(string url)
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync(url);

            // Assert
            Assert.Equal(404, (int)response.StatusCode); // Status Code 200-299
            Assert.Equal("application/problem+json; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [InlineData("api/user")]
        [InlineData("api/user/1")]

        public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync(url);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }
        [Fact]
        public async Task Post_Api_UserReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new UserPreRegistrationDTO
            {
                Email = "test@test.hu",
                FirstName = "Sanyi",
                LastName = "Small",
                Admin = false
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(stringPayload, Encoding.UTF8, "application/json");
            var client = _factory.CreateClient();
            // Act
            var response = await client.PostAsync("api/user", content);
            string json = await response.Content.ReadAsStringAsync();
            User user = JsonSerializer.Deserialize<User>(json, options)!;
            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
            Assert.Equal("Sanyi", user.FirstName);
        }

        [Fact]
        public async Task Post_Api_User_Twice_ReturnBadRequestAndCorrectContentType()
        {
            // Arrange
            var payload = new UserPreRegistrationDTO
            {
                Email = "test@test.hu",
                FirstName = "Sanyi",
                LastName = "Small",
                Admin = false
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(stringPayload, Encoding.UTF8, "application/json");
            var client = _factory.CreateClient();
            
            var responseFirst = await client.PostAsync("api/user", content);
            // Act
            var response = await client.PostAsync("api/user", content);
            string json = await response.Content.ReadAsStringAsync();
            User user = JsonSerializer.Deserialize<User>(json, options)!;
            // Assert
            Assert.Equal(400, (int)response.StatusCode); 
            Assert.Equal("application/problem+json; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }

        [Fact]
        public async Task Put_Api_UserReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new UserPreRegistrationDTO
            {
                Email = "test@test.hu",
                FirstName = "Sanyi",
                LastName = "Small",
                Admin = false
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");
            var client = _factory.CreateClient();
            
            var postResponse = await client.PostAsync("api/user", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            User user = JsonSerializer.Deserialize<User>(json, options)!;

            
            var putPayload = new UserUpdateDTO
            {
                Id = user.Id,
                Email = "alma@alma.hu",
                FirstName = "Sándor",
                LastName = "Kiss",
                MBTI = "alka",
                Communication = "almát enni jó"
            };

            var putStringPayload = JsonConvert.SerializeObject(putPayload);
            // Act
            var putContent = new StringContent(putStringPayload, Encoding.UTF8, "application/json");
            var putResponse = await client.PutAsync($"api/user", putContent);
            
            var getResponse = await client.GetAsync($"api/user/{user.Id}");
            string updatedJson = await getResponse.Content.ReadAsStringAsync();
            User updatedUser = JsonSerializer.Deserialize<User>(updatedJson, options)!;
            var deleteResponse = await client.DeleteAsync($"api/user/{updatedUser.Id}");
            // Assert

            putResponse.EnsureSuccessStatusCode();
            Assert.Equal("alma@alma.hu", updatedUser.Email);
            Assert.Equal("application/json; charset=utf-8", putResponse.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Put_Api_UserReturnNotfoundIfBadId()
        {
            // Arrange
            var client = _factory.CreateClient();
            var putPayload = new UserUpdateDTO
            {
                Id = -7,
                Email = "alma@alma.hu",
                FirstName = "Sándor",
                LastName = "Kiss",
                MBTI = "alka",
                Communication = "almát enni jó"
            };


            var putStringPayload = JsonConvert.SerializeObject(putPayload);
            var putContent = new StringContent(putStringPayload, Encoding.UTF8, "application/json");
            // Act
            var putResponse = await client.PutAsync($"api/user", putContent);

            // Assert
            Assert.Equal(404, (int)putResponse.StatusCode);
            Assert.Equal("application/problem+json; charset=utf-8", putResponse.Content.Headers.ContentType.ToString());
        }

        [Fact]
        public async Task Delete_Api_UserReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new UserPreRegistrationDTO
            {
                Email = "alma@test.hu",
                FirstName = "Sanyi",
                LastName = "Small",
                Admin = false
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");
            var client = _factory.CreateClient();

            var postResponse = await client.PostAsync("api/user", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            User user = JsonSerializer.Deserialize<User>(json, options)!;

            // Act
            
            var deleteResponse = await client.DeleteAsync($"api/user/{user.Id}");
            string deleteJson = await postResponse.Content.ReadAsStringAsync();
            User deletedUser = JsonSerializer.Deserialize<User>(deleteJson, options)!;
            // Assert
            deleteResponse.EnsureSuccessStatusCode();
            Assert.Equal("alma@test.hu", deletedUser.Email);
            Assert.Equal("application/json; charset=utf-8", deleteResponse.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task _Api_UserReturnNotfoundIfBadId()
        {
            // Arrange
            var client = _factory.CreateClient();




            // Act
            var deleteResponse = await client.DeleteAsync($"api/user/-7");

            // Assert
            Assert.Equal(404, (int)deleteResponse.StatusCode);
            Assert.Equal("application/problem+json; charset=utf-8", deleteResponse.Content.Headers.ContentType.ToString());
        }
        [Fact]
        public async Task login_Api_UserReturnSuccessAndCorrectContentType()
        { 
            // Arrange
            var payload = new UserPreRegistrationDTO
            {
                Email = "test@test.hu",
                FirstName = "Sanyi",
                LastName = "Small",
                Admin = false
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");
            var client = _factory.CreateClient();

            var postResponse = await client.PostAsync("api/user", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            User user = JsonSerializer.Deserialize<User>(json, options)!;


            var putPayload = new UserRegDTO
            {
                Id = user.Id,
                Password = "alma"
            };

            var putStringPayload = JsonConvert.SerializeObject(putPayload);
            // Act
            var putContent = new StringContent(putStringPayload, Encoding.UTF8, "application/json");
            var putResponse = await client.PutAsync($"api/user/registration", putContent);

            var getResponse = await client.GetAsync($"api/user/{user.Id}");
            string updatedJson = await getResponse.Content.ReadAsStringAsync();
            User updatedUser = JsonSerializer.Deserialize<User>(updatedJson, options)!;
            var deleteResponse = await client.DeleteAsync($"api/user/{updatedUser.Id}");
            // Assert

            putResponse.EnsureSuccessStatusCode();
            Assert.Equal("alma", updatedUser.Password);
            Assert.Equal("application/json; charset=utf-8", putResponse.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Put_registration_Password_Api_UserReturnNotfoundIfBadId()
        {
            // Arrange
            var client = _factory.CreateClient();
            var putPayload = new UserRegDTO
            {
                Id = -7,
                Password = "alma"
            };


            var putStringPayload = JsonConvert.SerializeObject(putPayload);
            var putContent = new StringContent(putStringPayload, Encoding.UTF8, "application/json");
            // Act
            var putResponse = await client.PutAsync($"api/user/registration", putContent);

            // Assert
            Assert.Equal(404, (int)putResponse.StatusCode);
            Assert.Equal("application/problem+json; charset=utf-8", putResponse.Content.Headers.ContentType.ToString());
        }
    }
}