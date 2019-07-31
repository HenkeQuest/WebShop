using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Design;
using WebApplication1_delete.Models;

namespace WebApplication1_delete.Models
{
    public class RecordContext:DbContext
    {
        public RecordContext(DbContextOptions<RecordContext> options):base(options)
        {

        }

        public DbSet<Record> Records { get; set; }

        //public DbSet<Category> Categories { get; set; }

        //public DbSet<Clothing> Clothings { get; set; }
    }
}
