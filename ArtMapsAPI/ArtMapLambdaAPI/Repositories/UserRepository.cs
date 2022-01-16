using ArtMapLambdaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtMapLambdaAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUser(string userName, string password);
        Task<bool> Create(string userName, string password);
    }
    public class UserRepository : IUserRepository
    {
        private readonly ArtMapsContext _artMapsContext;
        public UserRepository(ArtMapsContext artMapsContext)
        {
            _artMapsContext = artMapsContext;
        }

        public async Task<bool> Create(string userName, string password)
        {
            _artMapsContext.Users.Add(new User()
            {
                Id = 0,
                UserName = userName,
                Password = Convert.ToBase64String(Encoding.UTF8.GetBytes(password))
            });
            return await _artMapsContext.SaveChangesAsync() > 0;
        }

        public async Task<User> GetUser(string userName, string password)
        {
            return await _artMapsContext.Users.Where(x => x.UserName.ToLower() == userName.ToLower() && x.Password == Convert.ToBase64String(Encoding.UTF8.GetBytes(password))).FirstOrDefaultAsync();
        }
    }
}
