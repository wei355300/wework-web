/**
 * React-Player:
 * https://github.com/CookPete/react-player
 * 
 * 音、视频的播放， 使用 aliyun 的 web 播放器 sdk
 * （https://help.aliyun.com/document_detail/125570.html?spm=a2c4g.11186623.6.1173.2d075488c2YTEb）
 * 
 * aliyun 转码:
 * https://help.aliyun.com/document_detail/29225.html
 */
import React, { useState, useEffect } from 'react';
import { useRequest } from 'umi';
import ReactAudioPlayer from 'react-audio-player';
// import ReactPlayer from 'react-player';
import { Typography, List, Avatar, Card } from 'antd';

import {
    FileOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';

import { ChatMsg, reqVoicePlayAddress } from '../service';
import {parseFileName} from "@/pages/chat/MsgUtils";
import {MsgPureCardComp} from "@/pages/chat/components/MsgPureCardComp";

const { Text } = Typography;

export interface AudioMsgProps {
    msg?: ChatMsg;
    pure?: boolean;
}

interface AudioMsgState {
    isConvertToMp3: boolean;
    voicePlayAddress?: string;
}

class AudioMsg extends React.Component<AudioMsgProps, AudioMsgState>  {

    public msgType:string;

    constructor(props:AudioMsgProps) {
        super(props);
        this.msgType='voice';
        this.state = {
            isConvertToMp3: false
        };
        this.convertVoicePlayAddress = this.convertVoicePlayAddress.bind(this);
    }

    // componentDidMount() {
    //     // this.convertVoicePlayAddress();
    // }

    setPlayAddress(url: string) {
        this.setState({
            isConvertToMp3: false,
            voicePlayAddress: url
        })
    }

    convertVoicePlayAddress = () => {
        const msg = this.props.msg;
        
        reqVoicePlayAddress({msgId: msg?.id || ""}).then(function(res) {
            console.log("ret", res);
            this.setPlayAddress(res);
            if(res && res.success) {
                this.setState({
                    isConvertToMp3: true,
                    voicePlayAddress: res.url
                });
            }
            else {
                this.setState({
                    isConvertToMp3: false
                });
            }
        }.bind(this));
    }

    setListMetaDescComp = () => {
        const isConvertToMp3 = this.state.isConvertToMp3;
        if (isConvertToMp3) {
            return <ReactAudioPlayer controls={true} src={this.state.voicePlayAddress || ""} />;
        }

        let mediaUrl = this.props.msg?.content || "";
        const fileName = parseFileName(mediaUrl);
        return <Card onClick={this.convertVoicePlayAddress} style={{height: 50}}>
            <PlayCircleOutlined style={{width: 20}} ></PlayCircleOutlined>
            <Text>{fileName}</Text>
        </Card>

    }

    // setPureComp = (fileName: string) => {
    //     return <Card
    //                     hoverable
    //                     style={{ width: 500 }}
    //                     >
    //                     <PlayCircleOutlined />{fileName}
    //                 </Card>
    // }

    render() {
        const msg = this.props.msg || {};

        if (this.props.pure) {
            return <MsgPureCardComp msg={msg} />
        }
        // let mediaUrl = msg.content || "";
        // const fileName = parseFileName(mediaUrl);

        //如果是 amr 格式的, 需要通过 aliyun 的媒体处理功能进行转码成 mp3格式
        //if msg.content.suffix == amr 
        //  判断是否存在 mp3 后缀的文件, 
        //  如果不存在再进行转码
        //    waiting codec to mp3 by aliyun media coder
        //    show peending toast
        // when get mp3 url
        // play...
        // if(!isConvertToMp3) {
        //     console.log("isConvertToMp3", isConvertToMp3);
        //     // <div>no convert to mp3</div>
        //     return <>
        //         <PlayCircleOutlined onClick={this.convertVoicePlayAddress} />
        //         {/* <div>no convert to mp3</div> */}
        //     </>
        // }
        return <List.Item key={msg.id} extra={msg.msgTime}>
            <List.Item.Meta
                avatar={
                    <Avatar src={msg.sender?.thumbAvatar} />
                }
                title={msg.sender?.name}
                description={
                    this.setListMetaDescComp()
                }
            />
        </List.Item>
    };
};

export default AudioMsg;