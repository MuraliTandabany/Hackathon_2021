using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArtMapLambdaAPI.DTO
{
    public class CartDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<CartItemDTO> CartItems { get; set; }
        public int Total { get; set; }
    }

    public class CartItemDTO
    {
        public int Id { get; set; }
        public int? ProductId { get; set; }
        public int Quantity { get; set; }
        public int CartId { get; set; }
    }
}
