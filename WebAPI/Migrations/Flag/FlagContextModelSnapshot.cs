﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApplication1_delete.Models;

namespace WebApplication1_delete.Migrations.Flag
{
    [DbContext(typeof(FlagContext))]
    partial class FlagContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplication1_delete.Models.Flag", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(250)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(MAX)");

                    b.Property<string>("ImagePath")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("Price")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("ID");

                    b.ToTable("Flags");
                });
#pragma warning restore 612, 618
        }
    }
}