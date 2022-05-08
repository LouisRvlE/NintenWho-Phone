import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '../scripts/firebase'; 
import Message from '../components/Message';
import { View, ScrollView, ImageBackground, StyleSheet, Vibration } from 'react-native';
import Sender from '../components/Sender';
import { UserDataContext } from '../scripts/context';

const ChatRoom = () => {
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt', 'desc').limit(25);

    const [messages, setMessages] = useState([]);

    const scrollRef = useRef()
    
    useEffect(() => {
        scrollRef.current.scrollTo?.({ y:60000 });
        return () => {
        };
    }, [messages]);

    useEffect(() => {
        const obs = query.onSnapshot(querySnapshot => {
            setMessages(querySnapshot.docs)
        })
        return () => {
        };
    }, []);

    let prevAuthor = 'default'

    let revMessages = []

    for (let m of messages) {
        revMessages.unshift(m)
    }

    return (
        <UserDataContext.Consumer>
            {(value) => (
                <View className='chatroom' style={{flexDirection: "column", flex:1}}>
                    <ImageBackground source={{uri:'https://firebasestorage.googleapis.com/v0/b/nintenwho.appspot.com/o/marioback.png?alt=media&token=6632dd49-c496-49ce-ae2e-4ef3cf4d17c1'}} resizeMode="cover" style={styles.image}>
                        <ScrollView ref={scrollRef} style={{flex:1, paddingLeft:10, paddingRight:10}} className="messages">
                            {messages && revMessages.map(doc => {
                                let msg = {...doc.data(), deleteDoc: () => doc.ref.delete(), prevAuthor:prevAuthor}
                                prevAuthor = msg?.uid
                                return (<Message key={msg.createdAt} {...msg} userDisplayName={value.displayName} />)
                            })}
                        </ScrollView>
                        <Sender userDisplayName={value.displayName} />
                    </ImageBackground>
                </View>
            )}
        </UserDataContext.Consumer>
    );
};


const styles = StyleSheet.create({
    image:{
        flex: 1,
        justifyContent: "center"
    }
})

export default ChatRoom;