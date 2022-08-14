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
        public SubscriptionRepository(RepositoryContext context) : base(context)
        {
        }
        public async Task<ICollection<Subscription>> GetSubscriptionsAsync(bool trackChanges) => await FindAll(trackChanges).OrderBy(s => s.Name).ToListAsync();

        public async Task<ICollection<Subscription>> GetSubscriptionsForCategoryAsync(Guid categoryId, bool trackChanges) =>
            await FindByCondition(c => c.CategoryId.Equals(categoryId), trackChanges).OrderBy(c => c.Name).ToListAsync();

        public void CreateSubscription(Subscription subscription) => Create(subscription);

        public async Task<Subscription> GetSubscriptionByIdAsync(Guid id, bool trackChanges) =>
            await FindByCondition(s => s.Id.Equals(id), trackChanges).SingleOrDefaultAsync();

        public void DeleteSubscription(Subscription subscription) => Delete(subscription);
    }
}
