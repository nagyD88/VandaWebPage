using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VandasPage.Models;
using Xunit;

namespace page_tests
{
    internal class UserServiceTests
    {

        var myDatabaseName = "mydatabase_" + DateTime.Now.ToFileTimeUtc();

        var options = new DbContextOptionsBuilder<Context>()
                        .UseInMemoryDatabase(databaseName: myDatabaseName)
                        .Options;


        var context = new Context(options)

                [Fact]
        public shouldReturnUsers()
        {

        }

    }
}
