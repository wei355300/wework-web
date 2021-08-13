import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';

export default (props) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      mobile: props?.account?.mobile || "" 
    });
  });
  return (
    <>
      <ModalForm
        form={form}
        width={350}
        title={"修改"+(props?.account?.name || "")+"密码"}
        visible={props.visible}
        onFinish={props.onSubmit}
        onVisibleChange={(visible) => {
          props.onVisibleChange(visible);
        }}
      >
        <ProFormText width={200} name="mobile" disabled label="手机号"/>
        <ProForm.Group>
          <ProFormText
            width={200}
            name="newPass"
            label="请输入新密码"
            tooltip="最少为 6 位"
            placeholder="请输入新密码"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width={200}
            name="newPassConfirm"
            label="请再次输入新密码"
            tooltip="最少为 6 位"
            placeholder="请再次输入新密码"
          />
        </ProForm.Group>
      </ModalForm>
    </>
  );
};