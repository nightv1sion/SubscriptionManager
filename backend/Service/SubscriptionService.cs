using Contracts;
using Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly IRepositoryManager _repository;
        public SubscriptionService(IRepositoryManager repository)
        {
            _repository = repository;
        }

    }
}
