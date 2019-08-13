using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Core.Models
{
    [Table("VehicleFeatures")]
    public class VehicleFeature
    {
        public int VehicleID { get; set; }

        public int FeatureID { get; set; }

        public Vehicle Vehicle { get; set; }

        public Feature Feature { get; set; }
    }
}