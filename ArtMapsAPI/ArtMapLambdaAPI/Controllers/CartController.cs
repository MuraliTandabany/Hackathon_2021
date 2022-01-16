using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArtMapLambdaAPI.DTO;
using ArtMapLambdaAPI.Models;
using ArtMapLambdaAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ArtMapLambdaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // GET api/<CartController>/5
        [HttpGet("{userId}")]
        public IActionResult Get(int userId)
        {
            try
            {
                return Ok(_cartService.GetCartItemsByUserId(userId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        // GET api/<CartController>/5
        [HttpGet("{userId}")]
        public IActionResult Post(int userId, CartDTO cart)
        {
            try
            {
                return Ok(_cartService.GetCartItemsByUserId(userId));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }
    }
}
