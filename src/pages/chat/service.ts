import { request } from 'umi';

export interface ChatMsgUser {
    id?: string;
    name?: string;
    position?: string;
    thumbAvatar?: string;
    type?: string;
  }
  
  export interface ChatMsg {
    id?: string;
    sender?: ChatMsgUser;
    msgTime?: string;
    content?: string;
    msgType?: string;
  };

export interface ChatRoom {
    id?: string;
    roomId?: string;
    name?: string;
    lastTime?: string;
    avatar?: string;
    lastMsg?: string;
};

export interface ChatRoomListResult {
    list?: ChatRoom[];
    total?: number;
};

export interface ChatRoomMsgListResult {
    list?: ChatMsg[];
    total?: number;
};

export interface ChatRoomUserListResult {
    list?: ChatMsgUser[];
    total?: number;
};
  
export interface PaginationChatRoomListResult {
    success?: boolean;
    showType?: number;
    errorCode?: string;
    errorMessage?: string;
    data?: ChatRoomListResult;
};
  
export interface PaginationChatRoomMsgListResult {
    success?: boolean;
    showType?: number;
    errorCode?: string;
    errorMessage?: string;
    data?: ChatRoomMsgListResult;
};
  
export interface PaginationChatRoomUserListResult {
    success?: boolean;
    showType?: number;
    errorCode?: string;
    errorMessage?: string;
    data?: ChatRoomUserListResult;
};
  
export async function chatRoomList(
    params: {
        current?: number,
        pageSize?: number
    },
    options?: { [key: string]: any }) {
        const res = await request<PaginationChatRoomListResult>('/api/qc/wework/msg/room/list', {
        method: 'GET',
        params: {
        ...params
        },
        ...(options || {}),
    });
    const ret = {
        data:res.data?.list || [],
        total:res.data?.total || 0,
        success:res.success
    };
    return ret;
}

export async function chatRoomMsgList(
    params: {
        current?: number,
        pageSize?: number,
        roomId?: string,
    },
    options?: { [key: string]: any }) {
        let url = "/api/qc/wework/msg/room/"+params.roomId+"/content";
        const res = await request<PaginationChatRoomMsgListResult>(url, {
        method: 'GET',
        params: {
            ...params
        },
        ...(options || {}),
    });
    const ret = {
        data:res.data?.list || [],
        total:res.data?.total || 0,
        success:res.success
    };
    return ret;
}

export async function chatRoomUserList(
    params: {
        current?: number,
        pageSize?: number,
        roomId: string,
    },
    options?: { [key: string]: any }) {
        const res = await request<PaginationChatRoomUserListResult>("/api/qc/wework/msg/room/"+params.roomId+"/members", {
        method: 'GET',
        params: {
            ...params
        },
        ...(options || {}),
    });
    const ret = {
        data:res.data?.list || [],
        total:res.data?.total || 0,
        success:res.success
    };
    return ret;
}