using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects.Subscription
{
    public record SubscriptionDto(Guid Id, string Name, decimal Price, DateTime? Created, DateTime? EndsAt, Guid? CategoryId);
}
