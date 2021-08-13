import React, { useEffect, useRef } from 'react';
import { Dispatch, connect } from 'umi';
import InfiniteScroll from 'react-infinite-scroller';
import { Drawer, List, Avatar } from 'antd';
import { ChatRoom, ChatMsg } from '../service';
import { ChatRoomStateType } from '../model';

import ChatMsgComponentProvider from './MsgComponentProvider';

export interface ChatRoomProps {
  chatRoom: ChatRoom;
  visible?: boolean;
  onVisibleChange?: any;
  list?: ChatMsg[];
  preDataSize?: number;
  total?: number;
  loading?: boolean;
  dispatch: Dispatch;
}

/**
 * 按时间倒序, 采用虚拟滚动的形式展示聊天记录
 * 
 * 滚动加载组件:
 * https://github.com/danbovey/react-infinite-scroller
 */

const ChatRoomComponent: React.FC<ChatRoomProps> = (props) => {
  const { dispatch } = props;
  const drawerWidth = 850;
  const defaultPageSize = 20;
  // const scrollElementRef = useRef(null);

  useEffect(() => {
    loadMoreData(1);
    //todo 
    //scroll到每次加载的数据的最后一条的位置
    //div.scrollTop
    // console.log("scrollElementRef", scrollElementRef?.current);
  }, []);

  const loadMoreData = (page:number) => {
    console.log('page', page);
    let currentPage = page || 1;
    dispatch({
      type: 'chatRoomMsgModel/reqChatRoomMsgList',
      payload: {
        roomId: props.chatRoom.roomId,
        current: currentPage,
        pageSize: defaultPageSize
      },
    });
  }

  const hasMore = () => {
    let t = props.total || 0;
    let l = props.list?.length || 0;
    return t > l;
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
        <>
          <InfiniteScroll
            // ref={scrollElementRef}
            initialLoad={false}
            pageStart={1}
            loadMore={loadMoreData}
            hasMore={!props.loading && hasMore()}
            useWindow={false}
            isReverse={true}
          >
            <List dataSource={props.list} 
              loading={props.loading}
              renderItem={msg => (
                ChatMsgComponentProvider({msg: msg}))}
              >
            </List>
            {/* <div ref={messagesEndRef} /> */}
          </InfiniteScroll>
        </>
      </Drawer>
    </>
  );
};

export default connect(({chatRoomMsgModel, loading}: {chatRoomMsgModel: ChatRoomStateType, loading: { models: { [key: string]: boolean }}}) => {
  
  return {
    list: chatRoomMsgModel.list,
    preDataSize: chatRoomMsgModel.preDataSize,
    total: chatRoomMsgModel.total,
    loading: loading.models['chatRoomMsgModel'],
  }
},
)(ChatRoomComponent);