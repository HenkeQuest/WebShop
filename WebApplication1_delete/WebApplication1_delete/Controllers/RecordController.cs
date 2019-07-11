using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1_delete.Models;
using System.Net.Http.Headers;
using Simple.ImageResizer;
using System.Net.Http;
using static System.Net.Mime.MediaTypeNames;

namespace WebApplication1_delete.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly RecordContext _context;

        public RecordController(RecordContext context)
        {
            _context = context;
        }

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

            HttpResponseMessage d;


            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                var fileBytes = ms.ToArray();
                byte[] CoverImageBytes = null;
                BinaryReader reader = new BinaryReader(file.OpenReadStream());
                CoverImageBytes = reader.ReadBytes((int)file.Length);
                
                
                string s = Convert.ToBase64String(fileBytes);
                //ImageResizer resizer = new ImageResizer(s);
                //var byteArray1 = resizer.Resize(400, ImageEncoding.Jpg90);

                var folderName = "Images";
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                //resizer.SaveToFile(Path.Combine(pathToSave, file.FileName));

                // act on the Base64 data
            }

            try
            {
                if (file.Length > 0)
                {
                    var folderName = "Images";
                    var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                    var postedFile = Request.ContentLength;
                    imageName = new String(Path.GetFileNameWithoutExtension(file.FileName).Take(10).ToArray()).Replace(" ", "-");
                    imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);

                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName); //you can add this path to a list and then return all dbPaths to the client if require
                    record.ImagePath = fullPath;

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    Debug.WriteLine("fullPath: " + fullPath);
                    Debug.WriteLine("pathToSave: " + pathToSave);
                    ImageResizer resizer = new ImageResizer(@"C:\diagram.png");
                    
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

            
            
            //var postedFile = httpRequest;




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
    }
}