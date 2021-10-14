import React, {useEffect, useRef, useState} from 'react';
import { Dispatch, connect } from 'umi';
import InfiniteScroll from 'react-infinite-scroller';
import {Drawer, List} from 'antd';
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
  const defaultPageSize = 10;
  const scrollBottomElementRef = useRef(null);
  const [isFirst, setFirst] = useState(true);

  useEffect(() => {
    // loadMoreData(1);
    if (isFirst) {
      loadMoreData(1);
      setFirst(false);
    }
  //
  //   // if((props.list?.length && (props.preDataSize || 0) <= defaultPageSize)) {
  //   //   scrollToBottom();
  //   // }
  }, [props.list]);

  // const scrollToBottom = () => {
  //   //fixme 滚动事件会触发 InfiniteScroll 的滚动监听, 导致快速的加载两次数据
  //   scrollBottomElementRef?.current?.scrollIntoView({ behavior: "smooth" });
  // }

  const loadMoreData = (page:number) => {
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
          {/*<Button onClick={scrollToBottom}>Btn</Button>*/}
          <InfiniteScroll
            initialLoad={false}
            pageStart={1}
            loadMore={loadMoreData}
            hasMore={!props.loading && hasMore()}
            useWindow={false}
            isReverse={false}
          >
            <>
            <List dataSource={props.list} 
              loading={props.loading}
              renderItem={msg => (
                ChatMsgComponentProvider({msg: msg}))}
              >
            </List>
             <div ref={scrollBottomElementRef} />
            </>
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