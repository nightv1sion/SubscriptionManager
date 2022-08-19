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
        Task<IEnumerable<CategoryDto>> GetCategoriesForUserAsync(string username, bool trackChanges);
        Task<CategoryDto> CreateCategoryForUserAsync(string username, CategoryForCreationDto category);
        Task<CategoryDto> GetCategoryForUserAsync(string username, Guid id, bool trackChanges);
        Task EditCategoryForUserAsync(string username, Guid id, CategoryForEditDto category);
        Task DeleteCategoryForUserAsync(string username, Guid id);






    }
}
