using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1_delete.Models
{
    public class Record
    {
        [Key]
        public int RecordID { get; set; }
        [Column(TypeName ="nvarchar(250)")]
        [Required]
        public string Band { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Album { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Year { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Genre { get; set; }
        //[Column(TypeName = "varbinary(MAX)")]
        public byte[] Image { get; set; }
    }
}
