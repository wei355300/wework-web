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
import ReactAudioPlayer from 'react-audio-player';
// import ReactPlayer from 'react-player';
import { Typography, List, Avatar, Card } from 'antd';

import {
    FileOutlined
} from '@ant-design/icons';

import { ChatMsg } from '../service';

const { Text } = Typography;

export interface AudioMsgProps {
    msg?: ChatMsg;
    pure?: boolean;
}

class AudioMsg extends React.Component<AudioMsgProps>  {

    public msgType:string;

    constructor(props:AudioMsgProps) {
        super(props);
        this.msgType='voice';
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
                // <audio controls src={msg.content}>
                //     您的浏览器不支持 audio 标签。
                // </audio>
                // <audio controls>
                //     <source src="myAudio.mp3" type="audio/mpeg">
                //     <source src="myAudio.ogg" type="audio/ogg">
                //     <source src="myAudio.ogg" type="audio/3gpp">
                //     <p>Your browser doesn't support HTML5 audio. Here is
                //         a <a href="myAudio.mp3">link to the audio</a> instead.</p>
                // </audio>
                <ReactAudioPlayer controls={true} src={msg.content} />
            }
        />
    </List.Item>
  };
};

export default AudioMsg;