/**
 * React-Player:
 * https://github.com/CookPete/react-player
 * 
 * 音、视频的播放， 使用 aliyun 的 web 播放器 sdk
 * （https://help.aliyun.com/document_detail/125570.html?spm=a2c4g.11186623.6.1173.2d075488c2YTEb）
 * 
 * 
 */
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Typography, List, Avatar, Card } from 'antd';

// import {
//     FileOutlined
// } from '@ant-design/icons';

import { ChatMsg } from '../service';
// import {parseFileName} from "@/pages/chat/MsgUtils";
import {MsgPureCardComp} from "@/pages/chat/components/MsgPureCardComp";

// const { Text } = Typography;

export interface VideoMsgProps {
    msg: ChatMsg;
    pure?: boolean;
}

class VideoMsg extends React.Component<VideoMsgProps>  {

    public msgType:string;

    constructor(props:VideoMsgProps) {
        super(props);
        this.msgType='video';
    }
    
    render() {
        const msg = this.props.msg || {};

        if (this.props.pure) {
            return <MsgPureCardComp msg={msg} />
        }

        return <List.Item key={msg.id} extra={msg.msgTime}>
                <List.Item.Meta
                    avatar={
                        <Avatar src={msg.sender?.thumbAvatar} />
                    }
                    title={msg.sender?.name}
                    description={
                        <ReactPlayer width={300} height={300} controls={true} url={msg.content} />
                    }
                />
            </List.Item>
    };
};

export default VideoMsg;