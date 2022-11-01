using Contracts;
using Entities.Models;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Repository
{
    public class CategoryRepositoryTests
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly Guid userId;
        private readonly Guid categoryId;
        public CategoryRepositoryTests()
        {
            var contextOptions = new DbContextOptionsBuilder<RepositoryContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var context = new RepositoryContext(contextOptions);
            userId = Guid.NewGuid();
            categoryId = Guid.NewGuid();
            SeedData(context);
            _repositoryManager = new RepositoryManager(context);

        }
        private void SeedData(RepositoryContext context)
        {
            context.Users.Add(new User() { Id = userId });
            context.Categories.Add(new Category() 
            { Id = Guid.NewGuid(), Name = "SomeCategory1", UserId = userId });
            
            context.Categories.Add(new Category()
            { Id = Guid.NewGuid(), Name = "SomeCategory2", UserId = userId });

            context.Categories.Add(new Category()
            { Id = categoryId, Name = "SomeCategory3", UserId = userId });

            context.SaveChanges();
        }
        [Fact]
        public async Task CategoryRepository_GetCategoriesForUserAsync_ReturnsListOfCategories()
        {
            // Arrange
            var user = new User() { Id = userId };
            
            // Act
            var result = await _repositoryManager.Category
                .GetCategoriesForUserAsync(user, false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ICollection<Category>>();
            result.Should().HaveCount(3);
        }
        [Fact]
        public async Task CategoryRepository_GetCategoryByNameForUserAsync_ReturnsCategory()
        {
            // Arrange
            var user = new User() { Id = userId };
            var name = "SomeCategory1";

            // Act
            var result = await _repositoryManager.Category
                .GetCategoryByNameForUserAsync(user, name,false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<Category>();
            result.Name.Should().Be(name);
        }
        [Fact]
        public async Task CategoryRepository_GetCategoryForUserAsync_ReturnsCategory()
        {
            // Arrange
            var user = new User() { Id = userId };
            var name = "SomeCategory3";

            // Act
            var result = await _repositoryManager.Category
                .GetCategoryForUserAsync(user, categoryId, false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<Category>();
            result.Name.Should().Be(name);
        }
        [Fact]
        public async Task CategoryRepository_DeleteCategory_DeletesCategory()
        {
            // Arrange
            var user = new User() { Id = userId };
            var category = await _repositoryManager.Category.GetCategoryForUserAsync(user, categoryId, false);

            // Act
            _repositoryManager.Category.DeleteCategory(category);
            await _repositoryManager.SaveAsync();
            var result = await _repositoryManager.Category.GetCategoriesForUserAsync(user, false);
            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ICollection<Category>>();
            result.Should().HaveCount(2);
        }
        [Fact]
        public async Task CategoryRepository_UpdateCategory_UpdatesCategory()
        {
            // Arrange
            var user = new User() { Id = userId };
            var category = await _repositoryManager.Category.GetCategoryForUserAsync(user, categoryId, false);
            var newCategoryName = "UpdatedCategory";
            category.Name = newCategoryName;
            // Act
            _repositoryManager.Category.EditCategory(category);
            await _repositoryManager.SaveAsync();
            var result = await _repositoryManager.Category.GetCategoriesForUserAsync(user, false);
            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ICollection<Category>>();
            result.Should().HaveCount(3);
            result.FirstOrDefault(c => c.Id == categoryId).Name.Should().Be(newCategoryName);
        }
    }
}
