using AutoMapper;
using Entities.Models;
using Shared.DataTransferObjects.Category;

namespace SubscriptionManager.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CategoryForCreationDto, Category>();
            CreateMap<CategoryForEditDto, Category>();
        }
    }
}
