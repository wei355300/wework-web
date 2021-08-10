/**
 * 判断不同类型的消息使用哪种消息组件
 * 
 * 会话消息的消息类型分为多种, 参考: https://work.weixin.qq.com/api/doc/90000/90135/91360
 * 
 * 不同类型的消息展示不同的 UI,
 * 通过 msgtype 选择合适的 component 为子组件显示在 dom 下
 */

import React from 'react';
import TextMsg from './TextMsg';
import VideoMsg from './VideoMsg';
import ImageMsg from './ImgMsg';
import FileMsg from './FileMsg';
import { ChatMsg } from '../service';

export interface ChatMsgComponentProps {
    msg: ChatMsg;
    pure: boolean;
}

//fixme 动态加载 js 类库, 用于显示图片, 音/视频等能力

const ChatMsgComponentProvider = (props: ChatMsgComponentProps) => {

    let Comp;
    switch(props.msg.msgType) {
        case 'text':
            Comp = (<TextMsg {...props} />);
            break;
        case 'video':
            Comp = (<VideoMsg {...props}/>);
            break;
        case 'voice':
            Comp = (<TextMsg {...props} />);
            break;
        case 'image':
            Comp = (<ImageMsg {...props}/>);
            break;
        case 'file':
            Comp = (<FileMsg {...props} />);
            break;
        case 'emotion':
            Comp = (<TextMsg {...props} />);
            break;
        case 'revoke':
            Comp = (<TextMsg {...props} />);
            break;
        case 'location':
            Comp = (<TextMsg {...props} />);
            break;
        case 'sphfeed':
            Comp = (<TextMsg {...props} />);
            break;
        default:
            console.log('msgtype:', props.msg.msgType);
            Comp = ("<div>nothing</div>");
            break;
    }
    return Comp;
}

export default ChatMsgComponentProvider;