import React, { useState, useEffect } from 'react';
// import { Dispatch, connect } from 'umi';
// import InfiniteScroll from 'react-infinite-scroller';
import { Drawer } from 'antd';
import ProList from '@ant-design/pro-list';

import { chatRoomMsgList, ChatRoom, ChatMsg } from '../service';

import ChatMsgComponentProvider from './MsgComponentProvider';

import { Typography } from 'antd';
// import ChatRoomModel, { ChatRoomStateType } from '../model';
const { Text } = Typography;

export interface ChatRoomProps {
  chatRoom: ChatRoom;
  visible?: boolean;
  onVisibleChange?: any;
  list?: ChatMsg[];
  total?: number;
  loading?: boolean;
}

// interface ChatRoomState {
//   chatRoom: ChatRoom;
//   list?: ChatMsg[];
//   total?: number;
// }

/**
 * 按时间倒序, 采用虚拟滚动的形式展示聊天记录
 */

 const ChatRoomMsgList: React.FC<ChatRoomProps> = (props:ChatRoomProps) => {
// const ChatRoomMsgList: React.FC<ChatRoomProps> = (props) => {
  const drawerWidth = 850;
  console.log('chatroom props: ', props);
  console.log('chatroom: ', props.chatRoom);

  return (
    <>
      <Drawer
        width={drawerWidth}
        title={props?.chatRoom?.name || ""}
        visible={props.visible}
        onClose={() => {
          props.onVisibleChange(false);
        }}
      >
        <ProList<ChatMsg>
            pagination={{
              defaultPageSize: 15,
              responsive: true,
              showSizeChanger: true,
            }}
            request={chatRoomMsgList}
            metas={{
              title: {
                render: (text: React.ReactNode,record: ChatMsg,index: number) => {
                  // return <Text style={{ width: '600px' }} ellipsis={true}>{record.content}</Text>;
                  // return <ChatMsgComponentProvider msg={record} />
                  // return ChatMsgComponentProvider.get(record.msgType);
                  return ChatMsgComponentProvider({msg: record});
                }
              },
              type: {dataIndex: 'new'},
              avatar: {dataIndex: 'avatar'},
              description: {dataIndex: 'lastMsg'},
              actions: {},
              extra: {
                dataIndex: 'lastTime'
              }
            }}
            // metas={{
            //   title: {
            //     render: (text: React.ReactNode, msg: ChatMsg,index: number) => {
            //       console.log("msg", msg);
            //       return <Title level={5} style={{ width: '800px' }} ellipsis={true}>{msg.content}</Title>;
            //     }
            //   },
            // }}
            options = {{
              fullScreen: false,
              reload: false,
              setting: false,
              density: false,
              search: false,
            }}
            // headerTitle="会话列表"
            split={true}
            params={{roomId: props.chatRoom?.roomId || ""}}
          />
      </Drawer>
    </>
  );
};

export default ChatRoomMsgList;