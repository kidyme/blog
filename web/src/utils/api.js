import http from '@/utils/request.js';

export default (url) => {
  return {
    get: async (params) =>
      http({
        url,
        method: 'get',
        params,
      }),
    getAll: async (data) =>
      http({
        url,
        method: 'post',
        data,
      }),
    add: async (data) =>
      http({
        url,
        method: 'post',
        data,
      }),
    update: async (data) =>
      http({
        url,
        method: 'post',
        data,
      }),
    remove: async (data) =>
      http({
        url,
        method: 'post',
        data,
      }),
  };
};
