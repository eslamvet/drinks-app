import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    ImageBackground
} from 'react-native';
import { ThemeContext } from '../App';
import { CustomButton } from '../components';
import { COLORS, dummyData, FONTS, icons, images, SIZES } from '../constants';

const Rewards = () => {
    const {Theme} = useContext(ThemeContext)
    return (
        <View style={[styles.container,{backgroundColor:Theme.backgroundColor}]}>
            <StatusBar backgroundColor={COLORS.purple}  />
            <FlatList data={dummyData.availableRewards} 
             showsVerticalScrollIndicator={false}
             keyExtractor={item=>item.id}
             style={{flex:1,marginBottom:100}}
             contentContainerStyle={{paddingHorizontal:SIZES.padding}}
             renderItem={({item,id})=>(
                 <View style={{paddingVertical:SIZES.base,backgroundColor:item.eligible ? COLORS.yellow : COLORS.lightGray2,paddingHorizontal:SIZES.radius,borderRadius:20,marginBottom:SIZES.base,alignItems:'center'}}>
                     <Text style={{...FONTS.body3,lineHeight:26,color:item.eligible ? COLORS.black : COLORS.transparentBlack}}>{item.title}</Text>
                 </View>
             )}
             ListHeaderComponent={<View style={{paddingTop:SIZES.padding,alignItems:'center'}}>
                <Text style={{...FONTS.h1,fontWeight:'700',color:COLORS.primary,textAlign:'center'}}>Rewards</Text>
                <Text style={{...FONTS.h3,color:Theme.textColor,lineHeight:18,marginTop:SIZES.base,width:'80%',textAlign:'center'}}>You are 60 points away from your next reward</Text>
                <ImageBackground source={icons.reward_cup} resizeMode='contain' style={{width:SIZES.width * .7,height:SIZES.width * .7,tintColor:Theme.textColor,marginVertical:SIZES.padding,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:60,height:60,borderRadius:30,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.white}}>
                        <Text style={{color:COLORS.black,...FONTS.h2,fontWeight:'700'}}>250</Text>
                    </View>
                </ImageBackground>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <CustomButton label="Scan in store" primary={true} containerStyle={{marginRight:SIZES.radius}}  />
                    <CustomButton label="Redeem" secondary={true} containerStyle={{paddingHorizontal:SIZES.padding}} />
                </View>
                <Text style={{...FONTS.h2,fontWeight:'700',alignSelf:'flex-start',color:Theme.textColor,marginTop:SIZES.padding,marginBottom:SIZES.radius}}>Available Rewards</Text>
             </View>}
            />
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

export default Rewards;