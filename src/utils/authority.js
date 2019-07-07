import { HeartBeat } from "@/services/api";

export async function getAuthority() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authority = await HeartBeat();
  return authority;
}

export async function setAuthority() {
  // set authority
}
