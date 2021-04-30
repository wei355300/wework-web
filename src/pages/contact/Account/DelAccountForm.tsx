import React, { useState } from 'react';
import ProForm, {
  ModalForm,
  ProFormText,
} from '@ant-design/pro-form';

export default (props) => {
  return (
    <>
      <ModalForm
        width={350}
        title={"删除"+(props?.account?.name || "")+"账号"}
        visible={props.visible}
        onFinish={props.onSubmit}
        onVisibleChange={(visible) => {
          props.onVisibleChange(visible);
        }}
      >
        <ProFormText width={200} name="mobile" disabled label="手机号" initialValue={props?.account?.mobile} />
      </ModalForm>
    </>
  );
};