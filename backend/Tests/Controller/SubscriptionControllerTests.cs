using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects.Category;
using Shared.DataTransferObjects.Subscription;
using SubscriptionManager.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Controller
{
    public class SubscriptionControllerTests
    {
        private readonly IServiceManager _service;
        private readonly SubscriptionController _controller;
        public SubscriptionControllerTests()
        {
            _service = A.Fake<IServiceManager>();
            _controller = new SubscriptionController(_service);
            _controller.ControllerContext.HttpContext = new DefaultHttpContext()
            {
                User = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "SomeName")
                }))
            };
        }
        [Fact]
        public async Task SubscriptionController_GetSubscriptions_ReturnsOk()
        {
            // Arrange
            var categoryId = Guid.NewGuid();
            A.CallTo(() => _service.SubscriptionService.GetSubscriptionsForCategoryForUserAsync("SomeName", categoryId, false))
                .Returns(Task.FromResult((IEnumerable<SubscriptionDto>)new List<SubscriptionDto>()));

            // Act
            var result = await _controller.GetSubscriptions();

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
        }
        [Fact]
        public async Task SubscriptionController_GetSubscription_ReturnsOk()
        {
            // Arrange
            var categoryId = Guid.NewGuid();
            var subscriptionId = Guid.NewGuid();
            A.CallTo(() => _service.SubscriptionService.GetSubscriptionByIdForUserAsync("SomeName", categoryId, false))
                .Returns(Task.FromResult(new SubscriptionDto(subscriptionId, "SomeSubscription", 300, null, null, categoryId)));

            // Act
            var result = await _controller.GetSubscription(categoryId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
        }
        [Fact]
        public async Task SubscriptionController_CreateSubscriptionForCategory_ReturnsCreatedAtRouteResult()
        {
            // Arrange
            var subscriptionForCreate = new SubscriptionForCreateDto();
            var categoryId = Guid.NewGuid();
            var subscriptionId = Guid.NewGuid();
            A.CallTo(() => _service.SubscriptionService.CreateSubscriptionForUserAsync("SomeName", subscriptionForCreate))
                .Returns(Task.FromResult(new SubscriptionDto(subscriptionId, "SomeSubscription", 300, null, null, categoryId)));

            // Act
            var result = await _controller.CreateSubscriptionForCategory(subscriptionForCreate);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<CreatedAtRouteResult>();
        }
        [Fact]
        public async Task SubscriptionController_DeleteSubscription_ReturnsNoContent()
        {
            // Arrange
            var subscriptionId = Guid.NewGuid();
            A.CallTo(() => _service.SubscriptionService.DeleteSubscriptionForUserAsync("SomeName", subscriptionId))
                .Returns(Task.CompletedTask);
            
            // Act
            var result = await _controller.DeleteSubscription(subscriptionId);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();
        }
        [Fact]
        public async Task SubscriptionController_EditSubscription_ReturnsNoContent()
        {
            // Arrange
            var subscriptionForEdit = new SubscriptionForEditDto();
            var subscriptionId = Guid.NewGuid();
            A.CallTo(() => _service.SubscriptionService.EditSubscriptionForUserAsync("SomeName", subscriptionId, subscriptionForEdit))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _controller.EditSubscription(subscriptionId, subscriptionForEdit);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();
        }
    }
}
