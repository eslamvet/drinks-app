import React, { useContext } from "react";
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import { Home, Rewards } from "../screens"
import { COLORS, SIZES, icons, FONTS, darkTheme, lightTheme } from "../constants"
import Svg, { Path } from "react-native-svg";
import { ThemeContext } from "../App";

function Header() {
    const {Theme,setTheme} = useContext(ThemeContext)
    function toggleTheme() {
        console.log('pressed');
        if(Theme.name === 'light') setTheme(darkTheme)
        else setTheme(lightTheme)
    }
    return (
        <View style={{flexDirection:'row',alignItems:'center',height:110,backgroundColor:COLORS.purple,paddingHorizontal:SIZES.padding,paddingBottom:30}}>
            <View style={{flex:1,marginRight:SIZES.radius}}>
                <Text style={{...FONTS.h1,color:COLORS.white,fontSize:27}}>Eslam,</Text>
                <Text style={{...FONTS.h1,color:COLORS.white,fontSize:27}}>Welcome Back!</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',height:40,backgroundColor:COLORS.lightPurple,borderRadius:20}}>
                <TouchableOpacity onPress={toggleTheme} style={[styles.imgContainer,{backgroundColor:Theme.name === 'light' ? COLORS.yellow : null}]}>
                    <Image source={icons.sunny} resizeMode='contain' style={{width:30,height:30,tintColor:COLORS.white}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleTheme} style={[styles.imgContainer,{backgroundColor:Theme.name === 'dark' ? COLORS.black : null}]}>
                    <Image source={icons.night} resizeMode='contain' style={{width:30,height:30,tintColor:COLORS.white}} />
                </TouchableOpacity>     
            </View>
        </View>
    )
}


function CustomTabBtn({containerStyle,isFloat,onPress,children}) {
    return isFloat ? (
        <View style={{flex:1,alignItems:'center',marginHorizontal:13}}>
            {
               SIZES.height > 800 && <>
                    <View style={{backgroundColor:COLORS.gray3,position:'absolute',width:'15%',left:'-15%',top:0,bottom:0}} />
                    <View style={{backgroundColor:COLORS.gray3,position:'absolute',width:'15%',right:'-15%',top:0,bottom:0}} />
               </> 
            }
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={91}
                height={61}
                viewBox="0 0 91 61"
            >
                <Path
                    d="M0 0a38.742 38.742 0 0113 7c5.313 4.4 6.7 8.593 12 13 5.993 4.98 12.987 8 20 8s14.007-3.02 20-8c5.3-4.408 6.687-8.6 12-13a38.742 38.742 0 0113-7v61H0V0z"
                    fill={COLORS.gray3}
                    fillRule="evenodd"
                />
            </Svg>
            <TouchableOpacity onPress={onPress} style={{height:60,width:60,borderRadius:30,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.primary,position:'absolute',top:-40}}>
                {children}
            </TouchableOpacity>
        </View>
    ) : (
        <TouchableWithoutFeedback onPress={onPress}>
            <View  style={{flex:1,height:60,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.gray3,...containerStyle}}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}
function CustomTab({props}) {
   return (
    <View>
        <View style={{position:'absolute',left:0,right:0,bottom:0,height:30,backgroundColor:COLORS.gray3,borderTopLeftRadius:SIZES.radius * 5,borderTopRightRadius:SIZES.radius * 5}} />
        <BottomTabBar {...props}  />
    </View>
   )
}
const Tab = createBottomTabNavigator()

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel:false,
                tabBarStyle:{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0, 
                    backgroundColor:"transparent", 
                    borderTopColor: "transparent",
                    height: (Platform.OS == 'android') ? 60 : 80
                },
                // headerShown:false           
            }}
            tabBar={(props)=><CustomTab props={props} />}
            initialRouteName="Intro"
        >
            <Tab.Group screenOptions={{header:()=><Header />}}>
                <Tab.Screen
                    name="Intro"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={icons.home}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                        ),
                        tabBarButton:(props)=><CustomTabBtn {...props} containerStyle={{borderTopLeftRadius:SIZES.radius * 5,paddingLeft:SIZES.base}} />
                    }}
                    
                />
                <Tab.Screen
                    name="Rewards"
                    component={Rewards}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={icons.bubbleTea}
                                resizeMode="contain"
                                style={{
                                    width: 35,
                                    height: 35,
                                    tintColor: focused ? COLORS.primary : COLORS.black
                                }}
                            />
                        ),
                        tabBarButton:(props)=><CustomTabBtn {...props}  />
                    }}
                />
            </Tab.Group>
            <Tab.Screen
                name="AddOrder"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.add}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: COLORS.white
                            }}
                        />
                    ),
                    tabBarButton:(props)=><CustomTabBtn {...props} isFloat={true} />
                }}
            />
            <Tab.Screen
                name="Favourite"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.heart}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}
                        />
                    ),
                    tabBarButton:(props)=><CustomTabBtn {...props} />
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icons.profile}
                            resizeMode="contain"
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? COLORS.primary : COLORS.black
                            }}
                        />
                    ),
                    tabBarButton:(props)=><CustomTabBtn {...props} containerStyle={{borderTopRightRadius:SIZES.radius * 5,paddingRight:SIZES.radius}} />
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;
const styles = StyleSheet.create({
    imgContainer:{
        width:40,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    }
})