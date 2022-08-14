using Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly RepositoryContext _context;
        private readonly Lazy<ICategoryRepository> _categoryRepository;
        private readonly Lazy<ISubscriptionRepository> _subscriptionRepository;

        public RepositoryManager(RepositoryContext context)
        {
            _context = context;
            _categoryRepository = new Lazy<ICategoryRepository>(() => new CategoryRepository(context));
            _subscriptionRepository = new Lazy<ISubscriptionRepository>(() => new SubscriptionRepository(context));
        }
        public ICategoryRepository Category => _categoryRepository.Value;
        public ISubscriptionRepository Subscription => _subscriptionRepository.Value;
        public async Task SaveAsync() => await _context.SaveChangesAsync();
    }
}
