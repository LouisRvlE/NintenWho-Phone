import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import { UserDataContext } from '../scripts/context';
import Login from './Login';

const Profil = ({navigation}) => {
    
    const deleteData = async (value) => {
        try {
            const currData = await AsyncStorage.getItem('@userData')
            const userData = JSON.stringify({...JSON.parse(currData), displayName:'', pdp:''})
            await AsyncStorage.setItem('@userData', userData)
            value.getData()
        } catch (e) {
            alert(e)
            alert('Une erreur est survenue dans le stockage de votre pseudo, merci de redémarrer l\'application')
        }
    }


    return (
        <UserDataContext.Consumer>
            { value => (
                <>
                {value.displayName ?
                <View style={styles.page}>
                    <View style={styles.viewName}>
                        <Text>
                            Bonjour
                        </Text>
                        <Text style={styles.displayName}>
                            {" " + value.displayName}
                        </Text>
                    </View>
                    <Image
                        style={styles.img}
                        source={{uri:value.pdp}}
                    />
                    <TouchableHighlight
                        style={styles.activeButton}
                        underlayColor="#e60012"
                        activeOpacity={0.6}
                        onPress={() => deleteData(value)}
                    >
                        <Text style={styles.textButton}>
                            Changer les informations du profil
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.activeButton}
                        underlayColor="#e60012"
                        activeOpacity={0.6}
                        onPress={() => navigation.navigate("ChatRoom")}
                    >
                        <Text style={styles.textButton}>
                            Accéder à la ChatRoom
                        </Text>
                    </TouchableHighlight>

                </View>
                :    
                <Login/>
                }
                </>
            )}
        </UserDataContext.Consumer>
    );
};

const styles = StyleSheet.create({
    page:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    log:{
        backgroundColor:'#393e46',
        paddingHorizontal:15,
        paddingVertical:5,
        borderRadius:40
    },
    logText:{
        color:'#ffffff',
    },
    input: {

    },
    activeButton: {
        paddingHorizontal:10,
        paddingVertical:5,
        marginLeft: 5,
        borderRadius: 20,
        backgroundColor:'#222831',
        alignItems:'center',
        justifyContent:'center',
        marginTop:15
    },
    textButton: {
        color:'#ffffff'
    },
    img: {
        width:100,
        height:100,
        resizeMode: 'contain',
        borderRadius:50,
        margin: 5
    },
    viewName: {
        flexDirection:'row',
    },
    displayName: {
        fontWeight: '600'
    }
})

export default Profil;