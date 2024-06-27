import http from '@/utils/request.js';

export default (url) => {
  return {
    get: function (params) {
      return http({
        url,
        method: 'get',
        params,
      });
    },
    getAll: function (params = {}) {
      return http({
        url,
        method: 'get',
        params,
      });
    },
    add: async (data) =>
      http({
        url,
        method: 'post',
        data,
      }),
    update: async (data) =>
      http({
        url,
        method: 'put',
        data,
      }),
    remove: async (data) =>
      http({
        url,
        method: 'delete',
        data,
      }),
  };
};
