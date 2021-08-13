
import { request } from 'umi';

export interface CurrentUser {
  id?: number;
  name?: string;
  avatar?: string;
  thumbAvatar?: string;
  authority?: string;
  token?: string;
};

export interface CurrentUserResult {
  success?: boolean;
  showType?: number;
  errorCode?: string;
  errorMessage?: string;
  data?: CurrentUser;
  
}

export async function currentUserInfo(options?: { [key: string]: any }) {
  return request<CurrentUserResult>('/api/qc/wework/account/basic', {
    method: 'GET',
    ...(options || {}),
  });
}

// export async function currentUser(options?: { [key: string]: any }) {
//   return request<CurrentUser>('/api/currentUser', {
//     method: 'GET',
//     ...(options || {}),
//   });
// }