using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Subscription
    {
        [Key]
        [Column(name: "SubscriptionId")]
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Created { get; set; }
        public DateTime EndsAt { get; set; }
        public Category? Category { get; set; }
        public Guid? CategoryId { get; set; }
        public User User { get; set; }
        public Guid UserId { get; set; }
    }
}
