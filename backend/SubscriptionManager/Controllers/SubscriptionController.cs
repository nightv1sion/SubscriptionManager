using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects.Subscription;

namespace SubscriptionManager.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/subscriptions")]
    public class SubscriptionController : ControllerBase
    {
        private readonly IServiceManager _service;
        public SubscriptionController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscriptions()
        {
            var subscriptions = await _service.SubscriptionService.GetUncategorizedSubscriptionsForUserAsync(User.Identity.Name,false);
            return Ok(subscriptions);
        }

        [HttpGet("/api/categories/{categoryId:guid}/subscriptions")]
        public async Task<IActionResult> GetSubscriptionsForCategory(Guid categoryId)
        {
            var subscriptions = await _service.SubscriptionService.GetSubscriptionsForCategoryForUserAsync(User.Identity.Name,categoryId, false);
            return Ok(subscriptions);
        }

        [HttpGet("{id:guid}", Name = "GetSubscription")]
        public async Task<IActionResult> GetSubscription(Guid id)
        {
            var subscription = await _service.SubscriptionService.GetSubscriptionByIdForUserAsync(User.Identity.Name, id, false);
            return Ok(subscription);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubscriptionForCategory(SubscriptionForCreateDto subscriptionForCreate)
        {
            var subscription = await _service.SubscriptionService.CreateSubscriptionForUserAsync(User.Identity.Name, subscriptionForCreate);
            return CreatedAtRoute("GetSubscription", new { id = subscription.Id }, subscription);
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteSubscription(Guid id)
        {
            await _service.SubscriptionService.DeleteSubscriptionForUserAsync(User.Identity.Name, id);
            return NoContent();
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> EditSubscription(Guid id, SubscriptionForEditDto subscriptionForEdit)
        {
            await _service.SubscriptionService.EditSubscriptionForUserAsync(User.Identity.Name, id, subscriptionForEdit);
            return NoContent();
        }
    }

}
