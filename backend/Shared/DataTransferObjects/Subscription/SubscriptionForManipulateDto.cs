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
        [Required(ErrorMessage = "Subscription Created time is required")]
        public DateTime Created { get; init; }
        [Required(ErrorMessage = "Subscription EndsAt time is required")]
        public DateTime EndsAt { get; init; }
        public Guid? CategoryId { get; set; }
    }
}
