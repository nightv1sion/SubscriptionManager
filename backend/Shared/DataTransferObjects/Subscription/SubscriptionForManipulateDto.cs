using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects.Subscription
{
    public record SubscriptionForManipulateDto
    {
        [Required(ErrorMessage = "Subscription Name is required")]
        public string? Name { get; init; }
        [Required(ErrorMessage = "Subcription Price is required")]
        public decimal Price { get; init; }
        public DateTime? Created { get; init; }
        public DateTime? EndsAt { get; init; }
        public Guid? CategoryId { get; set; }
    }
}
