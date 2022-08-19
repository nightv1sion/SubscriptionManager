using AutoMapper;
using Contracts;
using Entities.ExceptionModels;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> _userManager;

        public SubscriptionService(IRepositoryManager repository, IMapper mapper, UserManager<User> userManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
        }

        

        public async Task<IEnumerable<SubscriptionDto>> GetSubscriptionsForUserAsync(string username, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(username);
            var subscriptionEntities = await _repository.Subscription.GetSubscriptionsForUserAsync(user, trackChanges);

            var subscriptionsForReturn = _mapper.Map<IEnumerable<SubscriptionDto>>(subscriptionEntities);
            return subscriptionsForReturn;
        }

        public async Task<IEnumerable<SubscriptionDto>> GetSubscriptionsForCategoryForUserAsync(string username, Guid categoryId, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(username);
            await CheckIfCategoryForUserExists(user, categoryId);
            var subscriptionEntities = await _repository.Subscription.GetSubscriptionsForCategoryForUserAsync(user, categoryId, trackChanges);
            var subscriptionsForReturn = _mapper.Map<IEnumerable<SubscriptionDto>>(subscriptionEntities);

            return subscriptionsForReturn;
        }

        public async Task<SubscriptionDto> CreateSubscriptionForUserAsync(string username, SubscriptionForCreateDto subscriptionForCreate)
        {
            var user = await GetUserAndCheckIfItExists(username);
            var entity = _mapper.Map<Subscription>(subscriptionForCreate);

            entity.UserId = user.Id;

            if (subscriptionForCreate.CategoryId.HasValue)
                await CheckIfCategoryForUserExists(user, subscriptionForCreate.CategoryId.Value);

            _repository.Subscription.CreateSubscription(entity);
            await _repository.SaveAsync();

            var entityForReturn = _mapper.Map<SubscriptionDto>(entity);
            return entityForReturn;
        }

        public async Task<SubscriptionDto> GetSubscriptionByIdForUserAsync(string username, Guid id, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExists(username);
            var subscriptionEntity = await GetSubscriptionForUserAndCheckIfItExists(user, id, trackChanges);
            var subscriptionForReturn = _mapper.Map<SubscriptionDto>(subscriptionEntity);
            return subscriptionForReturn;
        }

        public async Task DeleteSubscriptionForUserAsync(string username, Guid id)
        {
            var user = await GetUserAndCheckIfItExists(username);
            var subscriptionEntity = await GetSubscriptionForUserAndCheckIfItExists(user, id, false);
            _repository.Subscription.DeleteSubscription(subscriptionEntity);
            await _repository.SaveAsync();
        }
        public async Task EditSubscriptionForUserAsync(string username, Guid id, SubscriptionForEditDto subscriptionForEdit)
        {
            var user = await GetUserAndCheckIfItExists(username);
            var subscriptionEntity = await GetSubscriptionForUserAndCheckIfItExists(user, id, true);
            _mapper.Map(subscriptionForEdit, subscriptionEntity);

            await _repository.SaveAsync();
        }

        private async Task CheckIfCategoryForUserExists(User user, Guid categoryId)
        {
            var category = await _repository.Category.GetCategoryForUserAsync(user, categoryId, false);
            if (category is null)
                throw new CategoryNotFoundException(categoryId);
        }

        private async Task<Subscription> GetSubscriptionForUserAndCheckIfItExists(User user, Guid id, bool trackChanges)
        {
            var subcriptionEntity = await _repository.Subscription.GetSubscriptionByIdForUserAsync(user, id, trackChanges);
            if (subcriptionEntity is null)
                throw new SubscriptionNotFoundException(id);

            return subcriptionEntity;
        }

        private async Task<User> GetUserAndCheckIfItExists(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
                throw new UserNotFoundException(username);

            return user;
        }
    }
}
