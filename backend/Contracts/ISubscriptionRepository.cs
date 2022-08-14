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
        Task<ICollection<Subscription>> GetSubscriptionsAsync(bool trackChanges);
        Task<ICollection<Subscription>> GetSubscriptionsForCategoryAsync(Guid categoryId, bool trackChanges);
        Task<Subscription> GetSubscriptionByIdAsync(Guid id, bool trackChanges);
        void CreateSubscription(Subscription subscription);
        void DeleteSubscription(Subscription subscription);
    }
}
