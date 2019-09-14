using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1_delete.Migrations.Record
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Records",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "nvarchar(250)", nullable: false),
                    Band = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Album = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Year = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Genre = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Image = table.Column<byte[]>(type: "varbinary(MAX)", nullable: true),
                    ImagePath = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Price = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Records", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Records");
        }
    }
}
