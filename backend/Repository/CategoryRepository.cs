using Contracts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(RepositoryContext context) : base(context) {}

        public async Task<IEnumerable<Category>> GetCategoriesAsync(bool trackChanges) => await FindAll(trackChanges).OrderBy(c => c.Name).ToListAsync();
        public void CreateCategory(Category category) => Create(category);

        public async Task<Category> GetCategoryByNameAsync(string name, bool trackChanges) => await FindByCondition(c => c.Name.Equals(name), trackChanges)
            .SingleOrDefaultAsync();

        public async Task<Category> GetCategoryAsync(Guid id, bool trackChanges) => await FindByCondition(c => c.Id.Equals(id), trackChanges)
            .SingleOrDefaultAsync();

        public void DeleteCategory(Category category) => Delete(category);
        public void EditCategory(Category category) => Update(category);
    }
}
