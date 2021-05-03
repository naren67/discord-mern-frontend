import React from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CradGiftcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmoticonsIcon from '@material-ui/icons/EmojiEmotions'
import Message from './Message'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { selectChannelId, selectChannelName } from './features/appSlice'
import { useState } from 'react'
import { useEffect } from 'react'
import db from './firebase'
import firebase from 'firebase'

import axios from './axios'

//pusher
import Pusher from 'pusher-js'

const pusher = new Pusher('ca601933a3860937099f', {
    cluster: 'ap2'
  });


const Chat = () => {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const getConversation = (channelId) =>{
        if(channelId){
            axios.get(`/get/conversation?id=${channelId}`).then((res)=>{
                setMessages(res.data[0].conversation)
            })
        }
    }

    useEffect(() => {
        getConversation(channelId)

        const channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            getConversation(channelId)

    }); 
    }, [channelId])

    const sendMessage = (e) => {
        e.preventDefault()

       axios.post(`/new/message?id=${channelId}`,{
           message : input,
           timestamp : Date.now(),
           user : user,
       })
       console.log('message sent')
        
        setInput('')
    }

    return (
        <div className='chat' >
            <ChatHeader channelName={channelName} />

            <div className="chat__messages">
                {messages.map((message) => {
                    console.log(message)
                })}
                {messages.map(message => (
                    <Message 
                    message={message.message} 
                    timestamp={message.timestamp} 
                    user={message.user} />
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon className="chat__Icons" fontSize='large' />
                <form>
                    <input type="text" disabled={!channelId} value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                    <button className='chat__inputButton' onClick={sendMessage} disabled={!channelId} type='submit'></button>
                </form>

                <div className="chat__inputIcon">
                    <CradGiftcardIcon className="chat__Icons" fontSize='large' />
                    <GifIcon className="chat__Icons" fontSize='large' />
                    <EmojiEmoticonsIcon className="chat__Icons" fontSize='large' />
                </div>
            </div>
        </div>
    )
}

export default Chat
