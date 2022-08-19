using Shared.DataTransferObjects.Subscription;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Contracts
{
    public interface ISubscriptionService
    {
        Task<IEnumerable<SubscriptionDto>> GetSubscriptionsForUserAsync(string username, bool trackChanges);
        Task<IEnumerable<SubscriptionDto>> GetSubscriptionsForCategoryForUserAsync(string username, Guid categoryId, bool trackChanges);
        Task<SubscriptionDto> CreateSubscriptionForUserAsync(string username, SubscriptionForCreateDto subcriptionForCreate);
        Task<SubscriptionDto> GetSubscriptionByIdForUserAsync(string username, Guid id, bool trackChanges);
        Task DeleteSubscriptionForUserAsync(string username, Guid id);
        Task EditSubscriptionForUserAsync(string username, Guid id, SubscriptionForEditDto subscriptionForEdit);
    }
}
