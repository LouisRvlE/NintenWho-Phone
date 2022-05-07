import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { StyleSheet } from 'react-native';
import { auth } from '../scripts/firebase';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Device from 'expo-device';

const Message = (props) => {

    const {text: texte, createdAt, uid, photoURL, displayName, deleteDoc, prevAuthor, type, gif, userDisplayName} = props

    const timestamp = new Date(createdAt);
    let hours = timestamp.getHours() + "";
    hours = hours.length === 2 ? hours : "0" + hours;
    let minutes = timestamp.getMinutes() + "";
    minutes = minutes.length === 2 ? minutes : "0" + minutes;

    const isMine = (userDisplayName + Device.deviceName) === uid

    let styleMask = {...(isMine ? styles.mask : styles.maskRev), ...(type !== 'gif' ? null : styles.noCadre)}
    let styleEnca = (isMine ? styles.enca : styles.encaRev)
    let styleMsg = (isMine ? styles.msg : styles.msgRev)

    return (
        <View style={styles.message}>
            <View style={styleEnca}>
                { prevAuthor !== uid ?
                    <View>
                        <Text style={styles.displayName}> {displayName} </Text>
                    </View>
                :
                null
                }
                <View style={styleMsg}>
                    <View style={styleMask}>
                        {type !== 'gif' ? <Text style={styles.text}> {texte} </Text> : <Image resizeMode={"contain"} style={styles.gif} source={{uri:gif}} alt="" /> }
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.dateText}> { hours + ":" + minutes } </Text>
                    </View>
                    { isMine && 
                    <TouchableHighlight underlayColor={'#AAAAAA'} style={styles.delete} onPress={deleteDoc}>
                        <Ionicons name="close-outline" size={15} color="#393e46" />
                    </TouchableHighlight>
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    message:{
        flexDirection:"column-reverse",
        marginBottom:5
    },
    delete:{
        backgroundColor:"#FFFFFF",
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        marginLeft:5,
        width:20,
        height:20,
        borderRadius:30
    },
    enca:{
        justifyContent:'flex-end',
        flexDirection:"column",
        alignItems:"flex-end",
        
    },
    encaRev:{
        flexDirection:"column"
    },
    msgRev:{
        flexDirection:"row",
    },
    msg:{
        flexDirection:"row-reverse",
    },
    noCadre:{
        backgroundColor:'#00000000',
    },
    mask:{
        borderRadius:30,
        backgroundColor:'#393e46',
        paddingHorizontal:10,
        paddingVertical:7,
    },
    maskRev:{
        borderRadius:30,
        backgroundColor:'#e60012',
        paddingHorizontal:10,
        paddingVertical:7,
    },
    date:{
        marginTop:5,
    },
    dateText:{
        color:"#00000077"
    },
    text:{
        color:'white'
    },
    gif:{
        flex:1,
        height:150,
        width:250,
        margin:3,
        borderRadius: 5,
        overflow:'hidden'
    },
    displayName: {
        fontWeight: '600'
    }
})


export default Message;