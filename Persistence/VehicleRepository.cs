using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;

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
    }
}