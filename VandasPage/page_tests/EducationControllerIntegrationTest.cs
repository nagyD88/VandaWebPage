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

namespace page_tests
{
    public class EducationControllerIntegrationTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public EducationControllerIntegrationTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            client = _factory.CreateClient();
        }

        private JsonSerializerOptions options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        private HttpClient client;

        [Theory]
        [InlineData("api/education")]
        [InlineData("api/education/level")]
        [InlineData("api/education/1")]

        public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
        {
            // Arrange

            // Act
            var response = await client.GetAsync(url);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }

        [Fact]
        public async Task Post_Api_educationReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(stringPayload, Encoding.UTF8, "application/json");
            
            // Act
            var response = await client.PostAsync("api/education", content);
            string json = await response.Content.ReadAsStringAsync();
            EducationalMaterial material = JsonSerializer.Deserialize<EducationalMaterial>(json, options)!;
            var deleteResponse = await client.DeleteAsync($"api/education/{material.Id}");
            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
            Assert.Equal("szurkolás", material.Name);
        }

    }
}
