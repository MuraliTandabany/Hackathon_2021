using ArtMapLambdaAPI.DTO;
using ArtMapLambdaAPI.Models;
using ArtMapLambdaAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtMapLambdaAPI.Services
{
    public interface IUserService
    {
        Task<UserDTO> IsAuthenticated(string userName, string password);
        Task<bool> CreateUser(string userName, string password);
    }
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<bool> CreateUser(string userName, string password)
        {
            return await _userRepository.Create(userName, password);
        }

        public async Task<UserDTO> IsAuthenticated(string userName, string password)
        {
            var user = await _userRepository.GetUser(userName, password);
            return user != null ? new UserDTO()
            {
                Id = user.Id,
                UserName = user.UserName
            } : null;
        }
    }
}
