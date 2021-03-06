import { Effect, Reducer } from 'umi';

import { chatRoomMsgList, ChatMsg, reqVoicePlayAddress} from './service'

export interface ChatRoomStateType {
  list?: ChatMsg[];
  preDataSize?: number;
  total?: number;
}

export interface ChatRoomMsgModelType {
  namespace: string;
  state: ChatRoomStateType;
  effects: {
    reqChatRoomMsgList: Effect;
    reqVoicePlayAddr: Effect;
  };
  reducers: {
    getChatRoomMsgList: Reducer<ChatRoomStateType>;
    resetChatRoomMsgList: Reducer;
    getVoicePlayAddr: Reducer;
  };
}

const ChatRoomMsgModel: ChatRoomMsgModelType = {
  namespace: 'chatRoomMsgModel',

  state: {
    list: [],
    preDataSize: 0,
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
    *reqVoicePlayAddr({ payload }, { call, put }) {
      const response = yield call(reqVoicePlayAddress, payload);
      yield put({
        type: 'getVoicePlayAddr',
        payload: response,
      });
    }
  },

  reducers: {
    getChatRoomMsgList(state, { payload }) {
      let res_list = payload.data;
      let state_list = state?.list || [];
      // let r_list = res_list.reverse().concat(state_list);
      let r_list = state_list.concat(res_list);
      return {
        ...state,
        list: r_list,
        preDataSize: res_list.length,
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
    getVoicePlayAddr(state, {payload}) {
      return {
        ...state,
        url: payload.url
      };
    },
  },
};

export default ChatRoomMsgModel;