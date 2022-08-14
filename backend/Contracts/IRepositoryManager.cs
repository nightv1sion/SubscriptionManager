using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRepositoryManager
    {
        ISubscriptionRepository Subscription { get; }
        ICategoryRepository Category { get; }
        public Task SaveAsync();
    }
}
