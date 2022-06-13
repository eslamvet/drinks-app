import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { Header, ThemeContext } from '../App';
import { CustomButton, TabButton } from '../components';
import { COLORS, dummyData, FONTS, SIZES ,icons} from '../constants';

const Order = ({ navigation , route}) => {
    const {selectedLocation} = route.params
    const {Theme} = useContext(ThemeContext)
    const [selectedTab, setSelectedTab] = useState(0)
    const [selectedCat, setSelectedCat] = useState("Milk Tea")
    const [menuList, setMenuList] = useState([])
    useEffect(() => {   
        setMenuList(dummyData.menuList.filter(l=>l.category === selectedCat))     
    }, [selectedCat])
    
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} route={route} containerStyle={{height:140}}>
                <View style={{padding:SIZES.base,borderRadius:25,backgroundColor:COLORS.lightGreen2,marginTop:SIZES.radius}}>
                    <Text style={{...FONTS.body3}}>{selectedLocation.title}</Text>
                </View>
            </Header>
            <View style={{flex:1,backgroundColor:Theme.backgroundColor,marginTop:-15,borderTopRightRadius:SIZES.radius * 2,borderTopLeftRadius:SIZES.radius * 2,backgroundColor:Theme.backgroundColor}}>
                <FlatList data={menuList}
                contentContainerStyle={{paddingHorizontal:SIZES.padding,paddingBottom:SIZES.padding}}
                showsVerticalScrollIndicator={false}
                keyExtractor={item=>item.id}
                renderItem={({item,index})=>(
                    <View style={{alignItems:'flex-end',marginTop:SIZES.padding}}>
                        <TouchableOpacity onPress={()=>navigation.navigate("OrderDetail",{selectedDrink:item})} style={{width:'80%',flexDirection:'row',height:120}}>
                            <View style={{flex:2,height:'100%',borderRadius:SIZES.radius,backgroundColor:Theme.cardBackgroundColor,justifyContent:'center',alignItems:'center',marginTop:-SIZES.radius,zIndex:1}}>
                                <Image source={item.thumbnail} resizeMode='contain' style={{width:80,height:80}} />
                            </View>
                            <View style={{borderRadius:SIZES.radius,backgroundColor:COLORS.primary,flex:3,marginLeft:-30,height:'90%',marginTop:SIZES.radius,paddingLeft:40,paddingRight:SIZES.radius,paddingVertical:SIZES.radius,justifyContent:'space-between'}}>
                                <Text style={{...FONTS.h2,fontSize:20,fontWeight:'700',color:COLORS.white}}>{item.name}</Text>
                                <Text style={{...FONTS.h3,fontWeight:'700',color:COLORS.yellow}}>{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                ListHeaderComponent={()=><View style={{backgroundColor:Theme.backgroundColor,paddingTop:SIZES.padding,paddingBottom:SIZES.radius}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {
                            ["Menu","Previous","Favorite"].map((label,i)=>(
                                <TabButton selected={i === selectedTab} onPress={()=>setSelectedTab(i)} label={label} key={i}  />
                            ))
                        }           
                    </View>
                </View>}
                stickyHeaderIndices={[0]}  
                />
                <View style={{position:'absolute',left:0,top:100,bottom:50}}>
                    <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={65}
                    height={65}
                    viewBox="0 0 65 65"
                    >
                    <Circle cx={0} cy={65} r={65} fill={COLORS.primary} />
                    </Svg>
                    <View style={{width:65,flex:1,backgroundColor:COLORS.primary,justifyContent:'flex-end',zIndex:1}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',transform:[{rotate:'-90deg'}]}}>
                            {
                                ["Coffee","Snack","Milk Tea","Smoothie","Specialtea"].map((item,i)=><TabButton selected={selectedCat === item} onPress={()=>setSelectedCat(item)} containerStyle={{borderBottomWidth:0,paddingVertical:0,paddingRight:0,paddingLeft:0,width:110}} labelStyle={{color:selectedCat === item ? COLORS.white : COLORS.gray}}  label={item} key={i} />)
                            }
                        </View>
                    </View>
                    <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={65} 
                    height={65}
                    viewBox="0 0 65 65"
                    >
                    <Circle cx={0} cy={0} r={65} fill={COLORS.primary} />
                    </Svg>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Order;