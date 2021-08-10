/**
 * 聊天室列表
 * 默认按聊天室的最后消息的时间倒序展示
 */

import React, { useState, useRef } from 'react';
import { Typography } from 'antd';
import ProList from '@ant-design/pro-list';
import { PageContainer } from '@ant-design/pro-layout';

import { chatRoomList, ChatRoom } from './service';

import ChatRoomCompontent from './components/ChatRoom';
// import ChatRoomMsgList from './components/ChatRoomMsg';
import ChatMsgComponentProvider from './components/MsgComponentProvider';

const { Title } = Typography;

 
const ChatList: React.FC = (props:any) => {
  const [openRoomModalVisible, handleOpenRoomModalVisible] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<ChatRoom>();

   return (
     <PageContainer>
      <ProList<ChatRoom>
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
        }}
        metas={{
          title: {
            render: (text: React.ReactNode,record: ChatRoom,index: number) => {
              return <Title level={5} style={{ width: '800px' }} ellipsis={true}>{record.name}</Title>;
            }
          },
          type: {dataIndex: 'new'},
          avatar: {dataIndex: 'avatar'},
          // description: {dataIndex: 'lastMsg'},
          description: {
            render: (text: React.ReactNode,record: ChatRoom,index: number) => {
              //   export interface ChatMsg {
              //   id?: string;
              //   sender?: ChatMsgUser;
              //   msgTime?: string;
              //   content?: string;
              //   msgType?: string;
              // };

            //   ChatRoom {
            //     id?: string;
            //     roomId?: string;
            //     name?: string;
            //     lastTime?: string;
            //     avatar?: string;
            //     lastMsg?: string;
            // };
              
              let msg = {
                id: record.id,
                // sender: {
                //   name:
                // },
                msgTime: record.lastTime,
                content: record.lastMsg,
                msgType: record.msgType
              }

              return ChatMsgComponentProvider({msg: msg, pure: true});
              // return <Title level={5} style={{ width: '800px' }} ellipsis={true}>{record.name}</Title>;
          }},
          actions: {},
          extra: {
            dataIndex: 'lastTime'
          }
        }}
        options = {{
          fullScreen: false,
          reload: true,
          setting: false,
          density: false,
          search: false,
        }}
        headerTitle="会话列表"
        split={true}
        request={chatRoomList}
        onRow={(record: ChatRoom) => {
          return {
            onClick: () => {
              // 以抽屉的形式打开聊天室的详情内容
              handleOpenRoomModalVisible(true);
              setCurrentRow(record);
            }
          }
        }}
      />
      {openRoomModalVisible && currentRow && (
        <ChatRoomCompontent 
          chatRoom={currentRow} 
          visible={openRoomModalVisible}
          onVisibleChange={(visible: boolean) => {
            handleOpenRoomModalVisible(visible);
            if(!visible) {
              setCurrentRow(undefined);
            }
          }}
        />
      )}
      {/* {openRoomModalVisible && currentRow && (
        <ChatRoomMsgList
          chatRoom={currentRow} 
          visible={openRoomModalVisible}
          onVisibleChange={(visible: boolean) => {
            handleOpenRoomModalVisible(visible);
            if(!visible) {
              setCurrentRow(undefined);
            }
          }}
        />
      )} */}
     </PageContainer>
   );
 };

 export default ChatList;
