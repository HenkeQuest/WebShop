using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1_delete.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string CategoryName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string CategoryRoute { get; set; }

    }
}
