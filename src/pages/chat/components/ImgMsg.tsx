/**
 * 图片， 使用 aliyun 的 Url 图片访问能力
 * （https://help.aliyun.com/document_detail/44686.html?spm=5176.8466032.help.dexternal.323814507JnZKM）
 * 
 * 
 */
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';

import { ChatMsg } from '../service';

const { Text } = Typography;

export interface ImageMsgProps {
    msg?: ChatMsg
}

class ImageMsg extends React.Component<ImageMsgProps>  {

    public msgType:string;

    constructor(props:ImageMsgProps) {
        super(props);
        this.msgType='image';
    }

  render() {
      return <Text>{this.props.msg?.content}</Text>;
  };
};

export default ImageMsg;