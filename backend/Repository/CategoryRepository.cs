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

        public async Task<IEnumerable<Category>> GetCategoriesForUserAsync(User user, bool trackChanges) => await FindByCondition(c => c.UserId.Equals(user.Id), trackChanges)
            .OrderBy(c => c.Name).ToListAsync();
        public async Task<Category> GetCategoryByNameForUserAsync(User user, string name, bool trackChanges) => await FindByCondition(c => c.UserId.Equals(user.Id) && c.Name.Equals(name), trackChanges)
            .SingleOrDefaultAsync();
        public async Task<Category> GetCategoryForUserAsync(User user, Guid id, bool trackChanges) => await FindByCondition(c => c.UserId.Equals(user.Id) && c.Id.Equals(id), trackChanges)
            .SingleOrDefaultAsync();

        public void CreateCategory(Category category) => Create(category);
        public void DeleteCategory(Category category) => Delete(category);
        public void EditCategory(Category category) => Update(category);

    }
}
