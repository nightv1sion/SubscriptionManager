using Contracts;
using Entities.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Repository
{
    public class SubscriptionRepositoryTests
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly Guid userId;
        private readonly Guid categoryId;
        private readonly Guid subscriptionId;


        public SubscriptionRepositoryTests()
        {
            userId = Guid.NewGuid();
            categoryId = Guid.NewGuid();
            subscriptionId = Guid.NewGuid();
            var contextOptions = new DbContextOptionsBuilder<RepositoryContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var context = new RepositoryContext(contextOptions);
            SeedData(context);
            _repositoryManager = new RepositoryManager(context);
        
        }

        private void SeedData(RepositoryContext context)
        {
            context.Users.Add(new User
            {
                Id = userId,
            });
            context.Categories.Add(new Category()
            {
                Id = categoryId,
                Name = "SomeCategory",
                UserId = userId
            });

            context.Subscriptions.Add(new Subscription()
            {
                Id = subscriptionId,
                Name = "SomeSubscription1",
                UserId = userId,
                CategoryId = categoryId,
            });
            context.Subscriptions.Add(new Subscription()
            {
                Id = Guid.NewGuid(),
                Name = "SomeSubscription2",
                UserId = userId,
                CategoryId = categoryId,
            });
            context.Subscriptions.Add(new Subscription()
            {
                Id = Guid.NewGuid(),
                Name = "SomeSubscription3",
                UserId = userId,
                CategoryId = categoryId,
            });
            context.Subscriptions.Add(new Subscription()
            {
                Id = Guid.NewGuid(),
                Name = "SomeSubscriptionWithOutCategory1",
                UserId = userId,
            });
            context.Subscriptions.Add(new Subscription()
            {
                Id = Guid.NewGuid(),
                Name = "SomeSubscriptionWithOutCategory2",
                UserId = userId,
            });
            context.SaveChanges();
        }

        [Fact]
        public async Task SubscriptionRepository_GetUncategorizedSubscriptionsForUserAsync_ReturnsListOfSubscriptions()
        {
            // Arrange
            var user = new User() { Id = userId };
            
            // Act
            var result = await _repositoryManager.Subscription.GetUncategorizedSubscriptionsForUserAsync(user, false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ICollection<Subscription>>();
            result.Should().HaveCount(2);
        }
        [Fact]
        public async Task SubscriptionRepository_GetSubscriptionsForCategoryForUserAsync_ReturnsListOfSubscription()
        {
            // Arrange
            var user = new User() { Id = userId };

            // Act
            var result = await _repositoryManager.Subscription.GetSubscriptionsForCategoryForUserAsync(user, categoryId, false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ICollection<Subscription>>();
            result.Should().HaveCount(3);
        }
        [Fact]
        public async Task SubscriptionRepository_GetSubscriptionByIdForUserAsync_ReturnsSubscription()
        {
            // Arrange
            var user = new User() { Id = userId };

            // Act
            var result = await _repositoryManager.Subscription.GetSubscriptionByIdForUserAsync(user, subscriptionId, false);
            
            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<Subscription>();
            result.Name.Should().Be("SomeSubscription1");
        }
        [Fact]
        public async Task SubscriptionRepository_DeleteSubscription_DeletesSubscription()
        {
            // Arrange
            var user = new User() { Id = userId };

            // Act
            var subscription = await _repositoryManager.Subscription.GetSubscriptionByIdForUserAsync(user, subscriptionId, false);
            _repositoryManager.Subscription.DeleteSubscription(subscription);
            await _repositoryManager.SaveAsync();
            var result = await _repositoryManager.Subscription.GetSubscriptionsForCategoryForUserAsync(user, categoryId, false);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<ICollection<Subscription>>();
            result.Should().HaveCount(2);
        }
    }
}
