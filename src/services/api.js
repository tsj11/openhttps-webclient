import { stringify } from 'qs';
import request from '@/utils/request';

export async function HeartBeat() {
  return request('/api/framework/session/heartbeat');
}

export async function AccountLogin(params) {
  return request('/api/framework/auth/login', {
    method: 'POST',
    body: params,
  });
}

export async function AccountLogout() {
  return request('/api/framework/auth/logout');
}

export async function Register(params) {
  return request('/api/framework/register', {
    method: 'POST',
    body: params,
  });
}

// open-https front-end

// 同步管理
export async function querySync(params) {
  return request('/api/querySync', {
    method: 'POST',
    body: params,
  });
}

export async function updateSync(params) {
  return request('/api/updateSync', {
    method: 'POST',
    body: params,
  });
}

export async function queryEdge(params) {
  return request('/api/queryEdge', {
    method: 'POST',
    body: params,
  });
}

