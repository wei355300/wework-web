import React, { useState, useEffect } from 'react';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';
import { Form } from 'antd';

import { Employee } from './model';

export interface OpenAccountFormProps {
  employee: Employee;
  visible: boolean;
  onFinish?: any;
  onSubmit?: any;
  onVisibleChange?: any;
}

export default (props:any) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      mobile: props?.employee?.mobile || "" 
    });
  });
  return (
    <>
      <ModalForm
        form={form}
        width={350}
        title={"开通"+(props?.employee?.name || "")+"账号"}
        visible={props.visible}
        onFinish={props.onSubmit}
        onVisibleChange={(visible) => {
          props.onVisibleChange(visible);
        }}
      >
        <ProFormText width={200} name="mobile" disabled label="手机号" />
        <ProForm.Group>
          <ProFormText
            width={200}
            name="password"
            label="请输入密码"
            tooltip="最少为 6 位"
            placeholder="请输入密码"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width={200}
            name="passConfirm"
            label="请再次输入密码"
            tooltip="最少为 6 位"
            placeholder="请再次输入密码"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};