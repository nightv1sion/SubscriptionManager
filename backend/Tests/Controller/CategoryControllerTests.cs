using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects.Category;
using SubscriptionManager.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Controller
{
    public class CategoryControllerTests
    {
        private readonly IServiceManager _service;
        private readonly CategoryController _controller;
        public CategoryControllerTests()
        {
            _service = A.Fake<IServiceManager>();
            _controller = new CategoryController(_service);
            _controller.ControllerContext.HttpContext = new DefaultHttpContext()
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "SomeName")
                }))
            };
        }
        [Fact]
        public async Task CategoryController_GetCategories_ReturnsOk()
        {
            // Arrange
            A.CallTo(() => _service.CategoryService.GetCategoriesForUserAsync("SomeName", false))
                .Returns(Task.FromResult((IEnumerable<CategoryDto>)new List<CategoryDto>()));

            // Act
            var result = await _controller.GetCategories();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
        }
        [Fact]
        public async Task CategoryController_GetCategoryById_ReturnsOk()
        {
            // Arrange
            var id = Guid.NewGuid();
            A.CallTo(() => _service.CategoryService.GetCategoryForUserAsync("SomeName", id, false))
                .Returns(Task.FromResult(new CategoryDto(id, "SomeName")));

            // Act
            var result = await _controller.GetCategory(id);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
        }
        [Fact]
        public async Task CategoryController_CreateCategory_CreatedAtRouteResult()
        {
            // Arrange
            var id = Guid.NewGuid();
            var category = new CategoryForCreationDto();
            A.CallTo(() => _service.CategoryService.CreateCategoryForUserAsync("SomeName", category))
                .Returns(Task.FromResult(new CategoryDto(id, "SomeName")));

            // Act
            var result = await _controller.CreateCategory(category);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<CreatedAtRouteResult>();
        }
        [Fact]
        public async Task CategoryController_DeleteCategory_NoContentResult()
        {
            // Arrange
            var id = Guid.NewGuid();
            var category = new CategoryForCreationDto();
            A.CallTo(() => _service.CategoryService.DeleteCategoryForUserAsync("SomeName", id))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.DeleteCategory(id);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();
        }
        [Fact]
        public async Task CategoryController_EditCategory_NoContentResult()
        {
            // Arrange
            var id = Guid.NewGuid();
            var category = new CategoryForEditDto();
            A.CallTo(() => _service.CategoryService.EditCategoryForUserAsync("SomeName", id, category))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.EditCategory(id, category);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();
        }
    }
}
