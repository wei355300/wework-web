
import { request } from 'umi';

export interface Account {
  id?: number;
  name?: string;
  mobile?: string;
  avatar?: string;
  thumbAvatar?: string;
  authority?: string;
  token?: string;
  password?: string;
};

export interface AccountListResult {
  list?: Account[];
  total?: number;
}

export interface PaginationAccountListResult {
  success?: boolean;
  showType?: number;
  errorCode?: string;
  errorMessage?: string;
  data?: AccountListResult;
};

export interface UpdatePassParams {
  mobile: string;
  newPass: string;
  newPassConfirm: string;
}

export interface DelAccountParams {
  mobile: string;
}

export interface Result {
  success?: boolean;
  showType?: number;
  errorCode?: string;
  errorMessage?: string;
  data?: any;
};

export async function updatePass(params: UpdatePassParams) {
  return request<Result>('/api/qc/wework/account/update/pwd', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
  });
}

export async function delAccount(params: DelAccountParams) {
  return request<Result>('/api/qc/wework/account/del', {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: params,
  });
}

export async function accountList(
  params: {current?: number, pageSize?: number}, 
  options?: { [key: string]: any }) {
  const res = await request<PaginationAccountListResult>('/api/qc/wework/account/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {}),
  });
  const ret = {
    data:res.data?.list || [],
    total:res.data?.total || 0,
    success:res.success
  };
  return ret;
}