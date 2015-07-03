using System;
using System.Linq.Expressions;

namespace CommitLab.Data.Query.Interfaces
{
  public interface IPredicateComposer<TModel, in TFilter>
  {
    Expression<Func<TModel, bool>> Compose(TFilter filter);
  }
}
