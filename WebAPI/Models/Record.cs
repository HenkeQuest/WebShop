using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Record
    {
        [Key]
        public int ID { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        [Required]
        public string Title { get; set; }
        [Column(TypeName ="nvarchar(250)")]
        public string Band { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Album { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Year { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Genre { get; set; }
        [Column(TypeName = "varbinary(MAX)")]
        public byte[] Image { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string ImagePath { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Description { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Price { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Category { get; set; }

        public string UserName { get; set; }


    }
}
