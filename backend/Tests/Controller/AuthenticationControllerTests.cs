using FakeItEasy;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects.Authentication;
using SubscriptionManager.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests.Controller
{
    public class AuthenticationControllerTests
    {
        private readonly IServiceManager _service;
        private readonly AuthenticationController _controller;
        public AuthenticationControllerTests()
        {
            _service = A.Fake<IServiceManager>();
            _controller = new AuthenticationController(_service);
        }
        [Fact]
        public async Task AuthenticationController_RegisterUser_ReturnsBadRequestObjectResult_IfIdentityResultIsFailed()
        {
            // Arrange
            var userForRegistration = new UserForRegistrationDto();
            A.CallTo(() => _service.AuthenticationService.RegisterUser(userForRegistration))
                .Returns(Task.FromResult(IdentityResult.Failed()));

            // Act
            var result = await _controller.RegisterUser(userForRegistration);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<BadRequestObjectResult>();
        }
        [Fact]
        public async Task AuthenticationController_RegisterUser_ReturnsStatusCodeResult_IfIdentityResultIsSuccess()
        {
            // Arrange
            var userForRegistration = new UserForRegistrationDto();
            A.CallTo(() => _service.AuthenticationService.RegisterUser(userForRegistration))
                .Returns(Task.FromResult(IdentityResult.Success));

            // Act
            var result = await _controller.RegisterUser(userForRegistration);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<StatusCodeResult>();
        }

        [Fact]
        public async Task AuthenticationController_Authenticate_ReturnsUnauthorizedResult_IfUserIsValidated()
        {
            // Arrange
            var userForAuthentication = new UserForAuthenticationDto();
            A.CallTo(() => _service.AuthenticationService.ValidateUser(userForAuthentication))
                .Returns(Task.FromResult(false));

            // Act 
            var result = await _controller.Authenticate(userForAuthentication);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<UnauthorizedResult>();
        }
        [Fact]
        public async Task AuthenticationController_Authenticate_ReturnsOkObjectResult_IfUserIsNotValidated()
        {
            // Arrange
            var userForAuthentication = new UserForAuthenticationDto();
            A.CallTo(() => _service.AuthenticationService.ValidateUser(userForAuthentication))
                .Returns(Task.FromResult(true));

            // Act 
            var result = await _controller.Authenticate(userForAuthentication);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
        }
    }
}
