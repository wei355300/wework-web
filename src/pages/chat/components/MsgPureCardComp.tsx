import React from "react";
import {Card} from "antd";
import {FileOutlined} from "@ant-design/icons";
import {ChatMsg} from "@/pages/chat/service";
import { parseFileName } from '../MsgUtils';

export interface MsgPureCompProp {
    msg: ChatMsg;
}

export class MsgPureCardComp extends React.Component<MsgPureCompProp> {

    constructor(props: MsgPureCompProp) {
        super(props);
    }

    render() {
        let msg = this.props.msg;
        let mediaUrl = msg.content || "";
        const fileName = mediaUrl && parseFileName(mediaUrl);
        return <Card hoverable style={{width: 500}} >
                    <FileOutlined/>{fileName}
                </Card>
    }
}