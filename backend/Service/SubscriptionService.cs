using AutoMapper;
using Contracts;
using Entities.ExceptionModels;
using Entities.Models;
using Service.Contracts;
using Shared.DataTransferObjects.Subscription;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly Guid categoryByDefault = Guid.Parse("5d82233c-7dc7-441b-817b-3e4c78e99c03"); 

        public SubscriptionService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        

        public async Task<IEnumerable<SubscriptionDto>> GetSubscriptionsAsync(bool trackChanges)
        {
            var subscriptionEntities = await _repository.Subscription.GetSubscriptionsAsync(trackChanges);

            var subscriptionsForReturn = _mapper.Map<IEnumerable<SubscriptionDto>>(subscriptionEntities);
            return subscriptionsForReturn;
        }

        public async Task<IEnumerable<SubscriptionDto>> GetSubscriptionsForCategoryAsync(Guid categoryId, bool trackChanges)
        {
            await CheckIfCategoryExists(categoryId);
            var subscriptionEntities = await _repository.Subscription.GetSubscriptionsForCategoryAsync(categoryId, trackChanges);
            var subscriptionsForReturn = _mapper.Map<IEnumerable<SubscriptionDto>>(subscriptionEntities);

            return subscriptionsForReturn;
        }

        public async Task<SubscriptionDto> CreateSubscriptionAsync(SubscriptionForCreateDto subscriptionForCreate)
        {
            var entity = _mapper.Map<Subscription>(subscriptionForCreate);

            if (subscriptionForCreate.CategoryId.HasValue)
                await CheckIfCategoryExists(subscriptionForCreate.CategoryId.Value);

            _repository.Subscription.CreateSubscription(entity);
            await _repository.SaveAsync();

            var entityForReturn = _mapper.Map<SubscriptionDto>(entity);
            return entityForReturn;
        }

        public async Task<SubscriptionDto> GetSubscriptionByIdAsync(Guid id, bool trackChanges)
        {
            var subscriptionEntity = await GetSubscriptionAndCheckIfItExists(id, trackChanges);
            var subscriptionForReturn = _mapper.Map<SubscriptionDto>(subscriptionEntity);
            return subscriptionForReturn;
        }

        public async Task DeleteSubscriptionAsync(Guid id)
        {
            var subscriptionEntity = await GetSubscriptionAndCheckIfItExists(id, false);
            _repository.Subscription.DeleteSubscription(subscriptionEntity);
            await _repository.SaveAsync();
        }
        public async Task EditSubscriptionAsync(Guid id, SubscriptionForEditDto subscriptionForEdit)
        {
            var subscriptionEntity = await GetSubscriptionAndCheckIfItExists(id, true);
            _mapper.Map(subscriptionForEdit, subscriptionEntity);

            await _repository.SaveAsync();
        }

        private async Task CheckIfCategoryExists(Guid categoryId)
        {
            var category = await _repository.Category.GetCategoryAsync(categoryId, false);
            if (category is null)
                throw new CategoryNotFoundException(categoryId);
        }

        private async Task<Subscription> GetSubscriptionAndCheckIfItExists(Guid id, bool trackChanges)
        {
            var subcriptionEntity = await _repository.Subscription.GetSubscriptionByIdAsync(id, trackChanges);
            if (subcriptionEntity is null)
                throw new SubscriptionNotFoundException(id);

            return subcriptionEntity;
        }

    }
}
