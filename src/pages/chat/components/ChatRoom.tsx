import React, { useState, useEffect } from 'react';
import { Dispatch, connect } from 'umi';
import InfiniteScroll from 'react-infinite-scroller';
import { Form, Drawer, List, Avatar } from 'antd';
import ProList from '@ant-design/pro-list';

import { chatRoomList, ChatRoom, ChatMsg } from '../service';
import MsgComponentProvider from './MsgComponentProvider';

import { Typography } from 'antd';
import ChatRoomModel, { ChatRoomStateType } from '../model';
const { Title } = Typography;

export interface ChatRoomProps {
  chatRoom: ChatRoom;
  visible?: boolean;
  onVisibleChange?: any;
  list?: ChatMsg[];
  total?: number;
  loading?: boolean;
  dispatch: Dispatch;
}

interface ChatRoomState {
  chatRoom: ChatRoom;
  list?: ChatMsg[];
  total?: number;
}

/**
 * 按时间倒序, 采用虚拟滚动的形式展示聊天记录
 */

const ChatRoomComponent: React.FC<ChatRoomProps> = (props) => {
  const { dispatch } = props;
  const drawerWidth = 850;
  const defaultPageSize = 40;
  console.log('chatroom props: ', props);
  console.log('chatroom: ', props.chatRoom);

  // const dispatchMsgList = () => {
  //   dispatch({
  //     type: 'chatRoomMsgModel/reqChatRoomMsgList',
  //     payload: {
  //       roomId: props.chatRoom.roomId,
  //     },
  //   });
  // }

  useEffect(() => {
    loadMoreData(0);
  }, []);

  const loadMoreData = (page:any) => {
    console.log('page', page);
    dispatch({
      type: 'chatRoomMsgModel/reqChatRoomMsgList',
      payload: {
        roomId: props.chatRoom.roomId,
        // current: currentPage,
        // pageSize: pageSize
      },
    });
  }

  const hasMore = () => {
    return true;
  }

  return (
    <>
      <Drawer
        width={drawerWidth}
        title={props?.chatRoom?.name || ""} //fixme 文字长度过长, 需要截取
        visible={props.visible}
        onClose={() => {
          props.onVisibleChange(false);
          //重置数据
          dispatch({
            type: 'chatRoomMsgModel/resetChatRoomMsgList',
            payload: {
              roomId: props.chatRoom.roomId,
            },
          });
        }}
      >
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMoreData}
          hasMore={!props.loading && hasMore()}
          useWindow={false}
          isReverse={true}
        >
          <List dataSource={props.list} 
            renderItem={msg => (
              <List.Item key={msg.id} extra={msg.msgTime}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={msg.sender?.thumbAvatar} />
                  }
                  title={msg.sender?.name}
                  description={msg.content}
                />
                {/* <div>{msg.content}</div> */}
              </List.Item>
            )}
            >
          </List>
          {/* <ProList<ChatRoom>
            pagination={{
              // defaultPageSize: 20,
              responsive: true,
              showSizeChanger: true
            }}
            metas={{
              title: {
                render: (text: React.ReactNode, msg: ChatMsg,index: number) => {
                  return MsgComponentProvider({msg: msg});
                  // return <Title level={5} style={{ width: '800px' }} ellipsis={true}>{msg.content}</Title>;
                }
              },
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
            dataSource={props.list}
            loading={props.loading}
          /> */}
        </InfiniteScroll>
      </Drawer>
    </>
  );
};

export default connect(({chatRoomMsgModel, loading}: {chatRoomMsgModel: ChatRoomStateType, loading: { models: { [key: string]: boolean }}}) => {
  return {
    list: chatRoomMsgModel.list,
    total: chatRoomMsgModel.total,
    loading: loading.models['chatRoomMsgModel'],
  }
},
)(ChatRoomComponent);