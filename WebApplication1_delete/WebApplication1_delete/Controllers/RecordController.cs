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
using WebApplication1_delete.Models;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using Microsoft.AspNetCore.Hosting;

namespace WebApplication1_delete.Controllers
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
        public async Task<IActionResult> PutRecord([FromRoute] int id, [FromBody] Record record)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != record.RecordID)
            {
                return BadRequest();
            }

            _context.Entry(record).State = EntityState.Modified;

            try
            {
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
            if (Request.HasFormContentType && Request.Form != null && Request.Form.Count() > 0)
            {
                dynamic form = new { };
                foreach (var f in Request.Form)
                    Console.WriteLine("Form: ", f.Value);

            }

            string imageName = null;
            var httpRequest = HttpContext.Items["Band"];
            Debug.WriteLine("file: " + httpRequest);

            Record record = new Record();
            record.Band = Request.Form["Band"];
            record.Album = Request.Form["Album"];
            record.Year = Request.Form["Year"];
            record.Genre = Request.Form["Genre"];

            Debug.WriteLine("Imageeeeeeeeeeeeeeeeeeeeeeeeeee: " );
            
            Debug.Write("tjjaa" + "\r\n");
            
            //Create custom filename
            IFormFile file = Request.Form.Files[0];

            Debug.Write("Pass file" + file.FileName);

            try
            {
                if (file.Length > 0)
                {
                    Debug.WriteLine("wwwroot: " + _hostEnvironment.WebRootPath);
                    var folderName = "Images";
                    var pathToSave = _hostEnvironment.WebRootPath + "\\Images\\40\\";

                    imageName = new String(Path.GetFileNameWithoutExtension(file.FileName).Take(10).ToArray()).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    
                    var fullPath = Path.Combine(pathToSave , fileName);
            
                    record.ImagePath = fileName;

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    Debug.WriteLine("fullPath: " + fullPath);
                    Debug.WriteLine("pathToSave: " + pathToSave);

                    Image_resize(fullPath, pathToSave + "\\40\\" + fileName, 40);
                    //Image_resize(fullPath, pathToSave + "\\80\\" + fileName, 80);
                    //Image_resize(fullPath, pathToSave + "\\120\\" + fileName, 120);
                    //Image_resize(fullPath, pathToSave + "\\240\\" + fileName, 240);
                    //Image_resize(fullPath, pathToSave + "\\400\\" + fileName, 400);


                    //Image<Rgba32> image;
                    //var img = ImageCodecInfo.
                    //var byteArray1 = resizer.Resize(400, ImageEncoding.Png);
                    //resizer.SaveToFile(Path.Combine(pathToSave, file.FileName + "rezize"));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }








            _context.Records.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecord", new { id = record.RecordID }, record);
        }

        // DELETE: api/Record/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord([FromRoute] int id)
        {
            Console.WriteLine("Delete record");
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
            return _context.Records.Any(e => e.RecordID == id);
        }

        private void Image_resize(string input_Image_Path, string output_Image_Path, int new_Width)

        {

            //---------------< Image_resize() >---------------

            //*Resizes an Image in Asp.Net MVC Core 2

            //*Using Nuget CoreCompat.System.Drawing

            //using System.IO
            //using System.Drawing;             //CoreCompat
            //using System.Drawing.Drawing2D;   //CoreCompat
            //using System.Drawing.Imaging;     //CoreCompat

            const long quality = 50L;
            Bitmap source_Bitmap = new Bitmap(input_Image_Path);

            double dblWidth_origial = source_Bitmap.Width;
            double dblHeigth_origial = source_Bitmap.Height;
            double relation_heigth_width = dblHeigth_origial / dblWidth_origial;

            int new_Height = (int)(new_Width * relation_heigth_width);


            //< create Empty Drawarea >
            var new_DrawArea = new Bitmap(new_Width, new_Height);

            //</ create Empty Drawarea >
            
            using (var graphic_of_DrawArea = Graphics.FromImage(new_DrawArea))
            {
                //< setup >
                graphic_of_DrawArea.CompositingQuality = CompositingQuality.HighSpeed;
                graphic_of_DrawArea.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphic_of_DrawArea.CompositingMode = CompositingMode.SourceCopy;

                //</ setup >
                //< draw into placeholder >

                //*imports the image into the drawarea
                graphic_of_DrawArea.DrawImage(source_Bitmap, 0, 0, new_Width, new_Height);

                //</ draw into placeholder >
                //--< Output as .Jpg >--
                Debug.WriteLine("output_Image_Path: " + output_Image_Path);

                Debug.WriteLine("after catch: " + output_Image_Path);
                //output_Image_Path = newpath;
                try
                {
                    using (var output = System.IO.File.Open(output_Image_Path, FileMode.Create))
                    {
                        Debug.WriteLine("output: " + output);
                        //< setup jpg >
                        var qualityParamId = Encoder.Quality;
                        var encoderParameters = new EncoderParameters(1);

                        encoderParameters.Param[0] = new EncoderParameter(qualityParamId, quality);

                        //</ setup jpg >
                        //< save Bitmap as Jpg >
                        var codec = ImageCodecInfo.GetImageDecoders().FirstOrDefault(c => c.FormatID == ImageFormat.Jpeg.Guid);


                        new_DrawArea.Save(output, codec, encoderParameters);
                        //resized_Bitmap.Dispose();

                        output.Close();
                        //</ save Bitmap as Jpg >
                    }
                }
                catch(Exception ex)
                {
                    Debug.WriteLine("ex: " + ex);
                }

                //--</ Output as .Jpg >--
                graphic_of_DrawArea.Dispose();
            }

            source_Bitmap.Dispose();
            //---------------</ Image_resize() >---------------
        }
    }
}