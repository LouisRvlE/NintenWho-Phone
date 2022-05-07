import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableHighlight, View, ImageBackground } from 'react-native';
import { TouchableRipple, Surface } from 'react-native-paper';
import { UserDataContext } from '../scripts/context';

const Login = () => {

    const [inputValue, setInputValue] = useState(null);
    const [image, setImage] = useState(null);
    

    const sendData = async (value) => {
        try {
            if (!inputValue) {
                alert('Il faut avoir rentré une valeur dans le champs Pseudo pour valider.')
                return
            }
            if (!image) {
                alert('Il faut avoir choisi une photo de profil pour valider.')
                return
            }
            const currData = await AsyncStorage.getItem('@userData')
            const userData = JSON.stringify({...JSON.parse(currData), displayName:inputValue, pdp:image})
            await AsyncStorage.setItem('@userData', userData)
            value.getData()
        } catch (e) {
            alert(e)
            alert('Une erreur est survenue dans le stockage de votre pseudo, merci de redémarrer l\'application')
        }
    }

    const pickImage = async () => {
        const hey = await ImagePicker.requestMediaLibraryPermissionsAsync()
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

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
                <ImageBackground source={{uri:'https://firebasestorage.googleapis.com/v0/b/nintenwho.appspot.com/o/marioback.png?alt=media&token=6632dd49-c496-49ce-ae2e-4ef3cf4d17c1'}} resizeMode="cover" style={styles.image}>
                    <TouchableRipple
                        style={styles.ripple}
                        rippleColor="#e60012"
                        activeOpacity={0.6}
                        onPress={pickImage}
                    >
                        <View>
                            <Text style={styles.rippleText}>
                                Choisir une photo de profil
                            </Text>
                            <Image
                                style={styles.img}
                                source={{uri:image}}
                            />
                        </View>
                    </TouchableRipple>
                </ImageBackground>
                <TouchableHighlight
                    style={styles.activeButton}
                    underlayColor="#e60012"
                    activeOpacity={0.6}
                    onPress={() => sendData(value)}
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
        margin:15
    },
    activeButton: {
        paddingHorizontal:10,
        paddingVertical:5,
        marginLeft: 5,
        borderRadius: 20,
        backgroundColor:'#222831',
        alignItems:'center',
        justifyContent:'center',
        margin:10
    },
    textButton: {
        color:'#ffffff'
    },
    img: {
        width:200,
        height:200,
        resizeMode: 'contain',
        borderRadius:100,
        margin: 5
    },
    ripple: {
        borderColor: "#e60012",
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 20,
        borderRadius: 3,
    },
    rippleText: {
        color:'#000000',
        fontWeight: '600'
    },
    image:{
        // flex: 1,
        justifyContent: "center"
    }
})


export default Login;