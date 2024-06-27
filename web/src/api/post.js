import http from '@/utils/request.js';
import baseApi from '@/utils/api.js';

export const { add, get, getAll } = baseApi('post');

export function like(id) {
  return http({
    url: 'post/like',
    method: 'post',
    data: { id },
  });
}
