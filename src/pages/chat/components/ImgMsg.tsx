/**
 * 图片， 使用 aliyun 的 Url 图片访问能力
 * （https://help.aliyun.com/document_detail/44686.html?spm=5176.8466032.help.dexternal.323814507JnZKM）
 * 
 * 
 */
import React, { useState, useEffect } from 'react';
import { Typography, List, Avatar, Image } from 'antd';

import { ChatMsg } from '../service';

const { Text } = Typography;

export interface ImageMsgProps {
    msg?: ChatMsg;
    pure?: boolean;
}

class ImageMsg extends React.Component<ImageMsgProps>  {

    public msgType:string;

    constructor(props:ImageMsgProps) {
        super(props);
        this.msgType='image';
    }

  render() {
    let msg = this.props.msg || {};
    if(this.props.pure) {
        return <Image
                    height={50}
                    preview={false}
                    placeholder={true}
                    src={msg.content}
                />;
    }
    return <List.Item key={msg.id} extra={msg.msgTime}>
        <List.Item.Meta
            avatar={
                <Avatar src={msg.sender?.thumbAvatar} />
            }
            title={msg.sender?.name}
            description={
                <Image
                    height={300}
                    placeholder={true}
                    src={msg.content}
                />
            }
        />
    </List.Item>
  };
};

export default ImageMsg;