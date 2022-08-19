using AutoMapper;
using Contracts;
using Entities.ExceptionModels;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Service.Contracts;
using Shared.DataTransferObjects.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepositoryManager _repository;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        public CategoryService(IRepositoryManager repository, IMapper mapper, UserManager<User> userManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesForUserAsync(string username, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExistsAsync(username);

            var categoryEntities = await _repository.Category.GetCategoriesForUserAsync(user, trackChanges);

            var categoriesForReturn = _mapper.Map<IEnumerable<CategoryDto>>(categoryEntities);
            return categoriesForReturn;
        }

        public async Task<CategoryDto> CreateCategoryForUserAsync(string username, CategoryForCreationDto category)
        {
            var user = await GetUserAndCheckIfItExistsAsync(username);

            await CheckIfCategoryExistsAsync(user, category.Name);
            var categoryEntity = _mapper.Map<Category>(category);
            categoryEntity.UserId = user.Id;

            _repository.Category.CreateCategory(categoryEntity);
            await _repository.SaveAsync();

            var categoryForReturn = _mapper.Map<CategoryDto>(categoryEntity);
            return categoryForReturn;
        }
        public async Task<CategoryDto> GetCategoryForUserAsync(string username, Guid id, bool trackChanges)
        {
            var user = await GetUserAndCheckIfItExistsAsync(username);
            var category = await GetCategoryAndCheckIfItExistsAsync(user, id, trackChanges);
            var categoryForReturn = _mapper.Map<CategoryDto>(category);
            return categoryForReturn;
        }
        public async Task DeleteCategoryForUserAsync(string username, Guid id)
        {
            var user = await GetUserAndCheckIfItExistsAsync(username);
            var categoryEntity = await GetCategoryAndCheckIfItExistsAsync(user, id, false);
            categoryEntity.Subscriptions = await _repository.Subscription.GetSubscriptionsForCategoryForUserAsync(user, id, false);
            _repository.Category.DeleteCategory(categoryEntity);
            await _repository.SaveAsync();
        }
        public async Task EditCategoryForUserAsync(string username, Guid id, CategoryForEditDto category)
        {
            var user = await GetUserAndCheckIfItExistsAsync(username);
            var categoryEntity = await GetCategoryAndCheckIfItExistsAsync(user, id, true);
            _mapper.Map(category, categoryEntity);
            await _repository.SaveAsync();
        }

        private async Task<Category> GetCategoryAndCheckIfItExistsAsync(User user, Guid id, bool trackChanges)
        {
            var category = await _repository.Category.GetCategoryForUserAsync(user, id, trackChanges);
            if (category is null)
                throw new CategoryNotFoundException(id);

            return category;
        }
        private async Task CheckIfCategoryExistsAsync(User user, string name)
        {
            var category = await _repository.Category.GetCategoryByNameForUserAsync(user, name, false);
            if (category != null)
                throw new CategoryExistsConflictException(name);
        }

        private async Task<User> GetUserAndCheckIfItExistsAsync(string username) 
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
                throw new UserNotFoundException(username);

            return user;
        }
    }
}
