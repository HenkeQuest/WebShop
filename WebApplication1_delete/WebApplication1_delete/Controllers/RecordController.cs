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

namespace WebApplication1_delete.Controllers
{
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
        [HttpPost]
        public async Task<IActionResult> PostRecord([FromBody] Record record)
        {
            string imageName = null;


            //Upload Image
            //Debugger.Break();
            Debug.WriteLine("Imageeeeeeeeeeeeeeeeeeeeeeeeeee: " );
            Debug.Print("Image file: "+ record.Image + "\r\n");
            Debug.Write("tjjaa" + "\r\n");
            Debug.WriteLine("Hallå du");
            //Create custom filename
            //imageName = new String(Path.GetFileNameWithoutExtension(postedFile.FileName).Take(10).ToArray()).Replace(" ", "-");
            //imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(postedFile.FileName);
            //var filePath = HttpContext.Current.Server.MapPath("~/Image/" + imageName);
            //postedFile.SaveAs(filePath);





            Console.WriteLine("Record: "+ record);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            else
            {
                using (var memoryStream = new MemoryStream())
                {
                    //await record.Image.CopyToAsync(memoryStream);
                    //user.AvatarImage = memoryStream.ToArray();
                }
            }

            _context.Records.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecord", null, null);
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