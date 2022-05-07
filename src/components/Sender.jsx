import Ionicons from '@expo/vector-icons/Ionicons';
import * as Device from 'expo-device';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableHighlight, View } from 'react-native';
import { firestore } from '../scripts/firebase';
import GifSearcher from './GifSearcher';

const Sender = (props) => {
    const {userDisplayName} = props
    const [inputValue, setInputValue] = useState('');
    const [gifVisible, setGifVisible] = useState(false);
    const input = useRef()
    
    const sendMessage = async (e) => {
        e.preventDefault()
        
        if (!inputValue) {
            return
        }

        let mess = inputValue
        input.value = ''
        const messageRef = firestore.collection('messages')
        
        await messageRef.add({
            text: mess,
            createdAt: Date.now(),
            uid: (userDisplayName + Device.deviceName),
            displayName: userDisplayName
        })
        
        setInputValue('')
    }

    
    const preSetGif = (e) => {
        e.preventDefault()
        setGifVisible(!gifVisible)
    }

    return (
        <>
            <GifSearcher gifVisible={gifVisible} setGifVisible={setGifVisible} userDisplayName={userDisplayName} />
            <View
                style={{flexDirection:"row", padding:10}}
                onSubmit={inputValue ? sendMessage : void 0}
            >
                <TextInput
                    placeholderTextColor='#aaaaaa'
                    onSubmitEditing={sendMessage}
                    style={styles.input}
                    value={inputValue}
                    placeholder='Envoyer un message...'
                    ref={input}
                    type="text"
                    onChangeText={setInputValue}
                />
                <TouchableHighlight
                    style={styles.activeButton}
                    underlayColor="#e60012"
                    activeOpacity={0.6}
                    onPress={sendMessage}
                >
                    <Ionicons
                        name="send-outline"
                        size={15}
                        color="white"
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.activeButton}
                    underlayColor="#e60012"
                    activeOpacity={0.6}
                    onPress={preSetGif}
                >
                    <Ionicons
                        name="film-outline"
                        size={15}
                        color="white" />
                </TouchableHighlight>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input:{
        flex:1,
        height:35,
        backgroundColor:'#393e46',
        paddingHorizontal:10,
        paddingVertical:0,
        borderRadius:40,
        color:"#FFFFFF"
    },
    activeButton: {
        paddingHorizontal:10,
        paddingVertical:5,
        marginLeft: 5,
        borderRadius: 20,
        backgroundColor:'#222831',
        alignItems:'center',
        justifyContent:'center'
    },
    textButton: {
        color:'#ffffff'
    }
})

export default Sender;