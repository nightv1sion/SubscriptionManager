using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.ExceptionModels
{
    public class CategoryNotFoundException : NotFoundException
    {
        public CategoryNotFoundException(Guid id) : base($"Category with id: {id} does not exist")
        {
        }
    }
}
