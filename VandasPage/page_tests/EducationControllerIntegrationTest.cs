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
using System.Linq;

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
                Name = "Test",
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
        public async Task Delete_Api_EducationReturnSuccessAndCorrectContentType()
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
                Name = "Test",
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
            string deleteJson = await deleteResponse.Content.ReadAsStringAsync();
            Level deletedLevel = JsonSerializer.Deserialize<Level>(deleteJson, options)!;
            // Assert
            deleteResponse.EnsureSuccessStatusCode();
            Assert.Equal("cumi", deletedLevel.CategoryName);
            Assert.Equal("application/json; charset=utf-8", deleteResponse.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Delete_Api_Level_when_there_is_EducationMaterial_in_itReturnCorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                Name = "Test",
                educationalMaterials = new HashSet<EducationalMaterial> { 
                    new EducationalMaterial
                    {
                    Content = "hajrá",
                    Name = "szurkolás",
                    Type = "Text"
                    }
                },
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;

            // Act

            var deleteResponse = await client.DeleteAsync($"api/education/level/{level.Id}");
            string deleteJson = await deleteResponse.Content.ReadAsStringAsync();
            Level deletedLevel = JsonSerializer.Deserialize<Level>(deleteJson, options)!;
            // Assert
            Assert.Equal(404, (int)deleteResponse.StatusCode);
            
            Assert.Equal("application/problem+json; charset=utf-8", deleteResponse.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task patch_Api_Add_material_to_level_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                Name = "Test",
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;

            var materialPayload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var materialStringPayload = JsonConvert.SerializeObject(materialPayload);
            var materialPostContent = new StringContent(materialStringPayload, Encoding.UTF8, "application/json");


            var materialPostResponse = await client.PostAsync("api/education", materialPostContent);
            string materialJson = await materialPostResponse.Content.ReadAsStringAsync();
            EducationalMaterial educationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(materialJson, options)!;
            
            var patchStringPayload = JsonConvert.SerializeObject(educationMaterial.Id);
            var patchContent = new StringContent(patchStringPayload, Encoding.UTF8, "application/json");
            // 
            var addResponse = await client.PatchAsync($"/api/Education/level/{level.Id}/material?MaterialId={educationMaterial.Id}", patchContent);
            var removeResponse = await client.PatchAsync($"api/Education/level/{level.Id}/material/remove?MaterialId={educationMaterial.Id}", patchContent);
            var deleteResponse = await client.DeleteAsync($"api/education/level/{level.Id}");
            string patchJson = await addResponse.Content.ReadAsStringAsync();
            Level patchLevel = JsonSerializer.Deserialize<Level>(patchJson, options)!;
            // Assert
            addResponse.EnsureSuccessStatusCode();
            Assert.Contains(patchLevel.educationalMaterials, x => x.Id==educationMaterial.Id);
            Assert.Equal("application/json; charset=utf-8", addResponse.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task patch_Api_Add_material_to_level_when_Material_alredy_conected_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                Name = "Test",
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;

            var materialPayload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var materialStringPayload = JsonConvert.SerializeObject(materialPayload);
            var materialPostContent = new StringContent(materialStringPayload, Encoding.UTF8, "application/json");


            var materialPostResponse = await client.PostAsync("api/education", materialPostContent);
            string materialJson = await materialPostResponse.Content.ReadAsStringAsync();
            EducationalMaterial educationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(materialJson, options)!;

            var patchStringPayload = JsonConvert.SerializeObject(educationMaterial.Id);
            var patchContent = new StringContent(patchStringPayload, Encoding.UTF8, "application/json");
            // 
            var addResponse = await client.PatchAsync($"/api/Education/level/{level.Id}/material?MaterialId={educationMaterial.Id}", patchContent);
            var addResponse2 = await client.PatchAsync($"/api/Education/level/{level.Id}/material?MaterialId={educationMaterial.Id}", patchContent);
            var removeResponse = await client.PatchAsync($"api/Education/level/{level.Id}/material/remove?MaterialId={educationMaterial.Id}", patchContent);
            var deleteResponse = await client.DeleteAsync($"api/education/level/{level.Id}");
            string patchJson = await addResponse.Content.ReadAsStringAsync();
            Level patchLevel = JsonSerializer.Deserialize<Level>(patchJson, options)!;
            // Assert
            
            Assert.Contains(patchLevel.educationalMaterials, x => x.Id == educationMaterial.Id);
            Assert.Equal("text/plain; charset=utf-8", addResponse2.Content.Headers.ContentType?.ToString());
        }


        [Fact]
        public async Task patch_Api_Remove_material_from_level_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                Name = "Test",
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;

            var materialPayload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var materialStringPayload = JsonConvert.SerializeObject(materialPayload);
            var materialPostContent = new StringContent(materialStringPayload, Encoding.UTF8, "application/json");


            var materialPostResponse = await client.PostAsync("api/education", materialPostContent);
            string materialJson = await materialPostResponse.Content.ReadAsStringAsync();
            EducationalMaterial educationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(materialJson, options)!;

            var patchStringPayload = JsonConvert.SerializeObject(educationMaterial.Id);
            var patchContent = new StringContent(patchStringPayload, Encoding.UTF8, "application/json");
            // 
            var addResponse = await client.PatchAsync($"api/Education/level/{level.Id}/material?MaterialId={educationMaterial.Id}", patchContent);
            var removeResponse = await client.PatchAsync($"api/Education/level/{level.Id}/material/remove?MaterialId={educationMaterial.Id}", patchContent);
            var deleteResponse = await client.DeleteAsync($"api/education/level/{level.Id}");
            string patchJson = await removeResponse.Content.ReadAsStringAsync();
            Level patchLevel = JsonSerializer.Deserialize<Level>(patchJson, options)!;
            // Assert
            addResponse.EnsureSuccessStatusCode();
            Assert.DoesNotContain(patchLevel.educationalMaterials, x => x.Id == educationMaterial.Id);
            Assert.Equal("application/json; charset=utf-8", addResponse.Content.Headers.ContentType?.ToString());
        }


        [Theory]
        [InlineData("api/Education/level/-7/material?")]
        [InlineData("api/Education/level/-7/material/remove?")]
        public async Task AddOrRemove_if_wrong_Level_ID_returns_correctContentType(string url)
        {
            var materialPayload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var materialStringPayload = JsonConvert.SerializeObject(materialPayload);
            var materialPostContent = new StringContent(materialStringPayload, Encoding.UTF8, "application/json");


            var materialPostResponse = await client.PostAsync("api/education", materialPostContent);
            string materialJson = await materialPostResponse.Content.ReadAsStringAsync();
            EducationalMaterial educationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(materialJson, options)!;

            var patchStringPayload = JsonConvert.SerializeObject(educationMaterial.Id);
            var patchContent = new StringContent(patchStringPayload, Encoding.UTF8, "application/json");
            // 
            var Response = await client.PatchAsync($"{ url}?MaterialId={educationMaterial.Id}", patchContent);

            Assert.Equal("text/plain; charset=utf-8", Response.Content.Headers.ContentType?.ToString());
        }

        [Theory]
        [InlineData("")]
        [InlineData("/remove")]
        public async Task AddOrRemove_if_wrong_Material_ID_returns_correctContentType(string URLlending)
        {
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                Name = "Test",
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;
            var patchStringPayload = JsonConvert.SerializeObject(-7);
            var patchContent = new StringContent(patchStringPayload, Encoding.UTF8, "application/json");
            // 
            var Response = await client.PatchAsync($"api/Education/level/{level.Id}/material{URLlending}?MaterialId=-7", patchContent);

            Assert.Equal("text/plain; charset=utf-8", Response.Content.Headers.ContentType?.ToString());
        }


        [Fact]
        public async Task patch_Api_add_material_to_level_when_alredy_there_CorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                Name = "Test",
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;

            var materialPayload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var materialStringPayload = JsonConvert.SerializeObject(materialPayload);
            var materialPostContent = new StringContent(materialStringPayload, Encoding.UTF8, "application/json");


            var materialPostResponse = await client.PostAsync("api/education", materialPostContent);
            string materialJson = await materialPostResponse.Content.ReadAsStringAsync();
            EducationalMaterial educationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(materialJson, options)!;

            var patchStringPayload = JsonConvert.SerializeObject(educationMaterial.Id);
            var patchContent = new StringContent(patchStringPayload, Encoding.UTF8, "application/json");
            // 
            var addResponse = await client.PatchAsync($"api/Education/level/{level.Id}/material?MaterialId={educationMaterial.Id}", patchContent);
            var addResponse2 = await client.PatchAsync($"api/Education/level/{level.Id}/material?MaterialId={educationMaterial.Id}", patchContent);
            var removeResponse = await client.PatchAsync($"api/Education/level/{level.Id}/material/remove?MaterialId={educationMaterial.Id}", patchContent);
            var deleteResponse = await client.DeleteAsync($"api/education/level/{level.Id}");
            string patchJson = await removeResponse.Content.ReadAsStringAsync();
            Level patchLevel = JsonSerializer.Deserialize<Level>(patchJson, options)!;
            // Assert
            
            Assert.Equal("text/plain; charset=utf-8", addResponse2.Content.Headers.ContentType?.ToString());
        }
        [Fact]
        public async Task patch_Api_Remove_material_from_level_when_alredy_not_there_CorrectContentType()
        {
            // Arrange
            var payload = new Level
            {
                CategoryName = "cumi",
                LevelNumber = 6,
                Name = "Test",
                educationalMaterials = new HashSet<EducationalMaterial>(),
                users = new HashSet<User>()
            };
            var stringPayload = JsonConvert.SerializeObject(payload);
            var postContent = new StringContent(stringPayload, Encoding.UTF8, "application/json");


            var postResponse = await client.PostAsync("api/education/level", postContent);
            string json = await postResponse.Content.ReadAsStringAsync();
            Level level = JsonSerializer.Deserialize<Level>(json, options)!;

            var materialPayload = new EducationalMaterial
            {
                Content = "hajrá",
                Name = "szurkolás",
                Type = "Text"
            };
            var materialStringPayload = JsonConvert.SerializeObject(materialPayload);
            var materialPostContent = new StringContent(materialStringPayload, Encoding.UTF8, "application/json");


            var materialPostResponse = await client.PostAsync("api/education", materialPostContent);
            string materialJson = await materialPostResponse.Content.ReadAsStringAsync();
            EducationalMaterial educationMaterial = JsonSerializer.Deserialize<EducationalMaterial>(materialJson, options)!;

            var patchStringPayload = JsonConvert.SerializeObject(educationMaterial.Id);
            var patchContent = new StringContent(patchStringPayload, Encoding.UTF8, "application/json");
            //
            var removeResponse = await client.PatchAsync($"api/Education/level/{level.Id}/material/remove?MaterialId={educationMaterial.Id}", patchContent);
            var deleteResponse = await client.DeleteAsync($"api/education/level/{level.Id}");
            // Assert

            Assert.Equal("text/plain; charset=utf-8", removeResponse.Content.Headers.ContentType?.ToString());
        }
        
    }
}

