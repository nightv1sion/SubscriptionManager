using AutoMapper;
using Entities.Models;
using Shared.DataTransferObjects.Authentication;
using Shared.DataTransferObjects.Category;
using Shared.DataTransferObjects.Subscription;

namespace SubscriptionManager.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CategoryForCreationDto, Category>();
            CreateMap<CategoryForEditDto, Category>();

            CreateMap<Subscription, SubscriptionDto>();
            CreateMap<SubscriptionForCreateDto, Subscription>();
            CreateMap<SubscriptionForEditDto, Subscription>();

            CreateMap<UserForRegistrationDto, User>();
        }
    }
}
