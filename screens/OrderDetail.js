import React,{useContext,useState,useRef} from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ThemeContext } from '../App';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../constants';

let index = 0
const OrderDetail = ({navigation,route}) => {
    const {Theme} = useContext(ThemeContext)
    const {selectedDrink} = route.params
    const [selectedSize, setSelectedSize] = useState(0)
    const listRef = useRef()

    function nextScrollHandler() {
        if(index < dummyData.milkList.length - 1){
            index+=1
            listRef.current.scrollToOffset({offset:index * 150,animated:true})
        }else{
            index=0
            listRef.current.scrollToOffset({offset:index * 150,animated:true})        
        }
    }
    function prevScrollHandler() {
        if(index > 0){
            index-=1
            listRef.current.scrollToOffset({offset:index * 150,animated:true})
        }else{
            index=dummyData.milkList.length - 1
            listRef.current.scrollToOffset({offset:index * 150,animated:true})        
        }
    }
    return (
        <View style={[styles.container,{backgroundColor:Theme.backgroundColor}]}>
            <StatusBar backgroundColor={null}  />
            <View style={{height:"45%",flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()} style={{width:45,height:45,borderRadius:SIZES.radius,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.black,position:'absolute',top:SIZES.padding,left:18,zIndex:1}}>
                    <Image source={icons.leftArrow} resizeMode='contain' style={{width:25,height:25,tintColor:COLORS.white}} />
                </TouchableOpacity>
                <View style={{backgroundColor:COLORS.primary,flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:120,marginLeft:SIZES.padding * 1.5}}>       
                    <Image source={selectedDrink.thumbnail} resizeMode='contain' style={{width:'70%',height:'70%'}}  />    
                </View>              
            </View>
            <View style={{flex:1,marginTop:SIZES.padding,paddingHorizontal:SIZES.padding}}>
                <Text style={{...FONTS.h1,fontWeight:'700',color:Theme.headerColor}}>{selectedDrink.name}</Text>
                <Text style={{...FONTS.body3,color:Theme.textColor,marginTop:5}}>{selectedDrink.description}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:SIZES.radius}}>
                    <Text style={{...FONTS.h2,fontWeight:'700',color:Theme.headerColor}}>Pick A Size</Text>
                    <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>setSelectedSize(0)} style={{position:'relative',alignItems:'center'}}>
                            <Image source={icons.coffee_cup} resizeMode='contain' style={{width:90,height:90,tintColor:selectedSize === 0 ? COLORS.primary : COLORS.lightGray2}} />
                            <Text style={{...FONTS.body4,color:Theme.textColor,position:'absolute',top:'25%'}}>20oz</Text>
                            <Text style={{...FONTS.body3,color:Theme.textColor,marginTop:2}}>4.50$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setSelectedSize(1)} style={{position:'relative',alignItems:'center'}}>
                            <Image source={icons.coffee_cup} resizeMode='contain' style={{width:120,height:120,tintColor:selectedSize === 1 ? COLORS.primary : COLORS.lightGray2}} />
                            <Text style={{...FONTS.body4,color:Theme.textColor,position:'absolute',top:'30%'}}>32oz</Text>
                            <Text style={{...FONTS.body3,color:Theme.textColor,marginTop:2}}>6.00$</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:SIZES.padding}}>
                    <View style={{alignItems:'center'}}>
                        <Text  style={{...FONTS.h2,fontWeight:'700',color:Theme.headerColor}}>Milk</Text>
                        <FlatList data={dummyData.milkList}
                        style={{width:150,marginTop:SIZES.radius}}
                        ref={listRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        snapToAlignment='center'
                        decelerationRate='fast'
                        snapToInterval={150}
                        keyExtractor={item=>item.id}
                        renderItem={({item,index})=>(
                            <View style={{width:150,height:150,paddingHorizontal:10}}>
                                <View style={{backgroundColor:COLORS.primary,flex:1,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={item.image} style={{width:70,height:70,tintColor:COLORS.white}} resizeMode='contain' />
                                </View>
                                <Text style={{...FONTS.body3,color:Theme.textColor,marginTop:SIZES.base,textAlign:'center'}}>{item.name}</Text>
                            </View>
                        )}
                        />
                        <TouchableOpacity onPress={prevScrollHandler} style={{width:30,height:30,borderRadius:6,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.black,position:'absolute',top:92,left:-6}}>
                            <Image source={icons.leftArrow} style={{width:16,height:16,tintColor:COLORS.white}} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={nextScrollHandler} style={{width:30,height:30,borderRadius:6,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.black,position:'absolute',top:92,right:-6}}>
                            <Image source={icons.leftArrow} style={{width:16,height:16,tintColor:COLORS.white,transform:[{rotate:'180deg'}]}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text  style={{...FONTS.h2,fontWeight:'700',color:Theme.headerColor}}>Sweetness</Text>
                        <View style={{backgroundColor:COLORS.primary,paddingVertical:20,borderRadius:25,position:'relative',width:200,marginTop:SIZES.radius}}>
                            <Text style={{...FONTS.body3,color:COLORS.white,textAlign:'center'}}>100</Text>
                            <TouchableOpacity onPress={prevScrollHandler} style={{width:30,height:30,borderRadius:6,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.black,position:'absolute',top:17,left:-6}}>
                                <Image source={icons.leftArrow} style={{width:16,height:16,tintColor:COLORS.white}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={nextScrollHandler} style={{width:30,height:30,borderRadius:6,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.black,position:'absolute',top:17,right:-6}}>
                                <Image source={icons.leftArrow} style={{width:16,height:16,tintColor:COLORS.white,transform:[{rotate:'180deg'}]}} />
                            </TouchableOpacity>
                        </View>
                        <Text  style={{...FONTS.h2,fontWeight:'700',color:Theme.headerColor,marginTop:SIZES.base}}>Ice</Text>
                        <View style={{backgroundColor:COLORS.primary,paddingVertical:20,borderRadius:25,position:'relative',width:200,marginTop:SIZES.radius}}>
                            <Text style={{...FONTS.body3,color:COLORS.white,textAlign:'center'}}>100</Text>
                            <TouchableOpacity onPress={prevScrollHandler} style={{width:30,height:30,borderRadius:6,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.black,position:'absolute',top:17,left:-6}}>
                                <Image source={icons.leftArrow} style={{width:16,height:16,tintColor:COLORS.white}} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={nextScrollHandler} style={{width:30,height:30,borderRadius:6,alignItems:'center',justifyContent:'center',backgroundColor:COLORS.black,position:'absolute',top:17,right:-6}}>
                                <Image source={icons.leftArrow} style={{width:16,height:16,tintColor:COLORS.white,transform:[{rotate:'180deg'}]}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default OrderDetail;