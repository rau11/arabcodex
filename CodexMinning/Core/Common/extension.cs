using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CodexMinning.Core.Common
{
    public static class extension
    {

        public static T MapTo<T>(this object obj)
        {
            return obj == null ? default(T) : Mapper.Map<T>(obj);
        }

        public static IList<TDestination> MapCollectionTo<TSource, TDestination>(this IList<TSource> obj)
        {
            return obj == null ? null : Mapper.Map<IList<TSource>, IList<TDestination>>(obj);
        }

        public static IEnumerable<TDestination> MapCollectionTo<TSource, TDestination>(this IEnumerable<TSource> obj)
        {
            return obj == null ? null : Mapper.Map<IEnumerable<TSource>, IEnumerable<TDestination>>(obj);
        }

    }
}