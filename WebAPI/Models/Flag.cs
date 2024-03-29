﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1_delete.Models
{
    public class Flag
    {
        [Key]
        public int ID { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Title { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string Price { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Description { get; set; }
        [Column(TypeName = "varbinary(MAX)")]
        public byte[] Image { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string ImagePath { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string Category { get; set; }
    }
}
