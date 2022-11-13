import { View, TextInput, StyleSheet, Text, Platform, TouchableOpacity, Modal, Image, Switch, Pressable  } from 'react-native'
import React, { useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import { db, auth, firestoreDB } from '../firebase';
import ImageUpload from '../components/ImageUpload';
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import uuid from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import AppButton from '../components/AppButton';
import { addDoc, collection } from 'firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MultiSelectComponent from '../components/MultiSelect';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TagsData } from '../data';

const AddDishScreen = ({ navigation, route }) => {
    // if (route){
    //     const dish = route.params.dish;
    //     console.log("IN ADD DISH", dish)
    // }
    
    // States
    const [user, setUser] = useState(auth.currentUser)
    const [image, setImage] = useState(null);
    const [dishName, setDishName] = useState(null);
    const [price, setPrice] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);
    const [tags, setTags] = useState([]);
    const [WHA, setWHA] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    
    // For Date
    // ---------------
    const [date, setDate] = useState(new Date());
    const [dateText, setDateText] = useState('');
    
    const [mode, setMode] = useState('');
    const [show, setShow] = useState('');
    const [selected, setSelected] = useState('');
    // --------------- 
        
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
        var dateT = currentDate.getDate() + "/" + currentDate.getMonth() + "/" + currentDate.getFullYear()
        console.log("T", dateT)
        setDateText(dateT)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const toggleSwitch = () => {
        setWHA(previousState => !previousState)
    }

    const handleCancel = () => {
        setImage(null)
        setDishName(null)
        setPrice(null)
        setRestaurant(null)
        setRating(null)
        setComment(null)
        setWHA(false)
        setDate(new Date())
        setDateText('')
        setTags([])
        navigation.goBack()
    }


    const handleSubmit = async () => {
        try {
            setUploading(true)
            var uploadUrl = null
            if(image != null){
                console.log("uploading Image")
                uploadUrl = await uploadImageAsync(image);
            }
            console.log("Adding Doc")
            const docRef = await addDoc(collection(firestoreDB, 'dishs'), {
                userId: user.uid,
                restaurant: restaurant,
                dishName: dishName,
                comment: comment,
                rating: rating,
                image: uploadUrl,
                updatedTime: new Date(),
                date: date,
                dateText: dateText,
                price: price,
                categories: tags,
                wouldHaveAgain: WHA
            })
            console.log("Dish Added")
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setUploading(false)
            handleCancel()
        }

    }

    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });

        const fileRef = ref(db, "dish_pictures/" + uuid.v4());
        const result = await uploadBytes(fileRef, blob);
        // We're done with the blob, close and release it
        blob.close();
      
        return await getDownloadURL(fileRef);
      }


  
  return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            >
                <View style = {styles.inputContainer}>
                    {/* Image */}
                    <ImageUpload image={image} setImage={setImage} uploading={uploading} setUploading={setUploading}/>
                    {/* Restaurant */}
                    <TextInput 
                        placeholder='Restaurant'
                        value={restaurant}
                        style={[styles.input, styles.inputShadow]} 
                        onChangeText = { text => setRestaurant(text)}
                    />
                    {/* Dish Name */}
                    <TextInput 
                        placeholder='Dish Name'
                        value={dishName}
                        style={[styles.input, styles.inputShadow]} 
                        onChangeText = { text => setDishName(text)}
                    />
                    {/* Rating */}
                    <View style={[{  
                            justifyContent: 'center',      
                            backgroundColor: 'white',
                            paddingHorizontal: 5,
                            paddingVertical: 5,
                            borderRadius: 10,
                            margin: 5,
                            width: '100%',
                        }, styles.inputShadow]}>
                            <AirbnbRating
                                selectedColor = {colors.orange}
                                reviewColor = {colors.lightOrange}
                                count={10}
                                reviews={["   1/10\nTerrible", "2/10\n Bad", "3/10\nMeh", "4/10\n  OK", " 5/10\nGood", "     6/10\nVery Good", " 7/10\nGreat", "   8/10\nAmazing", "       9/10\nUnbelievable", "     10/10\nMasterpiece"]}
                                defaultRating={0}
                                size={20}
                                starContainerStyle ={{paddingBottom: 10}}
                                onFinishRating={setRating}
                            />
                    </View>
                    {/* Comments */}
                    <TextInput 
                        placeholder='Comments'
                        value={comment}
                        style={[styles.input, styles.inputShadow, {textAlignVertical: 'top', height: spacing.xl*3}]} 
                        onChangeText = { text => setComment(text)}
                        multiline={true}
                        underlineColorAndroid='transparent'
                    />
                    {/* Price and Date */}
                    <View style={{flexDirection: 'row', width: '100%', margin: 5, justifyContent: 'space-between'}}>
                    <Text 
                            placeholder="Add Date"
                            value={dateText}
                            style={[styles.smallInput, styles.inputShadow]} 
                            onPress={() => showMode('date')}
                        >{dateText ? dateText : "DD/MM/YYYY"}</Text>
                        {show && (
                            <DateTimePicker 
                            testID='DatePicker'
                            value={date}
                            mode={mode}
                            display='default'
                            onChange={onChangeDate}
                            />
                        )}
                                            
                    <TextInput 
                        placeholder='Price £'
                        value={price}
                        style={[styles.smallInput, styles.inputShadow]} 
                        onChangeText = { text => setPrice(text)}
                    />
                    </View>
                    {/* Tags */}
                    <View style={styles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                    setModalVisible(!modalVisible);

                                    }}
                                >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            {/* <AppButton
                                            fontSize={15}
                                            height={spacing.xl}
                                            width= {'100%'}
                                            onPress={() => alert("Add tags")}
                                            title= "Add New Tags"
                                            backgroundColor={colors.brown}
                                            color={colors.white}
                                            /> */}
                                            <View style={{flex: 4, marginTop: spacing.l}}>
                                                <MultiSelectComponent data={TagsData} selected={tags} setSelected={setTags}/>
                                            </View>
                                            
                                            <View style={{flex: 1}}>
                                                <AppButton
                                                    fontSize={15}
                                                    height={spacing.xl}
                                                    width= {'100%'}
                                                    onPress={() => setModalVisible(!modalVisible)}
                                                    title= "Save"
                                                    backgroundColor={colors.blue}
                                                    color={colors.white}
                                                />
                                                <AppButton
                                                    fontSize={15}
                                                    height={spacing.xl}
                                                    width= {'100%'}
                                                    onPress={() => {
                                                        setTags([])
                                                        setModalVisible(!modalVisible)}}
                                                    title= "Cancel"
                                                    backgroundColor={colors.white}
                                                    color={colors.blue}
                                                    buttonStyle={{borderColor: colors.blue, borderWidth: 2}}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                                <View style={[styles.cusineContainer, styles.inputShadow]}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: sizes.width - 50 , alignItems: 'center', justifyContent: 'center'}}>
                                        {tags != [] 
                                        ? tags.map((tag, index) => 
                                        <View key={index} style={styles.selectedStyle}>
                                            <Text numberOfLines={1}  style={styles.textSelectedStyle}>{tag}</Text>
                                            {/* <AntDesign color={colors.darkGray} name="star" size={15} /> */}
                                        </View>
                                        ) 
                                        : 
                                        <Text> Add Tags</Text>}
                                    </View>
                                    <View style={{margin: 5, alignItems: 'center', justifyContent: 'center', height: 50}}>
                                        <AppButton
                                            fontSize={14}
                                            height={50}
                                            width= {'50%'}
                                            onPress={() => setModalVisible(true)}
                                            title= "Add/Remove Tags"
                                            backgroundColor={colors.darkGray}
                                            color={colors.white}
                                        />
                                    </View>
                                </View>
                    </View>
                    {/* Would Have Again Switch */}
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchText}>Would have again?</Text>
                        <Switch 
                        trackColor={{false: colors.lightGray, true: colors.gold}}
                        thumbColor={WHA ? colors.orange : colors.gray}
                        ios_backgroundColor='gray'
                        onValueChange={toggleSwitch}
                        value={WHA}
                        />
                    </View>
                </View>
                {/* Buttons */}
                <View style={{width: '75%'}}>
                    <AppButton
                        fontSize={18}
                        height={45}
                        width= {'100%'}
                        onPress={handleSubmit}
                        title= "Add Dish"
                        backgroundColor={colors.orange}
                        color={colors.white}
                    />
                    <AppButton
                        fontSize={18}
                        height={45}
                        width= {'100%'}
                        onPress={handleCancel}
                        title= "Cancel"
                        backgroundColor={colors.white}
                        color={colors.lightOrange}
                        buttonStyle={{borderColor: colors.orange, borderWidth: 2}}
                    />
                </View>
            </View>
        </ScrollView>
  )
}

