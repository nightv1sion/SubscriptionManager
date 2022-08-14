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
        Task<Category> GetCategoryByNameAsync(string name, bool trackChanges);
        Task<Category> GetCategoryAsync(Guid id, bool trackChanges);
        Task<IEnumerable<Category>> GetCategoriesAsync(bool trackChanges);
        void EditCategory(Category category);
        void DeleteCategory(Category category);
        void CreateCategory(Category category);
    }
}
