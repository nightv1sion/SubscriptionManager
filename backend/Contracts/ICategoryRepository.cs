using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface ICategoryRepository
    {
        Task<Category> GetCategoryByNameForUserAsync(User user, string name, bool trackChanges);
        Task<Category> GetCategoryForUserAsync(User user, Guid id, bool trackChanges);
        Task<IEnumerable<Category>> GetCategoriesForUserAsync(User user, bool trackChanges);
        void EditCategory(Category category);
        void DeleteCategory(Category category);
        void CreateCategory(Category category);
    }
}
