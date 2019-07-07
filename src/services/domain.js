import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryDomains(params) {
  return request('/api/domain/list', {
    method: 'POST',
    body: params,
  });
}

export async function deleteDomain(params) {
  return request('/api/domain/delete', {
    method: 'POST',
    body: params,
  });
}

export async function deployCertificate(params) {
  return request('/api/domain/deployCertificate', {
    method: 'POST',
    body: params,
  });
}

export async function revokeCertificate(params) {
  return request('/api/domain/revokeCertificate', {
    method: 'POST',
    body: params,
  });
}

export async function setDomainHttpsConfig(params) {
  return request('/api/domain/setDomainHttpsConfig', {
    method: 'POST',
    body: params,
  });
}

export async function setDomainWafConfig(params) {
  return request('/api/domain/setDomainWafConfig', {
    method: 'POST',
    body: params,
  });
}

export async function prepareDomain(params) {
  return request('/api/domain/prepareDomain', {
    method: 'POST',
    body: params,
  });
}

export async function verifyDomainDNS(params) {
  return request('/api/domain/verifyDomainDNS', {
    method: 'POST',
    body: params,
  });
}

export async function setOrigin(params) {
  return request('/api/domain/setOrigin', {
    method: 'POST',
    body: params,
  });
}

export async function getDomain(params) {
  return request('/api/domain/get', {
    method: 'POST',
    body: params,
  });
}


