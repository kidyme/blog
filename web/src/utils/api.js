import http from '@/utils/request.js';

export default (url) => {
  return {
    get: (params) =>
      http({
        url: url + '/one',
        method: 'get',
        params,
      }),
    getAll: (params = {}) =>
      http({
        url,
        method: 'get',
        params,
      }),
    add: (data) =>
      http({
        url,
        method: 'post',
        data,
      }),
    update: (data) =>
      http({
        url,
        method: 'put',
        data,
      }),
    remove: (data) =>
      http({
        url,
        method: 'delete',
        data,
      }),
  };
};
