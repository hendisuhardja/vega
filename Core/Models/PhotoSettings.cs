using System.IO;
using System.Linq;

namespace vega.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }

        public string[] AcceptedFileType { get; set; }

        public bool IsSupported(string fileName)
        {
            return AcceptedFileType.Any(s => s == Path.GetExtension(fileName));
        }
    }
}