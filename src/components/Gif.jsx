import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { TouchableHighlight, View, Text, Image, StyleSheet } from 'react-native';
import { firestore } from '../scripts/firebase';
import * as Device from 'expo-device';

const Gif = (props) => {

    const {content_description, media, setGifVisible, allGifSaved, updateAllGifSaved, userDisplayName} = props;

    const sendGif = async (e) => {
        e.preventDefault()
        const messageRef = firestore.collection('messages')
        
        await messageRef.add({
            type:'gif',
            gif: media[0].gif.url,
            createdAt: Date.now(),
            uid: (userDisplayName + Device.deviceName),
            displayName: userDisplayName
        })
        
        setGifVisible(false)
    }

    const FavGif = {media, content_description}
    
    return (

        <View style={styles.container}>
            <TouchableHighlight onPress={sendGif}>
                <>
                    <View>
                        <Image resizeMode={"contain"} style={styles.gif} source={{uri:media[0].gif.preview}}/>
                    </View>
                    
                    <View>
                        <Text>
                            {content_description}
                        </Text>
                    </View>
                </>
            </TouchableHighlight>
            <TouchableHighlight style={styles.star} onPress={() => updateAllGifSaved(FavGif)}>
                <Ionicons
                    name='star-outline'
                    size={25}
                    color='#000000'
                />
            </TouchableHighlight>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container:{
        width:75,
        height:100,
        justifyItems:'center',
    },
    gif:{
        flex:1,
        height:50,
        width:75,
        margin:3,
        borderRadius: 5,
        overflow:'hidden'
    },
    star:{
        flex:1,
        margin:'auto',
        height:60,
        alignItems:'center',
        justifyItems:'center'
    }
})

export default Gif;