import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { LogBox } from 'react-native';
import ChatRoom from './src/pages/ChatRoom';
import Login from './src/pages/Login.jsx';
import Profil from './src/pages/Profil.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserDataContext } from './src/scripts/context';


LogBox.ignoreLogs(['Setting a timer']);


const Stack = createNativeStackNavigator();

const App = () => {
    
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@userData')
            if(value !== null) {
            }
            let newState = {...state, ...JSON.parse(value)}

            setState(newState)
        } catch (e) {
        alert('Une erreur est survenue dans la récupération de vos données, merci de redémarrer l\'application')
        }
    }

    const initialState = {
        displayName: '',
        pdp:'',
        getData
    }

    const [state, setState] = useState(initialState);


    useEffect(() => {
        getData()
        return () => {
        };
    }, []);

    return (
        <UserDataContext.Provider value={state}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={Profil}
                        options={{
                            title:'NintenWho - Profil',
                            headerTintColor:"#FFFFFF",
                            headerStyle: {
                                backgroundColor: '#e60012',
                            }
                        }}
                    />
                    <Stack.Screen
                        name="ChatRoom"
                        component={ChatRoom}
                        options={{
                            title:'NintenWho - ChatRoom',
                            headerTintColor:"#FFFFFF",
                            headerStyle: {
                                backgroundColor: '#e60012',
                            },
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserDataContext.Provider>
    );
}

export default App;