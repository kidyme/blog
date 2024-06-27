import http from '@/utils/request.js';
import baseApi from '@/utils/api.js';

export const { get, getAll, add } = baseApi('message');

export function like(id) {
  return http({
    url: 'message/like',
    method: 'post',
    data: { id },
  });
}
