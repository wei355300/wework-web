
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

  export async function accountList(params: {current: number, pageSize: number}, options?: { [key: string]: any }) {
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