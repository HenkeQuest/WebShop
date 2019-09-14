using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1_delete.Models;

namespace WebApplication1_delete.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ClothingController : ControllerBase
    {
        private readonly ClothingContext _context;
        private readonly IHostingEnvironment _hostEnvironment;

        public ClothingController(ClothingContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostEnvironment = hostingEnvironment;
        }

        // GET: api/Clothing
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clothing>>> GetClothing()
        {
            return await _context.Clothings.ToListAsync();
        }

        // GET: api/Clothing/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clothing>> GetClothing(int id)
        {
            var clothing = await _context.Clothings.FindAsync(id);

            if (clothing == null)
            {
                return NotFound();
            }

            return clothing;
        }

        // PUT: api/Clothing/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClothing([FromRoute] int id)
        {
            Debug.WriteLine("dfds: " + id);
            Debug.WriteLine("Before file request");
            //instead of passing "[FromBody] Record record" as an argument we create a new record because
            //the view model and the database model does not match because of the file
            Clothing clothing = new Clothing();
            clothing.Size = Request.Form["Size"];
            clothing.Description = Request.Form["Description"];
            clothing.ImagePath = Request.Form["ImagePath"];
            clothing.Category = Request.Form["Category"];
            clothing.Title = Request.Form["Title"];
            clothing.Price = Request.Form["Price"];
            clothing.ID = id;

            Debug.WriteLine("Pass file request");
            try
            {
                IFormFile file = Request.Form.Files[0];
                Debug.WriteLine("file: " + file.FileName);
                if (file.Length > 0)
                {
                    Debug.WriteLine("file.Length: " + file.Length);
                    var pathToSave = _hostEnvironment.WebRootPath + "\\Images\\40\\";

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);

                    clothing.ImagePath = fileName;

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    //Image_resize(fullPath, pathToSave + "\\40\\" + fileName, 40);
                }
                else
                {
                    Console.WriteLine("No image selected");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("No image selected");
                //return StatusCode(500, "Internal server error");
            }

            if (!ModelState.IsValid)
            {
                //return BadRequest(ModelState);
            }

            if (id.ToString() != Request.Form["ID"])
            {
                Debug.WriteLine("id match: " + id + " == " + Request.Form["ID"]);
                return BadRequest();
            }

            _context.Entry(clothing).State = EntityState.Modified;

            try
            {
                Console.WriteLine("save changes");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClothingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            return NoContent();
        }

        // POST: api/Clothing
        [HttpPost, DisableRequestSizeLimit]
        //public async Task<ActionResult<Clothing>> PostClothing(Clothing clothing)
        public async Task<IActionResult> PostClothing()
        {
            Debug.Write("trying to Request");
            Clothing clothing = new Clothing();
            clothing.Title = Request.Form["Title"];
            clothing.Size = Request.Form["Size"];
            clothing.Price = Request.Form["Price"];
            clothing.Description = Request.Form["Description"];
            clothing.ImagePath = Request.Form["ImagePath"];
            clothing.Category = Request.Form["Category"]; ;

            //Create custom filename
            IFormFile file = Request.Form.Files[0];

            Debug.Write("Pass file" + file.FileName);

            try
            {
                if (file.Length > 0)
                {
                    var pathToSave = _hostEnvironment.WebRootPath + "\\Images\\40\\";

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);

                    clothing.ImagePath = fileName;

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    //Image_resize(fullPath, pathToSave + fileName, 40);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }

            _context.Clothings.Add(clothing);
            await _context.SaveChangesAsync();

            Console.WriteLine("clothing.ClothingID: " + clothing.ID);
            return CreatedAtAction("GetClothing", new { id = clothing.ID }, clothing);
        }

        // DELETE: api/Clothing/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Clothing>> DeleteClothing(int id)
        {
            var clothing = await _context.Clothings.FindAsync(id);
            if (clothing == null)
            {
                return NotFound();
            }

            _context.Clothings.Remove(clothing);
            await _context.SaveChangesAsync();

            return clothing;
        }

        private bool ClothingExists(int id)
        {
            return _context.Clothings.Any(e => e.ID == id);
        }

        private void Image_resize(string input_Image_Path, string output_Image_Path, int new_Width)
        {
            //*Resizes an Image in Asp.Net MVC Core 2

            //*Using Nuget CoreCompat.System.Drawing
            const long quality = 50L;
            Bitmap source_Bitmap = new Bitmap(input_Image_Path);

            double dblWidth_origial = source_Bitmap.Width;
            double dblHeigth_origial = source_Bitmap.Height;
            double relation_heigth_width = dblHeigth_origial / dblWidth_origial;

            int new_Height = (int)(new_Width * relation_heigth_width);

            //create Empty Drawarea
            var new_DrawArea = new Bitmap(new_Width, new_Height);

            //create Empty Drawarea
            using (var graphic_of_DrawArea = Graphics.FromImage(new_DrawArea))
            {
                //setup
                graphic_of_DrawArea.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighSpeed;
                graphic_of_DrawArea.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphic_of_DrawArea.CompositingMode = CompositingMode.SourceCopy;

                //*imports the image into the drawarea
                graphic_of_DrawArea.DrawImage(source_Bitmap, 0, 0, new_Width, new_Height);

                //Output as .Jpg
                try
                {
                    using (var output = System.IO.File.Open(output_Image_Path, FileMode.Create))
                    {
                        Debug.WriteLine("output: " + output);
                        //Setup jpg
                        var qualityParamId = Encoder.Quality;
                        var encoderParameters = new EncoderParameters(1);

                        encoderParameters.Param[0] = new EncoderParameter(qualityParamId, quality);

                        //save Bitmap as Jpg
                        var codec = ImageCodecInfo.GetImageDecoders().FirstOrDefault(c => c.FormatID == ImageFormat.Jpeg.Guid);

                        new_DrawArea.Save(output, codec, encoderParameters);

                        output.Close();
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("ex: " + ex);
                }

                //Output as .Jpg
                graphic_of_DrawArea.Dispose();
            }
            source_Bitmap.Dispose();
        }
    }
}
