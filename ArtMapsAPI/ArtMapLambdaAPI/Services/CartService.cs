using ArtMapLambdaAPI.DTO;
using ArtMapLambdaAPI.Models;
using ArtMapLambdaAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArtMapLambdaAPI.Services
{
    public interface ICartService
    {
        Task<CartDTO> GetCartItemsByUserId(int userId);
    }
    public class CartService : ICartService
    {
        private readonly CartRepository _cartRepository;
        public CartService(CartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }
        public async Task<CartDTO> GetCartItemsByUserId(int userId)
        {
            var cart = await _cartRepository.GetCartItemsByUserId(userId);
            foreach (var cartItem in cart.CartItems)
            {

            }
            return new CartDTO()
            {
                Id = cart.Id,
                CartItems = new List<CartItemDTO>()
                {
                    
                }
            };
        }
    }
}
