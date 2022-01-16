using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArtMapLambdaAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArtMapLambdaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController : ControllerBase
    {
        private readonly IS3Service _s3Service;
        public MapsController(IS3Service s3Service)
        {
            _s3Service = s3Service;
        }
        // GET api/<MapsController>/5
        [HttpGet("artMaps")]
        public async Task<IActionResult> GetArtMaps()
        {
            // connect to S3
            var maps = await _s3Service.GetMaps();
            // send as response
            return Ok(maps);
        }
    }
}
