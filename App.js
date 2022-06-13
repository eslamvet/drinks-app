import React, { useState } from 'react';
import { Location, Order, OrderDetail } from "./screens";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import Tabs from "./navigation/tabs";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { COLORS, darkTheme, FONTS, icons, lightTheme, SIZES } from './constants';
import './i18n'
export function Header({navigation,route,children,containerStyle}) {
    return (
        <View style={{height:120,backgroundColor:COLORS.primary,paddingHorizontal:SIZES.padding,paddingTop:SIZES.padding,alignItems:'center',...containerStyle}}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={icons.leftArrow} resizeMode='contain' style={{width:25,height:25,tintColor:COLORS.white}}  />
                </TouchableOpacity>
                <Text style={{flex:1,textAlign:'center',...FONTS.h1,color:COLORS.white,marginLeft:-SIZES.radius,fontWeight:'700'}}>{route.name === 'Location' ?  "Locations" : "Pick-up Order"}</Text>
            </View>
            {children}
        </View>
    )
}


const Stack = createNativeStackNavigator();
export const ThemeContext = React.createContext()
const App = () => {
    const color = useColorScheme()
    const [theme,setTheme] = useState(color === 'light' ? lightTheme : darkTheme)
    React.useEffect(() => {
        SplashScreen.hide();
    }, [])
    return (
        <GestureHandlerRootView style={{flex:1}}>
            <SafeAreaProvider style={{flex:1}}>
                <NavigationContainer>
                    <ThemeContext.Provider value={{Theme:theme,setTheme}}>
                        <Stack.Navigator
                            screenOptions={{
                                headerShown: false
                            }}
                            initialRouteName={'Home'}
                        >
                            <Stack.Screen
                                name="Home"
                                component={Tabs}
                            />
                            <Stack.Screen
                                name="Location"
                                component={Location}
                            />

                            <Stack.Screen
                                name="Order"
                                component={Order}
                            />
                            <Stack.Screen
                                name="OrderDetail"
                                component={OrderDetail}
                            />
                        </Stack.Navigator>
                    </ThemeContext.Provider>
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

export default App;