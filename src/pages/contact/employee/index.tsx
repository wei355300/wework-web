import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import OpenAccountForm, { OpenAccountFormProps } from './OpenAccountForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { employeeList, Employee } from './model';
import { OpenAccountParams, openAccount } from '../Account/model';
/**
 * 添加节点
 *
 * @param fields
 */

// const handleAdd = async (fields: API.RuleListItem) => {
//   const hide = message.loading('正在添加');

//   try {
//     await addRule({ ...fields });
//     hide();
//     message.success('添加成功');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('添加失败请重试！');
//     return false;
//   }
// };
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const EmployeeList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [openAccountModalVisible, handleOpenAccountModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<Employee>();
  const [selectedRowsState, setSelectedRows] = useState<Employee[]>([]);
  /** 国际化配置 */

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
    // {
    //   title: '服务调用次数',
    //   dataIndex: 'callNo',
    //   sorter: true,
    //   hideInForm: true,
    //   renderText: (val: string) =>
    //     `${val}${intl.formatMessage({
    //       id: 'pages.searchTable.tenThousand',
    //       defaultMessage: ' 万 ',
    //     })}`,
    // },
      // render: (text, record, index) => {
      //   console.log(text);
      //   console.log(record);
      //   console.log(index);
      //   return  (<Input value={text || ""} />);
      // }

      // valueEnum: {
      //   'admin': {
      //     text: '管理员',
      //     status: 'Default',
      //   },
      //   '普通账号': {
      //     text: '运行中',
      //     status: 'Processing',
      //   },
      //   2: {
      //     text: '已上线',
      //     status: 'Success',
      //   },
      //   3: {
      //     text: '异常',
      //     status: 'Error',
      //   },
      // },
    // {
    //   title: '上次调度时间',
    //   sorter: true,
    //   dataIndex: 'updatedAt',
    //   valueType: 'dateTime',
    //   renderFormItem: (item, { defaultRender, ...rest }, form) => {
    //     const status = form.getFieldValue('status');

    //     if (`${status}` === '0') {
    //       return false;
    //     }

    //     if (`${status}` === '3') {
    //       return (
    //         <Input
    //           {...rest}
    //           placeholder={intl.formatMessage({
    //             id: 'pages.searchTable.exception',
    //             defaultMessage: '请输入异常原因！',
    //           })}
    //         />
    //       );
    //     }

    //     return defaultRender(item);
    //   },
    // },
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
        // rowKey="key"
        rowKey="id"
        // search={{
        //   labelWidth: 120,
        // }}
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
        employee={currentRow} 
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
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )} */}
      {/* <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm> */}
      {/* <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      /> */}

      {/* <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer> */}
    </PageContainer>
  );
};

export default EmployeeList;
