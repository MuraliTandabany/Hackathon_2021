using ArtMapLambdaAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArtMapLambdaAPI.Repositories
{
    public interface ICartRepository
    {
        Task<Cart> GetCartItemsByUserId(int userId);
    }
    public class CartRepository : ICartRepository
    {
        private readonly ArtMapsContext _artMapsContext;
        public CartRepository(ArtMapsContext artMapsContext)
        {
            _artMapsContext = artMapsContext;
        }
        public async Task<Cart> GetCartItemsByUserId(int userId)
        {
            return await _artMapsContext.Carts.Where(c => c.UserId == userId).FirstOrDefaultAsync();
        }
    }
}
