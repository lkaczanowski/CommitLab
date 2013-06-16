using System.Linq;
using System.Reflection;

namespace KRD.RepoBrowser.Web.Api.Helpers
{
  public static class ValidationExtensions
  {
    public static bool ArePropertiesNull<T>(this T obj)
    {
      PropertyInfo[] propertyInfos = typeof(T).GetProperties();

      return
        propertyInfos.Select(propertyInfo => propertyInfo.GetValue(obj))
                     .All(value => !(value != null | (value is string && !string.IsNullOrWhiteSpace((string)value))));
    }
  }
}