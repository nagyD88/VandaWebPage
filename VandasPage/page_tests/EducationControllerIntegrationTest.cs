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
using System.Collections.Generic;

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
        [Fact]
        public async Task Post_Api_levelReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var content = new StringContent(stringPayload, Encoding.UTF8, "application/json");

            // Act
            var response = await client.PostAsync("api/education/level", content);
            string json = await response.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;
            var deleteResponse = await client.DeleteAsync($"api/education/{level.Id}");
            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
            Assert.Equal("cumi", level.CategoryName);
        }


        [Fact]
        public async Task Delete_Api_EucationReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");
            

            var postResponse = await client.PostAsync("api/education", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            EducationalMaterial educationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(json, options)!;

            // Act

            var deleteResponse = await client.DeleteAsync($"api/education/{educationMaterial.Id}");
            string deleteJson = await postResponse.Content.ReadAsStringAsync();
            EducationalMaterial deletedEducationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(deleteJson, options)!;
            // Assert
            deleteResponse.EnsureSuccessStatusCode();
            Assert.Equal("szurkolás", deletedEducationMaterial.Name);
            Assert.Equal("application/json; charset=utf-8", deleteResponse.Content.Headers.ContentType?.ToString());
        }

        [Theory]
        [InlineData("api/education/-7")]
        [InlineData("api/education/level/-7")]
        public async Task delete_Api_educationReturnNotfoundIfBadId(string url)
        {
            // Arrange
          
            // Act
            var deleteResponse = await client.DeleteAsync(url);

            // Assert
            Assert.Equal(404, (int)deleteResponse.StatusCode);
            Assert.Equal("application/problem+json; charset=utf-8", deleteResponse.Content.Headers.ContentType.ToString());
        }
        [Fact]
        public async Task Delete_Api_LevelReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;

            // Act

            var deleteResponse = await client.DeleteAsync($"api/education/level/{level.Id}");
            string deleteJson = await postResponse.Content.ReadAsStringAsync();
            Level deletedLevel = JsonSerializer.Deserialize<Level>(deleteJson, options)!;
            // Assert
            deleteResponse.EnsureSuccessStatusCode();
            Assert.Equal("cumi", deletedLevel.CategoryName);
            Assert.Equal("application/json; charset=utf-8", deleteResponse.Content.Headers.ContentType?.ToString());
        }
    }
}
