/**
 * 图片， 使用 aliyun 的 Url 图片访问能力
 * （https://help.aliyun.com/document_detail/44686.html?spm=5176.8466032.help.dexternal.323814507JnZKM）
 * 
 * 
 */
import React, { useState, useEffect } from 'react';
import { Typography, List, Avatar, Card } from 'antd';

import {
    FileOutlined
} from '@ant-design/icons';

import { ChatMsg } from '../service';


const { Text } = Typography;
const { Meta } = Card;

export interface FileMsgProps {
    msg?: ChatMsg;
    pure?: boolean;
}

class FileMsg extends React.Component<FileMsgProps>  {

    public msgType:string;

    constructor(props:FileMsgProps) {
        super(props);
        this.msgType='file';
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
                    style={{ width: 440 }}
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
                    <Card
                        hoverable
                        style={{ width: 440 }}
                        >
                        <a href={filePath}> <FileOutlined />{fileName} </a>
                    </Card>
                }
            />
        </List.Item>
  };
};

export default FileMsg;