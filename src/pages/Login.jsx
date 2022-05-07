import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataContext } from '../scripts/context';

const Login = () => {

    const [inputValue, setInputValue] = useState('');

    const sendPseudo = async (value) => {
        try {
            if (!inputValue) {
                alert('Il faut avoir rentré une valeur dans le champs Pseudo pour valider.')
                return
            }
            const currData = await AsyncStorage.getItem('@userData')
            const userData = JSON.stringify({...JSON.parse(currData), displayName:inputValue})
            await AsyncStorage.setItem('@userData', userData)
            value.getData()
        } catch (e) {
            alert(e)
            alert('Une erreur est survenue dans le stockage de votre pseudo, merci de redémarrer l\'application')
        }
    }

    return (
        <UserDataContext.Consumer>
            { value => (<View style={styles.page}>
                <Text>
                    Choississez votre pseudo
                </Text>
                <Text>
                    {value.displayName}
                </Text>
                <TextInput
                    placeholderTextColor='#aaaaaa'
                    style={styles.input}
                    value={inputValue}
                    placeholder='Pseudo...'
                    type="text"
                    onChangeText={setInputValue}/>
                <TouchableHighlight
                    style={styles.activeButton}
                    underlayColor="#e60012"
                    activeOpacity={0.6}
                    onPress={() => sendPseudo(value)}
                >
                    <Text style={styles.textButton}>
                        Valider
                    </Text>
                </TouchableHighlight>
            </View>)}
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
        justifyContent:'center'
    },
    textButton: {
        color:'#ffffff'
    }
})


export default Login;