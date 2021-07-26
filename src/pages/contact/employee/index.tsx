import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import OpenAccountForm, { OpenAccountFormProps } from './OpenAccountForm';
import { employeeList, Employee } from './model';
import { OpenAccountParams, openAccount } from '../Account/model';

const EmployeeList: React.FC = () => {

  const [openAccountModalVisible, handleOpenAccountModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Employee>();

  // const intl = useIntl();
  const columns: ProColumns[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'avatar',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
    },
    {
      title: '职位',
      dataIndex: 'position',
      valueType: 'text',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="openAccount"
          onClick={() => {
            handleOpenAccountModalVisible(true);
            setCurrentRow(record);
          }}
        >
          开通账号
        </a>,
        <a
          key="chatList"
          onClick={() => {
            // handleOpenAccountModalVisible(true);
            setCurrentRow(record);
          }}
        >
          聊天记录
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={"员工列表"}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        // toolBarRender={() => [
        //   <Button
        //     type="primary"
        //     key="primary"
        //     onClick={() => {
        //       handleModalVisible(true);
        //     }}
        //   >
        //     <PlusOutlined /> 新建
        //   </Button>,
        // ]}
        options = {{
          fullScreen: false,
          reload: true,
          setting: false,
          density: false,
          search: {
            name: 'keyWord',
          }
        }}
        request={employeeList}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      <OpenAccountForm
        employee={currentRow || {}} 
        visible={openAccountModalVisible} 
        onVisibleChange={(visible: boolean) => {
          handleOpenAccountModalVisible(visible);
        }}
        onSubmit={async (values: OpenAccountParams) => {
          const ret = await openAccount(values);
          if (ret.success) {
            message.success('更新成功');
            handleOpenAccountModalVisible(!openAccountModalVisible);
            return true;
          }
          else {
            message.warning(ret.errorMessage);
            return false;
          }
        }}
      >
      </OpenAccountForm>
    </PageContainer>
  );
};

export default EmployeeList;
