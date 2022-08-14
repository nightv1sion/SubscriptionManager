using Shared.DataTransferObjects.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Contracts
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync(bool trackChanges);
        Task<CategoryDto> CreateCategoryAsync(CategoryForCreationDto category);
        Task<CategoryDto> GetCategoryAsync(Guid id, bool trackChanges);
        Task EditCategoryAsync(Guid id, CategoryForEditDto category);
        Task DeleteCategoryAsync(Guid id);
    }
}
