import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Animated,
    Image,
    ScrollView,
    StatusBar
} from 'react-native';
import { ThemeContext } from '../App';
import { CustomButton } from '../components';
import { COLORS, dummyData, FONTS, icons, SIZES,p, constants } from '../constants';


const Tabs = constants.promoTabs.map(promo=>({...promo,ref:React.createRef()}))
const inputRange = Tabs.map((_,i)=> i * SIZES.width)
function Indicator({scrollX,measurements}) {
    const width = scrollX.interpolate({
        inputRange,
        outputRange:measurements.map(measure=>measure.width)
    })
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange:measurements.map(measure=>measure.x)
    })
    return <Animated.View style={{position:'absolute',left:0,height:'100%',backgroundColor:COLORS.primary,width,transform:[{translateX}],borderRadius:SIZES.radius}} />
}
const Home = ({ navigation }) => {
    const {Theme} = useContext(ThemeContext)
    const [measurements,setMeasurements]=useState([])
    const scrollX = useRef(new Animated.Value(0)).current
    const containerRef = useRef()
    const position = Animated.divide(scrollX,SIZES.width)
    useEffect(()=>{
        let ml = []
        Tabs.forEach(tab=>{
            tab?.ref?.current?.measureLayout(containerRef.current,(x,y,width,height)=>{
                ml.push({x,y,width,height})
                if(ml.length === Tabs.length)setMeasurements(ml)
            })
        })
    },[])
    return (
        <View style={[styles.container,{backgroundColor:Theme.backgroundColor}]}>
            <StatusBar backgroundColor={COLORS.purple}  />
            <ScrollView style={{flex:1,marginBottom:100}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:0,paddingTop:SIZES.padding}}>
                <View style={{flexDirection:'row',height: SIZES.height > 800 ? 120 : 100,marginHorizontal:SIZES.padding}}>
                    <View style={{backgroundColor:COLORS.pink,justifyContent:'center',alignItems:'center',borderTopLeftRadius:SIZES.radius,borderBottomLeftRadius:SIZES.radius,paddingHorizontal:SIZES.radius}}>
                        <ImageBackground source={icons.reward_cup} style={{width:85,height:85,alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:30,height:30,borderRadius:15,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.transparentBlack}}>
                                <Text style={{color:COLORS.white,...FONTS.h4}}>250</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{flex:1,backgroundColor:COLORS.lightPink,borderRadius:SIZES.radius,marginLeft:-10,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{...FONTS.h2,fontWeight:'700',color:COLORS.primary}}>Available Rewards</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate("Rewards")} style={{backgroundColor:COLORS.primary,marginTop:SIZES.base,borderRadius:20,padding:SIZES.base}}>
                            <Text style={{...FONTS.body4,color:COLORS.white}}>150 points - $2.50 off</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View ref={containerRef} style={{flexDirection:'row',alignItems:'center',marginVertical:SIZES.height ? SIZES.padding : SIZES.radius,justifyContent:'space-between',borderRadius:SIZES.radius,backgroundColor:Theme.tabBackgroundColor,marginHorizontal:SIZES.padding}}>
                    {
                        Tabs.map((item,index)=>{
                            const color = position.interpolate({
                                inputRange:[index-1,index,index+1],
                                outputRange:[COLORS.lightGray2,COLORS.white,COLORS.lightGray2],
                                extrapolate:'clamp'
                            })                           
                            return (
                                <TouchableOpacity ref={item.ref} key={index} style={{padding:SIZES.height > 800 ? 15 : SIZES.radius,zIndex:1,paddingHorizontal:SIZES.height > 800 ? SIZES.padding : SIZES.radius}}>
                                    <Animated.Text style={{...FONTS.h3,color}}>{item.title}</Animated.Text>
                                </TouchableOpacity>
                            )
                        })

                    }                         
                    {measurements.length > 0 && <Indicator scrollX={scrollX} measurements={measurements} />}
                </View>
                <Animated.FlatList data={dummyData.promos} 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    style={{flex:1}}
                    snapToAlignment='center'
                    snapToInterval={SIZES.width}
                    decelerationRate='fast'
                    keyExtractor={item=>item.id}
                    onScroll={Animated.event([
                        {nativeEvent:{contentOffset:{x:scrollX}}}
                    ],{useNativeDriver:false})}
                    scrollEventThrottle={16}
                    renderItem={({item,index})=>(
                        <View style={{alignItems:'center',justifyContent:'center',flex:1,width:SIZES.width}}>
                            <Image source={item.image} style={{width:SIZES.width,height:SIZES.height >800 ? SIZES.width * .6 : SIZES.width * .33}} resizeMode='contain'   />
                            <Text style={{...FONTS.h1,fontWeight:'800',fontSize:SIZES.height >800 ? 30 : 25,color:COLORS.red}}>{item.name}</Text>
                            <Text style={{...FONTS.body3,color:Theme.textColor,marginVertical:5}}>{item.description}</Text>
                            <Text style={{...FONTS.body3,color:Theme.textColor}}>Calaries: {item.calories}</Text>
                            <CustomButton label='Order Now' primary={true} onPress={()=>navigation.navigate("Location")} containerStyle={{marginTop:SIZES.height > 800 ? SIZES.padding : SIZES.radius,...(SIZES.height > 800 && {paddingHorizontal:SIZES.padding,paddingVertical:SIZES.radius})}} />
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:-25,
        zIndex:1,
        borderTopLeftRadius:SIZES.radius * 2,
        borderTopRightRadius:SIZES.radius * 2
    }
})

export default Home;