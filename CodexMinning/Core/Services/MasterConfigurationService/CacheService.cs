using CodexMinning.Core.Common.Helper;
using CodexMinning.Core.Entities;
using CodexMinning.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Caching;

namespace CodexMinning.Core.Services
{
    public class CacheService
    {
        private CodexMinningEntities _ctx;
        public CacheService()
        {
            _ctx = new CodexMinningEntities();
        }

        private ObjectCache Cache
        {
            get
            {
                return MemoryCache.Default;
            }
        }

        public T Get<T>(string key)
        {
            var cachedData = this.Cache[key];
            return cachedData != null ? (T)cachedData : default(T);
        }

        public bool Add(string key, object value, TimeSpan? expiryTime = null)
        {
            CacheItemPolicy cacheItemPolicy = new CacheItemPolicy();

            if (expiryTime.HasValue)
            {
                cacheItemPolicy.AbsoluteExpiration = DateTime.Now + TimeSpan.FromMinutes(expiryTime.Value.TotalMinutes);
            }

            return this.Cache.Add(new CacheItem(key, value), cacheItemPolicy);
        }

        public bool Remove(string key)
        {
            return this.Cache.Remove(key) != null;
        }

    }
}