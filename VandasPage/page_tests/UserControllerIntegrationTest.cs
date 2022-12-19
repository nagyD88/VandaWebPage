using VandasPage.Models;
using Microsoft.AspNetCore.Mvc.Testing;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task Post_Api_MaterialReturnSuccessAndCorrectContentType()
        {
            // Arrange
            var payload = new UserRegistrationDTO
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
        /*
        [Fact]
        public async Task Put_Api_MaterialReturnSuccessAndCorrectContentType()
        {
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/material?name=alma", content);
            string json = await response.Content.ReadAsStringAsync();
            EducationalMaterial eduMat = JsonSerializer.Deserialize<EducationalMaterial>(json, options)!;
            var response2 = await client.PutAsync($"api/material/{eduMat.ID}/add?material=Tanc", content);
            response2.EnsureSuccessStatusCode();
            var response3 = await client.GetAsync($"api/material/{eduMat.ID}");
            string json2 = await response2.Content.ReadAsStringAsync();
            EducationalMaterial eduMat2 = JsonSerializer.Deserialize<EducationalMaterial>(json2, options)!;
            Assert.Equal("Tanc", eduMat2.Materials.FirstOrDefault().Name);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Delete_Api_MaterialReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/material?name=alma", content);
            string json = await response.Content.ReadAsStringAsync();
            EducationalMaterial eduMaterial = JsonSerializer.Deserialize<EducationalMaterial>(json, options)!;
            var putResponse = await client.PutAsync($"api/material/{eduMaterial.ID}/add?material=Tanc", content);
            var response2 = await client.GetAsync($"api/material/{eduMaterial.ID}");
            string jsonString = await response2.Content.ReadAsStringAsync();
            EducationalMaterial eduMat2 = JsonSerializer.Deserialize<EducationalMaterial>(jsonString, options)!;
            // Act
            var id = eduMat2.Materials.FirstOrDefault().ID;
            var response3 = await client.DeleteAsync($"api/material/{id}/remove");
            Console.WriteLine(eduMat2.Materials.FirstOrDefault().ID);
            // Assert
            response3.EnsureSuccessStatusCode();
            Assert.Equal(null, response3.Content.Headers.ContentType?.ToString());
        }
        [Fact]
        public async Task Delete_Api_EducationMaterialReturnSuccessAndCorrectContentType()
        {
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/material?name=alma", content);
            string json = await response.Content.ReadAsStringAsync();
            EducationalMaterial eduMat = JsonSerializer.Deserialize<EducationalMaterial>(json, options)!;
            var response2 = await client.DeleteAsync($"api/material/{eduMat.ID}");
            response2.EnsureSuccessStatusCode();
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Post_Api_TeamReturnSuccessAndCorrectContentType()
        {
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/teams?studentId=1&name=haki&repo=github.com", content);
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            string json = await response.Content.ReadAsStringAsync();
            Team team = JsonSerializer.Deserialize<Team>(json, options)!;
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
            Assert.Equal("haki", team.Name);
        }


        [Fact]
        public async Task Put_Api_Teams_Name_Change_ReturnSuccessAndCorrectContentType()
        {
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/teams?studentId=1&name=haki&repo=github.com", content);
            string json = await response.Content.ReadAsStringAsync();
            Team team = JsonSerializer.Deserialize<Team>(json, options)!;
            var response2 = await client.PutAsync($"api/teams/{team.Id}?newName=Tancosok", content);
            response2.EnsureSuccessStatusCode();
            var response3 = await client.GetAsync($"api/teams/{team.Id}");
            string json2 = await response3.Content.ReadAsStringAsync();
            Team team2 = JsonSerializer.Deserialize<Team>(json2, options)!;
            Assert.Equal("Tancosok", team2.Name);
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Delete_Api_TeamReturnSuccessAndCorrectContentType()
        {
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/teams?studentId=1&name=haki&repo=github.com", content);
            string json = await response.Content.ReadAsStringAsync();
            Team team = JsonSerializer.Deserialize<Team>(json, options)!;
            var response2 = await client.DeleteAsync($"api/teams/{team.Id}");
            response2.EnsureSuccessStatusCode();
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Put_Api_Teams_reviewTime_change_ReturnSuccessAndCorrectContentType()
        {
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/teams?studentId=1&name=haki&repo=github.com", content);
            string json = await response.Content.ReadAsStringAsync();
            Team team = JsonSerializer.Deserialize<Team>(json, options)!;
            var response2 = await client.PutAsync($"api/teams/{team.Id}/review?reviewTime=2022-12-14T10%3A54%3A39.6374337&type=siStart", content);
            response2.EnsureSuccessStatusCode();
            var response3 = await client.GetAsync($"api/teams/{team.Id}");
            string json2 = await response3.Content.ReadAsStringAsync();
            Team team2 = JsonSerializer.Deserialize<Team>(json2, options)!;
            Assert.Equal("2022-12-14T10:54:39.6374337", team2.SiReviewStart);
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Put_Api_Teams_add_member_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/teams?studentId=1&name=haki&repo=github.com", content);
            string json = await response.Content.ReadAsStringAsync();
            Team team = JsonSerializer.Deserialize<Team>(json, options)!;

            var responseStudent = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await responseStudent.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;
            // Act
            var response2 = await client.PutAsync($"api/teams/{team.Id}/add/{student.ID}", content);

            var response3 = await client.GetAsync($"api/teams/{team.Id}");
            string json3 = await response3.Content.ReadAsStringAsync();
            Team team2 = JsonSerializer.Deserialize<Team>(json3, options)!;
            // Assert
            response2.EnsureSuccessStatusCode();
            Assert.Equal("Sanya", team2.Students.FirstOrDefault(x => x.ID == student.ID).Name);
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Put_Api_Teams_delete_member_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/teams?studentId=1&name=haki&repo=github.com", content);
            string json = await response.Content.ReadAsStringAsync();
            Team team = JsonSerializer.Deserialize<Team>(json, options)!;

            var responseStudent = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await responseStudent.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;

            var response2 = await client.PutAsync($"api/teams/{team.Id}/add/{student.ID}", content);
            // Act
            var responseDelete = await client.PutAsync($"api/teams/{team.Id}/remove/{student.ID}", content);
            var response3 = await client.GetAsync($"api/teams/{team.Id}");
            string json3 = await response3.Content.ReadAsStringAsync();
            Team team2 = JsonSerializer.Deserialize<Team>(json3, options)!;
            // Assert
            responseDelete.EnsureSuccessStatusCode();
            Assert.Equal(null, team2.Students.FirstOrDefault(x => x.ID == student.ID));
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Post_Api_Student_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            // Act
            var response = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await response.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;




            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("Sanya", student.Name);
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Delete_Api_Student_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await response.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;
            // Act
            var response2 = await client.DeleteAsync($"api/users/student/{student.ID}");
            var response3 = await client.GetAsync("api/users/students");
            string json3 = await response3.Content.ReadAsStringAsync();
            List<Student> students = JsonSerializer.Deserialize<List<Student>>(json3, options)!;

            // Assert
            response2.EnsureSuccessStatusCode();
            Assert.Equal(null, students.FirstOrDefault(x => x.ID == student.ID));
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Put_Api_Student_New_Name_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await response.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;
            // Act
            var response2 = await client.PutAsync($"api/users/student/{student.ID}?newName=Tomi", content);
            var response3 = await client.GetAsync($"api/users/student/{student.ID}");
            string json3 = await response3.Content.ReadAsStringAsync();
            Student student2 = JsonSerializer.Deserialize<Student>(json3, options)!;

            // Assert
            response2.EnsureSuccessStatusCode();
            Assert.Equal("Tomi", student2.Name);
            Assert.Equal(null, response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Post_Api_Mentor_New_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await response.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;
            // Act
            var response2 = await client.PostAsync($"api/users/mentor?id={student.ID}", content);

            string json3 = await response2.Content.ReadAsStringAsync();
            Mentor mentor = JsonSerializer.Deserialize<Mentor>(json3, options)!;

            // Assert
            response2.EnsureSuccessStatusCode();
            Assert.Equal("Sanya", mentor.Name);
            Assert.Equal("application/json; charset=utf-8", response2.Content.Headers.ContentType?.ToString());
        }

        [Fact]
        public async Task Delete_Api_Mentor_New_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await response.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;

            var response2 = await client.PostAsync($"api/users/mentor?id={student.ID}", content);

            string json3 = await response2.Content.ReadAsStringAsync();
            Mentor mentor = JsonSerializer.Deserialize<Mentor>(json3, options)!;
            // Act
            var response3 = await client.DeleteAsync($"api/users/mentor/{mentor.ID}");
            var response4 = await client.GetAsync("api/users/mentors");
            string json4 = await response4.Content.ReadAsStringAsync();
            List<Mentor> mentors = JsonSerializer.Deserialize<List<Mentor>>(json4, options)!;

            // Assert
            response3.EnsureSuccessStatusCode();
            Assert.Equal(null, mentors.FirstOrDefault(x => x.ID == mentor.ID));
            Assert.Equal(null, response3.Content.Headers.ContentType?.ToString());

        }

        [Fact]
        public async Task put_Api_Mentor_New_Name_ReturnSuccessAndCorrectContentType()
        {
            // Arrange
            HttpContent content = new StringContent("");
            var client = _factory.CreateClient();
            var response = await client.PostAsync("api/users/student?name=Sanya&email=email@amail.hu&password=jijiji", content);
            string json2 = await response.Content.ReadAsStringAsync();
            Student student = JsonSerializer.Deserialize<Student>(json2, options)!;

            var response2 = await client.PostAsync($"api/users/mentor?id={student.ID}", content);

            string json3 = await response2.Content.ReadAsStringAsync();
            Mentor mentor = JsonSerializer.Deserialize<Mentor>(json3, options)!;
            // Act
            var response3 = await client.PutAsync($"api/users/mentor/{mentor.ID}?newName=Tomi", content);
            var response4 = await client.GetAsync($"api/users/mentors/{mentor.ID}");
            string json4 = await response4.Content.ReadAsStringAsync();
            Mentor mentor2 = JsonSerializer.Deserialize<Mentor>(json4, options)!;

            // Assert
            response3.EnsureSuccessStatusCode();
            Assert.Equal("Tomi", mentor2.Name);
            Assert.Equal(null, response3.Content.Headers.ContentType?.ToString());

        }*/
    }
}