export default AddDishScreen

const styles = StyleSheet.create({
    // Containers
    container: {
        minHeight: sizes.height,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: STATUS_BAR_HEIGHT,
        marginBottom: STATUS_BAR_HEIGHT + 10,
    },
    inputContainer: {
        width: '85%',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    buttonContainer: {
        alignSelf: 'auto',
        width: '60%',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10,
        marginBottom: 50
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },

    //Inputs
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        margin: 5,
        width: '100%',
        height: spacing.xl,
        color: colors.gray,
    },
    smallInput: {
        backgroundColor: 'white',
        color: colors.gray,
        borderRadius: 10,
        width: '48%',
        height: spacing.xl,
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlignVertical: 'center'
    },
    switchText: {
        fontSize: sizes.body,
        fontWeight: '500'
    },
    inputShadow: {
        shadowOffset: {
            width: 1,
            height: 2,
            },
            shadowOpacity: 0.6,
            shadowRadius: 1.41,
            elevation: 2,
    },

    //Modal
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        height: sizes.height,
        width: sizes.width,
        margin: 20,
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginHorizontal: spacing.xs,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      },
      textSelectedStyle: {
        marginRight: 5,
        fontSize: sizes.body,
      },
      cusineContainer: {
        alignItems: 'center',
        borderWidth: 2,
        width: sizes.width - 55,
        overflow: 'hidden',
        padding: spacing.s,
        borderColor: colors.darkGray,
        backgroundColor: colors.lightOrange,
        marginTop: 10,
        borderRadius: 20,
      }
})