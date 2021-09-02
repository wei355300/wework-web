/**
 * 图片， 使用 aliyun 的 Url 图片访问能力
 * （https://help.aliyun.com/document_detail/44686.html?spm=5176.8466032.help.dexternal.323814507JnZKM）
 *
 *
 */
import React from 'react';
import { List, Avatar, Card} from 'antd';
import { MsgPureCardComp } from './MsgPureCardComp';

import {
    FileOutlined
} from '@ant-design/icons';

import {ChatMsg} from '../service';
import { parseFileName } from '../MsgUtils';


// const {Text} = Typography;
// const {Meta} = Card;

export interface FileMsgProps {
    msg?: ChatMsg;
    pure?: boolean;
}

class FileMsg extends React.Component<FileMsgProps> {

    public msgType: string;

    constructor(props: FileMsgProps) {
        super(props);
        this.msgType = 'file';
    }

    render() {
        const msg = this.props.msg || {};

        if (this.props.pure) {
            return <MsgPureCardComp msg={msg} />
        }
        let mediaUrl = msg.content || "";
        const fileName = parseFileName(mediaUrl);

        return <List.Item key={msg.id} extra={msg.msgTime}>
            <List.Item.Meta
                avatar={
                    <Avatar src={msg.sender?.thumbAvatar}/>
                }
                title={msg.sender?.name}
                description={
                    <Card hoverable style={{width: 440}} >
                        <a href={mediaUrl}> <FileOutlined/>{fileName} </a>
                    </Card>
                }
            />
        </List.Item>
    };
}

export default FileMsg;