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
        Task<IEnumerable<SubscriptionDto>> GetSubscriptionsAsync(bool trackChanges);
        Task<IEnumerable<SubscriptionDto>> GetSubscriptionsForCategoryAsync(Guid categoryId, bool trackChanges);
        Task<SubscriptionDto> CreateSubscriptionAsync(SubscriptionForCreateDto subcriptionForCreate);
        Task<SubscriptionDto> GetSubscriptionByIdAsync(Guid id, bool trackChanges);
        Task DeleteSubscriptionAsync(Guid id);
        Task EditSubscriptionAsync(Guid id, SubscriptionForEditDto subscriptionForEdit);
    }
}
