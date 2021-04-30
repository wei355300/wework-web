
import { request } from 'umi';

export interface Employee {
  id?: number;
  name?: string;
  mobile?: string;
  avatar?: string;
  thumbAvatar?: string;
  position?: string;
  email?: string;
};

export interface EmployeeListResult {
  list?: Employee[];
  total?: number;
}

export interface PaginationEmployeeListResult {
  success?: boolean;
  showType?: number;
  errorCode?: string;
  errorMessage?: string;
  data?: EmployeeListResult;
};

export async function employeeList(
  params: {
    current?: number,
    pageSize?: number
  },
  options?: { [key: string]: any }) {
    const res = await request<PaginationEmployeeListResult>('/api/qc/wework/employee/list', {
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