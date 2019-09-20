using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class ClothingContext : DbContext
    {
        public ClothingContext(DbContextOptions<ClothingContext> options) : base(options)
        {

        }

        public DbSet<Clothing> Clothings { get; set; }
    }
}
