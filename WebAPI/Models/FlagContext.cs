﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1_delete.Models
{
    public class FlagContext : DbContext
    {
        public FlagContext(DbContextOptions<FlagContext> options) : base(options)
        {

        }

        public DbSet<Flag> Flags { get; set; }
    }
}
