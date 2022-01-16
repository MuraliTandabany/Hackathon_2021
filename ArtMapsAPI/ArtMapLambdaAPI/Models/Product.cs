using System;
using System.Collections.Generic;

#nullable disable

namespace ArtMapLambdaAPI.Models
{
    public partial class Product
    {
        public Product()
        {
            CartItems = new HashSet<CartItem>();
        }

        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Type { get; set; }

        public virtual ICollection<CartItem> CartItems { get; set; }
    }
}
