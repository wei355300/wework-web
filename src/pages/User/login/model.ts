import { request } from 'umi';

export interface LoginParams  {
    current?: number;
    pageSize?: number;
}

export interface LoginResData {
    authority?: string;
    token?: string;
}

export interface LoginResult {
    success?: boolean;
    showType?: number;
    errorCode?: string;
    errorMessage?: string;
    data?: LoginResData;
};

export async function login(body: LoginParams, options?: { [key: string]: any }) {
    return request<LoginResult>('/api/qc/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
}