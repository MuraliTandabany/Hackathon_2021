using ArtMapLambdaAPI.DTO;
using ArtMapLambdaAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArtMapLambdaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Login(UserDTO user)
        {
            try
            {
                var result = await _userService.IsAuthenticated(user.UserName, user.Password);
                if (result != null)
                {
                    return Ok(result);
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO user)
        {
            try
            {
                var result = await _userService.CreateUser(user.UserName, user.Password);
                if (result)
                {
                    return Ok();
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error - " + ex.Message);
            }
        }
    }
}
