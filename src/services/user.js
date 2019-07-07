import request from '@/utils/request';

export async function queryUser() {
  return request('/api/personal/info');
}

export async function changeEmail(params) {
  return request('/api/personal/changeEmail', {
    method: 'POST',
    body: params,
  });
}

export async function changePassword(params) {
  return request('/api/personal/changePassword', {
    method: 'POST',
    body: params,
  });
}
