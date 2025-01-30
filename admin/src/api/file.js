import http from '@/utils/request.js';

export function upload(data) {
  return http({ url: '/post/upload', method: 'post', data });
}
