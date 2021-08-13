import React, { useState, useEffect } from 'react';
import { Form, Drawer } from 'antd';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
} from '@ant-design/pro-form';

export interface ChatRoomProps {
  roomId: string;
  visible: boolean;
  onFinish?: any;
  onSubmit?: any;
  onVisibleChange?: any;
}

export default (props:ChatRoomProps) => {
  const [form] = Form.useForm();
  const clolunWitch = 300;
  useEffect(() => {
    form.setFieldsValue({
      mobile: props?.account?.mobile || "" 
    });
  });
  return (
    <>
      <DrawerForm
        form={form}
        width={350}
        title={"修改"+(props?.account?.name || "")+"密码"}
        visible={props.visible}
        onFinish={props.onSubmit}
        onVisibleChange={(visible) => {
          props.onVisibleChange(visible);
        }}
      >
        <ProFormText width={clolunWitch} name="mobile" disabled label="手机号"/>
        <ProForm.Group>
          <ProFormText
            width={clolunWitch}
            name="newPass"
            label="请输入新密码"
            tooltip="最少为 6 位"
            placeholder="请输入新密码"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width={clolunWitch}
            name="newPassConfirm"
            label="请再次输入新密码"
            tooltip="最少为 6 位"
            placeholder="请再次输入新密码"
          />
        </ProForm.Group>
      </DrawerForm>
    </>
  );
};