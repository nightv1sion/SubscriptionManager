using AutoMapper;
using Contracts;
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

        public ServiceManager(IRepositoryManager repository, IMapper mapper)
        {
            _categoryService = new Lazy<ICategoryService>(() => new CategoryService(repository, mapper));   
            _subscriptionService = new Lazy<ISubscriptionService>(() => new SubscriptionService(repository, mapper));
        }

        public ICategoryService CategoryService => _categoryService.Value;

        public ISubscriptionService SubscriptionService => _subscriptionService.Value;
    }
}
