using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.ExceptionModels
{
    public class SubscriptionNotFoundException : NotFoundException
    {
        public SubscriptionNotFoundException(Guid id) : base($"Subscription with id: {id} does not exist")
        {
        }
    }
}
