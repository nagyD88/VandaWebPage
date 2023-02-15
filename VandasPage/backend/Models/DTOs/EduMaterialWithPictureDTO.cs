namespace VandasPage.Models.DTOs
{
    public class EduMaterialWithPictureDTO
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public IFormFile File { get; set; }
    }
}
