using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface ISubscriptionRepository
    {
        Task<ICollection<Subscription>> GetSubscriptionsForUserAsync(User user, bool trackChanges);
        Task<ICollection<Subscription>> GetSubscriptionsForCategoryForUserAsync(User user, Guid categoryId, bool trackChanges);
        Task<Subscription> GetSubscriptionByIdForUserAsync(User user, Guid id, bool trackChanges);
        void CreateSubscription(Subscription subscription);
        void DeleteSubscription(Subscription subscription);
    }
}
