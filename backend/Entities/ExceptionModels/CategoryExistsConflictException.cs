using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.ExceptionModels
{
    public class CategoryExistsConflictException : ConflictException
    {
        public CategoryExistsConflictException(string name) : base($"Category with name: {name} already exists")
        {
        }
    }
}
