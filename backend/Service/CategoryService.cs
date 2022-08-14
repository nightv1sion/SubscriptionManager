using AutoMapper;
using Contracts;
using Entities.ExceptionModels;
using Entities.Models;
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
        public CategoryService(IRepositoryManager repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync(bool trackChanges)
        {
            var categoryEntities = await _repository.Category.GetCategoriesAsync(trackChanges);

            var categoriesForReturn = _mapper.Map<IEnumerable<CategoryDto>>(categoryEntities);
            return categoriesForReturn;
        }


        public async Task<CategoryDto> CreateCategoryAsync(CategoryForCreationDto category)
        {
            await CheckIfCategoryExistsAsync(category.Name);
            var categoryEntity = _mapper.Map<Category>(category);

            _repository.Category.CreateCategory(categoryEntity);
            await _repository.SaveAsync();

            var categoryForReturn = _mapper.Map<CategoryDto>(categoryEntity);
            return categoryForReturn;
        }
        public async Task<CategoryDto> GetCategoryAsync(Guid id, bool trackChanges)
        {
            var category = await GetCategoryAndCheckIfItExistsAsync(id, trackChanges);
            var categoryForReturn = _mapper.Map<CategoryDto>(category);
            return categoryForReturn;
        }
        public async Task DeleteCategoryAsync(Guid id)
        {
            var categoryEntity = await GetCategoryAndCheckIfItExistsAsync(id, false);
            categoryEntity.Subscriptions = await _repository.Subscription.GetSubscriptionsForCategoryAsync(id, false);
            _repository.Category.DeleteCategory(categoryEntity);
            await _repository.SaveAsync();
        }
        public async Task EditCategoryAsync(Guid id, CategoryForEditDto category)
        {
            var categoryEntity = await GetCategoryAndCheckIfItExistsAsync(id, true);
            _mapper.Map(category, categoryEntity);
            await _repository.SaveAsync();
        }

        private async Task<Category> GetCategoryAndCheckIfItExistsAsync(Guid id, bool trackChanges)
        {
            var category = await _repository.Category.GetCategoryAsync(id, trackChanges);
            if (category is null)
                throw new CategoryNotFoundException(id);

            return category;
        }
        private async Task CheckIfCategoryExistsAsync(string name)
        {
            var category = await _repository.Category.GetCategoryByNameAsync(name, false);
            if (category != null)
                throw new CategoryExistsConflictException(name);
        }

    }
}
