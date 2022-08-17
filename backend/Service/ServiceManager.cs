using AutoMapper;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Repository;
using Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class ServiceManager : IServiceManager
    {
        private readonly Lazy<ICategoryService> _categoryService;
        private readonly Lazy<ISubscriptionService> _subscriptionService;
        private readonly Lazy<IAuthenticationService> _authenticationService;

        public ServiceManager(IRepositoryManager repository, IMapper mapper, UserManager<User> userManager, IConfiguration configuration)
        {
            _categoryService = new Lazy<ICategoryService>(() => new CategoryService(repository, mapper));   
            _subscriptionService = new Lazy<ISubscriptionService>(() => new SubscriptionService(repository, mapper));
            _authenticationService = new Lazy<IAuthenticationService>(() => new AuthenticationService(mapper, userManager, configuration));
        }

        public ICategoryService CategoryService => _categoryService.Value;

        public ISubscriptionService SubscriptionService => _subscriptionService.Value;

        public IAuthenticationService AuthenticationService => _authenticationService.Value;
    }
}
