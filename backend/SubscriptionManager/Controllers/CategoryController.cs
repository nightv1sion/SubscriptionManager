using Filters.ActionFilters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using Service.Contracts;
using Shared.DataTransferObjects.Category;

namespace SubscriptionManager.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/categories")]
    public class CategoryController : ControllerBase
    {
        private readonly IServiceManager _service;
        public CategoryController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categoriesForReturn = await _service.CategoryService.GetCategoriesAsync(false);
            return Ok(categoriesForReturn);
        }

        [HttpGet("{id:guid}", Name = "GetCategoryById")]
        public async Task<IActionResult> GetCategory(Guid id)
        {
            var category = await _service.CategoryService.GetCategoryAsync(id, false);
            return Ok(category);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateCategory(CategoryForCreationDto category)
        {
            var categoryForReturn = await _service.CategoryService.CreateCategoryAsync(category);
            return CreatedAtRoute("GetCategoryById", new { id = categoryForReturn.Id }, categoryForReturn);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            await _service.CategoryService.DeleteCategoryAsync(id);
            return NoContent();
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> EditCategory(Guid id, CategoryForEditDto category)
        {
            await _service.CategoryService.EditCategoryAsync(id, category);
            return NoContent();
        }
    }
}
