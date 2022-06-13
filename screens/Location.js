import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    FlatList,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, ThemeContext } from '../App';
import { CustomButton, TabButton } from '../components';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';

const Location = ({ navigation , route}) => {
    const {Theme} = useContext(ThemeContext)
    const [selectedTab, setSelectedTab] = useState(0)
    return (
        <SafeAreaView style={styles.container}>
           <StatusBar backgroundColor={COLORS.primary}  />
           <Header navigation={navigation}  route={route} />
           <FlatList data={dummyData.locations} style={{flex:1,marginTop:-25,borderTopRightRadius:SIZES.radius * 2,borderTopLeftRadius:SIZES.radius * 2,backgroundColor:Theme.backgroundColor}} 
                contentContainerStyle={{paddingHorizontal:SIZES.padding,paddingBottom:SIZES.padding}}
                showsVerticalScrollIndicator={false}
                keyExtractor={item=>item.id}
                renderItem={({item,index})=>(
                    <View style={{borderRadius:20,backgroundColor:Theme.cardBackgroundColor,marginTop:SIZES.radius,paddingVertical:SIZES.radius,paddingHorizontal:SIZES.padding}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{...FONTS.h2,color:Theme.textColor,fontWeight:'700'}}>{item.title}</Text>
                            <Image source={item.bookmarked ? icons.bookmarkFilled : icons.bookmark} style={{width:25,height:25,tintColor:item.bookmarked ? COLORS.red2 : COLORS.white}} />
                        </View>
                        <Text style={{...FONTS.body3,fontSize:20,color:Theme.textColor,marginVertical:SIZES.base,width:'80%'}}>{item.address}</Text>
                        <Text style={{...FONTS.body3,color:Theme.textColor}}>{item.operation_hours}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:SIZES.radius}}>
                            <CustomButton secondary={true} label='Pick-Up' onPress={()=>navigation.navigate("Order",{selectedLocation:item})} labelStyle={{color:Theme.textColor}} containerStyle={{borderColor:Theme.textColor,marginRight:SIZES.base}}  />
                            <CustomButton secondary={true} label='Delivery' labelStyle={{color:Theme.textColor}} containerStyle={{borderColor:Theme.textColor}}   />
                        </View>
                    </View>
                )}
                ListHeaderComponent={()=><View style={{backgroundColor:Theme.backgroundColor,paddingTop:SIZES.padding,paddingBottom:SIZES.radius}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        {
                            ["Nearby","Previous","Favorite"].map((label,i)=>(
                                <TabButton selected={i === selectedTab} onPress={()=>setSelectedTab(i)} label={label} key={i}  />
                            ))
                        }           
                    </View>
                    <View style={{marginTop:SIZES.radius,borderRadius:30,flexDirection:'row',alignItems:'center',paddingHorizontal:SIZES.padding,backgroundColor:COLORS.lightGreen,paddingVertical:5}}>
                        <TextInput placeholder='enter your city,state or zip code' style={{flex:1,...FONTS.body3,fontSize:18,color:COLORS.gray1,marginRight:SIZES.radius}}  />
                        <Image source={icons.search} style={{width:36,height:36,tintColor:COLORS.gray1}} resizeMode='contain'  />
                    </View>
                </View>}
                stickyHeaderIndices={[0]}
           />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Location;