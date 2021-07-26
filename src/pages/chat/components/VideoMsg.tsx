/**
 * 音、视频的播放， 使用 aliyun 的 web 播放器 sdk
 * （https://help.aliyun.com/document_detail/125570.html?spm=a2c4g.11186623.6.1173.2d075488c2YTEb）
 * 
 * 
 */
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';


import { ChatMsg } from '../service';

const { Text } = Typography;

export interface VideoMsgProps {
    msg?: ChatMsg
}

class VideoMsg extends React.Component<VideoMsgProps>  {

    public msgType:string;

    constructor(props:VideoMsgProps) {
        super(props);
        this.msgType='video';
    }

  render() {
      return <Text>{this.props.msg?.content}</Text>;
  };
};

export default VideoMsg;