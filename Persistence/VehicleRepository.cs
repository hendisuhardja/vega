using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;
using vega.Extensions;

namespace vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext context;
        public VehicleRepository(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {

            if(!includeRelated)
                return await context.Vehicles.FindAsync(id);
                
            var vehicle = await context.Vehicles
                .Include(x => x.Model)
                    .ThenInclude(m => m.Make)
                .Include(x => x.Features)
                    .ThenInclude(vf => vf.Feature)
                .SingleOrDefaultAsync(x => x.Id == id);

            return vehicle;
        }

        public async Task Add(Vehicle vehicle)
        {
            await context.Vehicles.AddAsync(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
             context.Vehicles.Remove(vehicle);
        }

        public async Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery queryObj)
        {
            var result = new QueryResult<Vehicle>();
            var query = context.Vehicles
                .Include(x => x.Model)
                    .ThenInclude(m => m.Make)
                .Include(x => x.Features)
                    .ThenInclude(vf => vf.Feature)
                .AsQueryable();

            query = ApplyFiltering(queryObj, query);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName,
                ["id"] = v => v.Id
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);
        
            result.Items = await query.ToListAsync();

            return result;
        }


        private IQueryable<Vehicle> ApplyFiltering(VehicleQuery queryObj, IQueryable<Vehicle> query)
        {
            if (queryObj.MakeId.HasValue)
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            if (queryObj.ModelId.HasValue)
                query = query.Where(v => v.Model.Id == queryObj.ModelId.Value);
            return query;
        }
    }
}