import { message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { accountList, UpdatePassParams, updatePass, DelAccountParams, delAccount } from './model';
import UpdatePassForm from './components/UpdatePassForm';
import DelAccountForm from './components/DelAccountForm';


const AccountList: React.FC = () => {

  const [updatePassModalVisible, handleUpdatePassModalVisible] = useState<boolean>(false);
  const [delAccountModalVisible, handleDelAccountModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  /** 国际化配置 */

  // const intl = useIntl();
  const columns: ProColumns[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'avatar',
    },
    {
      title: '账号',
      dataIndex: 'mobile',
      valueType: 'text',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      valueType: 'text',
      // tip: '员工姓名',
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: '权限',
      dataIndex: 'authority',
      valueType: "text",
      valueEnum: {
        'admin': '管理员',
        'user': '普通账号'
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="updatePass"
          onClick={() => {
            handleUpdatePassModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改密码
        </a>,
        <a
        key="del"
        onClick={() => {
          handleDelAccountModalVisible(true);
          setCurrentRow(record);
        }}
      >
        删除账号
      </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={"账号列表"}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        options = {{
          fullScreen: false,
          reload: true,
          setting: false,
          density: false,
          search: false,
        }}
        request={accountList}
        columns={columns}
        rowSelection={false}
      />
      

      <UpdatePassForm 
        account={currentRow} 
        visible={updatePassModalVisible} 
        onVisibleChange={(visible: boolean) => {
          handleUpdatePassModalVisible(visible);
        }}
        onSubmit={async (values: UpdatePassParams) => {
          const ret = await updatePass(values);
          if (ret.success) {
            message.success('更新成功');
            handleUpdatePassModalVisible(!updatePassModalVisible);
            return true;
          }
          else {
            message.warning(ret.errorMessage);
            return false;
          }
        }}
      />

      <DelAccountForm 
        account={currentRow} 
        visible={delAccountModalVisible} 
        onVisibleChange={(visible: boolean) => {
          handleDelAccountModalVisible(visible);
        }}
        onSubmit={async (values: DelAccountParams) => {
          const ret = await delAccount(values);
          if (ret.success) {
            message.success('删除成功');
            handleDelAccountModalVisible(!delAccountModalVisible);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            return true;
          }
          else {
            message.warning(ret.errorMessage);
            return false;
          }
        }}
      />
    </PageContainer>
    
  );
};

export default AccountList;
