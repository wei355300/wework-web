import { request, Effect, history, Reducer } from 'umi';

import { chatRoomMsgList, ChatMsg} from './service'

export interface ChatRoomStateType {
  list?: ChatMsg[];
  total?: number;
}

export interface ChatRoomMsgModelType {
  namespace: string;
  state: ChatRoomStateType;
  effects: {
    reqChatRoomMsgList: Effect;
  };
  reducers: {
    getChatRoomMsgList: Reducer<ChatRoomStateType>;
    resetChatRoomMsgList: Reducer;
  };
}

const ChatRoomMsgModel: ChatRoomMsgModelType = {
  namespace: 'chatRoomMsgModel',

  state: {
    list: [],
    total: 0
  },

  effects: {
    *reqChatRoomMsgList({ payload }, { call, put }) {
      const response = yield call(chatRoomMsgList, payload);
      yield put({
        type: 'getChatRoomMsgList',
        payload: response,
      });
    },
  },

  reducers: {
    getChatRoomMsgList(state, { payload }) {
      console.log('state', state);
      console.log('payload', payload);
      let res_list = payload.data;
      let state_list = state?.list;
      let r_list = res_list.reverse().concat(state_list);
      return {
        ...state,
        list: r_list,
        total: payload.total,
      };
    },
    resetChatRoomMsgList(state, {payload}) {
      return {
        ...state,
        list: [],
        total: 0,
      };
    },
  },
};

export default ChatRoomMsgModel;