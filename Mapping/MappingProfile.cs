using AutoMapper;
using vega.Controllers.Resources;
using vega.Core.Models;
using System.Linq;
using System.Collections.Generic;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    { 
        public MappingProfile()
        {
            //Domain to API Resource
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<VehicleQueryResource, VehicleQuery>();
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContacctEmail, Phone = v.ContactPhone}))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureID)));

            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContacctEmail, Phone = v.ContactPhone}))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource { Id = vf.Feature.Id, Name = vf.Feature.Name })));

            //API Resource to Domain  
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContacctEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    //Remove unselected features
                    // var removedFeatures = new List<VehicleFeature>();

                    // foreach (var f in v.Features)
                    //     if(!vr.Features.Contains(f.FeatureID))
                    //         removedFeatures.Add(f);

                    var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureID)).ToList();

                    foreach(var f in removedFeatures)
                        v.Features.Remove(f);

                    // // Add new features
                    // foreach(var id in vr.Features)
                    //     if(!v.Features.Any(f => f.FeatureID == id))
                    //     v.Features.Add(new VehicleFeature { FeatureID = id });

                    var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureID == id)).Select(id => new VehicleFeature { FeatureID = id});
                    foreach(var f in addedFeatures)
                        v.Features.Add(f);
                });
                //.ForMember(v => v.Features, opt => opt.MapFrom(vr => vr.Features.Select(id => new VehicleFeature { FeatureID = id })));
        }
}
    }