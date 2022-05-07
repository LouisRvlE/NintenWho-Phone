import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { UserDataContext } from '../scripts/context';
import Login from './Login';

const Profil = ({navigation}) => {
    const [pseudoValue, setPseudoValue] = useState('');
    const validPseudo = async () => {
        await AsyncStorage.setItem('@pseudo', pseudoValue)
    }

    const deletePseudo = async (value) => {
        try {
            const currData = await AsyncStorage.getItem('@userData')
            const userData = JSON.stringify({...JSON.parse(currData), displayName:''})
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
                    <Text>
                        Bonjour {value.displayName}
                    </Text>
                    <TouchableHighlight
                        style={styles.activeButton}
                        underlayColor="#e60012"
                        activeOpacity={0.6}
                        onPress={() => deletePseudo(value)}
                    >
                        <Text style={styles.textButton}>
                            Changer de pseudo
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
    }
})

export default Profil;