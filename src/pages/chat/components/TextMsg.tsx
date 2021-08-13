import React, { useState, useEffect } from 'react';
import { Typography, List, Avatar } from 'antd';
// import { Drawer, List, Avatar } from 'antd';


import { ChatMsg } from '../service';

const { Text } = Typography;

export interface TextMsgProps {
    msg?: ChatMsg
    pure?: boolean;
}

class TextMsg extends React.Component<TextMsgProps>  {

    public msgType:string;

    constructor(props:TextMsgProps) {
        super(props);
        this.msgType='text';
    }
    
    render() {
        let msg = this.props.msg || {};
        if(this.props.pure) {
            return <Text>{msg.content}</Text>
        }
        return <List.Item key={msg.id} extra={msg.msgTime}>
            <List.Item.Meta
                avatar={
                    <Avatar src={msg.sender?.thumbAvatar} />
                }
                title={msg.sender?.name}
                description={msg.content}
            />
            {/* <div>{msg.content}</div> */}
        </List.Item>
      
    //   return <Text>{this.props.msg?.content}</Text>;
    };
};

export default TextMsg;