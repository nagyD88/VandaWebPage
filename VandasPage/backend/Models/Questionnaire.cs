using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VandasPage.Models;

public class Questionnaire
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    [Required]
    public string Title { get; set; }

    public List<Question> Questions { get; set; }
    
    public int GetAllPoint()
    {
        throw new NotImplementedException();
    }

    public int GetGeneralPresentPoints()
    {
        throw new NotImplementedException();
    }

    public int GetFamilyPoints()
    {
        throw new NotImplementedException();
    }

    public int GetPerformancePoints()
    {
        throw new NotImplementedException();
    }
}