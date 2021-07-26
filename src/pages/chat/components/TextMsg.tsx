import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';


import { ChatMsg } from '../service';

const { Text } = Typography;

export interface TextMsgProps {
    msg?: ChatMsg
}

class TextMsg extends React.Component<TextMsgProps>  {

    public msgType:string;

    constructor(props:TextMsgProps) {
        super(props);
        this.msgType='text';
    }

  render() {
      return <Text>{this.props.msg?.content}</Text>;
  };
};

export default TextMsg;