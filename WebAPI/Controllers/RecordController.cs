using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Rendering;
using WebAPI.Models;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly RecordContext _context;
        private readonly IHostingEnvironment _hostEnvironment;

        public RecordController(RecordContext context, IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostEnvironment = hostingEnvironment;
        }


        // GET: api/Record
        //public async Task<IActionResult> Index()
        //{
        //    return View(await _context.Records.ToListAsync());
        //}

        //// GET: Employee/Create
        //[Route("api/[controller]/create")]
        //public IActionResult AddOrEdit(int id = 0)
        //{
        //    if (id == 0)
        //        return View(new Record());
        //    else
        //        return View(_context.Records.Find(id));
        //}


        // GET: api/Record
        [HttpGet]
        public IEnumerable<Record> GetRecords()
        {
            Console.WriteLine("_context.Records: " + _context.Records);
            return _context.Records;
        }

        // GET: api/Record/username/username
        [HttpGet("username/{userName}")]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecordsByUserName(string userName)
        {
            Console.WriteLine("_context.Records: " + _context.Records);
            return await _context.Records.Where(b => b.UserName == userName).ToListAsync();
        }

        // GET: api/Record/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecord([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _context.Records.FindAsync(id);

            if (record == null)
            {
                return NotFound();
            }

            return Ok(record);
        }

        // PUT: api/Record/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecord([FromRoute] int id )
        {
            Debug.WriteLine("dfds: " + id);
            Debug.WriteLine("Before file request");
            //instead of passing "[FromBody] Record record" as an argument we create a new record because
            //the view model and the database model does not match because of the file
            Record record = new Record();
            record.Band = Request.Form["Band"];
            record.Album = Request.Form["Album"];
            record.Year = Request.Form["Year"];
            record.Genre = Request.Form["Genre"];
            record.ImagePath = Request.Form["ImagePath"];
            record.Category = Request.Form["Category"];
            record.Title = Request.Form["Title"];
            record.Price = Request.Form["Price"];
            record.Description = Request.Form["Description"];
            record.UserName = Request.Form["UserName"];
            record.ID = id;

            Debug.WriteLine("Pass file request" );
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

                    record.ImagePath = fileName;

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

            _context.Entry(record).State = EntityState.Modified;

            try
            {
                Console.WriteLine("save changes");
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecordExists(id))
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

        // POST: api/Record
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> PostRecord()
        {

            Record record = new Record();
            record.Band = Request.Form["Band"];
            record.Album = Request.Form["Album"];
            record.Year = Request.Form["Year"];
            record.Genre = Request.Form["Genre"];
            record.Category = Request.Form["Category"];
            record.Title = Request.Form["Title"];
            record.Price = Request.Form["Price"];
            record.ImagePath = Request.Form["ImagePath"];
            record.UserName = Request.Form["UserName"];

            Debug.WriteLine("Imageeeeeeeeeeeeeeeeeeeeeeeeeee: " );
            
            Debug.Write("tjjaa" + "\r\n");
            
            //Create custom filename
            IFormFile file = Request.Form.Files[0];

            Debug.Write("Pass file" + file.FileName);

            try
            {
                if (file.Length > 0)
                {
                    var pathToSave = _hostEnvironment.WebRootPath + "\\Images\\40\\";

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave , fileName);
            
                    record.ImagePath = fileName;

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    Image_resize(fullPath, pathToSave + "\\40\\" + fileName, 40);
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

            _context.Records.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecord", new { id = record.ID }, record);
        }

        // DELETE: api/Record/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord([FromRoute] int id)
        {
            Debug.WriteLine("Delete record");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var record = await _context.Records.FindAsync(id);
            if (record == null)
            {
                return NotFound();
            }

            _context.Records.Remove(record);
            await _context.SaveChangesAsync();

            return Ok(record);
        }

        private bool RecordExists(int id)
        {
            return _context.Records.Any(e => e.ID == id);
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
                graphic_of_DrawArea.CompositingQuality = CompositingQuality.HighSpeed;
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
                        //resized_Bitmap.Dispose();

                        output.Close();
                    }
                }
                catch(Exception ex)
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