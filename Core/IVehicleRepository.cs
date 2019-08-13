using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    
    public interface IVehicleRepository
    {
        Task Add(Vehicle vehicle);
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void Remove(Vehicle vehicle);
    }

}