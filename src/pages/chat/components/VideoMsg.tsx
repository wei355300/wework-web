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

import {
    FileOutlined
} from '@ant-design/icons';

import { ChatMsg } from '../service';

const { Text } = Typography;

export interface VideoMsgProps {
    msg?: ChatMsg;
    pure?: boolean;
}

class VideoMsg extends React.Component<VideoMsgProps>  {

    public msgType:string;

    constructor(props:VideoMsgProps) {
        super(props);
        this.msgType='video';
    }

  render() {
    let msg = this.props.msg || {};
    let filePath = msg.content || "";
    let fileSplits = filePath.split('/') || [];
    let s = fileSplits?.length || 0;
    let fileName = fileSplits[s-1];

    if(this.props.pure) {
        return <Card
                    hoverable
                    style={{ width: 500 }}
                    >
                    <FileOutlined />{fileName}
                </Card>
    }
    return <List.Item key={msg.id} extra={msg.msgTime}>
        <List.Item.Meta
            avatar={
                <Avatar src={msg.sender?.thumbAvatar} />
            }
            title={msg.sender?.name}
            description={
                <ReactPlayer height={300} controls={true} url={msg.content} />
            }
        />
    </List.Item>
  };
};

export default VideoMsg;