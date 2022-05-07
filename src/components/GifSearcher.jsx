import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import Gif from './Gif';

const GifSearcher = (props) => {
    const {gifVisible, setGifVisible, userDisplayName} = props
    const [gifs, setGifs] = useState({results:[], type:''});
    const [inputValue, setInputValue] = useState('');
    const [allGifSaved, setAllGifSaved] = useState([]);


    const getData = async (e) => {
        e.preventDefault()
        let apikey = "OZ6PQN598POS"
        let lmt = 10
        let response = await fetch(url)

        let res = await response.json()
        setGifs(res)
    }
    
    const preSetGif = (e) => {
        e.preventDefault()
        setGifVisible(false)
    }
    
    useEffect(() => {
        (async () => {
            let allFavGif = await AsyncStorage.getItem("AllFavGif")
            if (allFavGif) {
                setAllGifSaved(JSON.parse(allFavGif))
            } else {
                await AsyncStorage.setItem("AllFavGif", JSON.stringify([]))
            }
        })()
    }, []);

    const updateAllGifSaved = async (newGif) => {
        let newAllGifSaved = [...allGifSaved]
        let include = false
        let pass = []
        for (let g of newAllGifSaved) {
            if (newGif.content_description === g.content_description) {
                include = true
            } else {
                pass.push(g)
            }
        }
        if (!include) {
            pass.push(newGif)
        }
        await AsyncStorage.setItem("AllFavGif", JSON.stringify(pass))
        if (gifs.type === "fav") setGifs({results:pass, type:'fav'});
        setAllGifSaved(pass)
    }

    const getFavs = () => {
        setGifs({results:allGifSaved, type:'fav'})
    }

    return (
        <View style={gifVisible ? styles.gifSearcher : styles.none}>
            <View style={styles.topbar} onSubmit={(e) => e.preventDefault()}>
                <TextInput placeholderTextColor='#aaaaaa' style={styles.finder} onChangeText={setInputValue} placeholder='Quelque chose de drôle...'/>
                <TouchableHighlight style={styles.activeButton} onPress={getData}>
                    <Ionicons
                        name='search-outline'
                        size={15}
                        color="white"
                    />
                </TouchableHighlight>
                <TouchableHighlight style={styles.activeButton} onPress={getFavs}>
                    <Ionicons
                        name='star-outline'
                        size={15}
                        color="white"
                    />
                </TouchableHighlight>
                <TouchableHighlight style={styles.activeButton} onPress={preSetGif}>
                    <Ionicons
                        name='close-outline'
                        size={15}
                        color="white"
                    />
                </TouchableHighlight>
            </View>
            <ScrollView style={styles.gifsScroll}>
                <View style={styles.gifs}>
                    {!gifs.results.length ? <Text>  Il faut chercher quelque chose ! 🧐 </Text> : gifs.results.map((g, index) => <Gif userDisplayName={userDisplayName} allGifSaved={allGifSaved} updateAllGifSaved={updateAllGifSaved} setGifVisible={setGifVisible} key={index} {...g} /> )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    gifSearcher: {
        backgroundColor:'#FFFFFF',
        height: 300,
        padding: 10
    },
    none: {
        height:0,
        opacity: 0
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
    },
    topbar: {
        flexDirection: 'row'
    },
    finder: {
        flex: 1,
        paddingHorizontal:10,
        paddingVertical:5,
        marginLeft: 5,
        borderRadius: 20,
        backgroundColor:'#222831',
        alignItems:'center',
        justifyContent:'center',
        color: '#FFFFFF'
    },
    gifsScroll:{
        flex:1
    },
    gifs: {
        marginTop:20,
        padding: 10,
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-around',
        flexWrap:'wrap'
        
    }
})


export default GifSearcher;