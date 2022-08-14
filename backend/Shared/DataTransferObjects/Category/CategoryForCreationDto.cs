using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.DataTransferObjects.Category
{
    public record CategoryForCreationDto
    {
        [Required(ErrorMessage = "Category Name is required")]
        public string? Name { get; init; }
    }
}
