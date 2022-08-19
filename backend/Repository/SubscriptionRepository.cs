using Contracts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class SubscriptionRepository : RepositoryBase<Subscription>, ISubscriptionRepository
    {
        /*Task<ICollection<Subscription>> GetSubscriptionsForUserAsync(User user, bool trackChanges);
        Task<ICollection<Subscription>> GetSubscriptionsForCategoryForUserAsync(User user, Guid categoryId, bool trackChanges);
        Task<Subscription> GetSubscriptionByIdForUserAsync(User user, Guid id, bool trackChanges);*/
        public SubscriptionRepository(RepositoryContext context) : base(context)
        {
        }
        public async Task<ICollection<Subscription>> GetSubscriptionsForUserAsync(User user, bool trackChanges) => 
            await FindByCondition(s => s.UserId.Equals(user.Id),trackChanges).OrderBy(s => s.Name).ToListAsync();

        public async Task<ICollection<Subscription>> GetSubscriptionsForCategoryForUserAsync(User user, Guid categoryId, bool trackChanges) =>
            await FindByCondition(c => c.UserId.Equals(user.Id) && c.CategoryId.Equals(categoryId), trackChanges).OrderBy(c => c.Name).ToListAsync();
        public async Task<Subscription> GetSubscriptionByIdForUserAsync(User user, Guid id, bool trackChanges) =>
            await FindByCondition(s => s.UserId.Equals(user.Id) && s.Id.Equals(id), trackChanges).SingleOrDefaultAsync();
        public void CreateSubscription(Subscription subscription) => Create(subscription);
        public void DeleteSubscription(Subscription subscription) => Delete(subscription);
    }
}
