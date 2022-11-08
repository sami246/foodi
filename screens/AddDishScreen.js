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

const AddDishScreen = ({ navigation, route }) => {
    const dish = route.params.dish;
    console.log("IN ADD DISH", dish)
    const [user, setUser] = useState(auth.currentUser)

    const [image, setImage] = useState(null);
    const [dishName, setDishName] = useState('');
    const [restaurant, setRestaurant] = useState('');
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [WHA, setWHA] = useState(false);

    // For Date
    // ---------------
    const [date, setDate] = useState(new Date());
    const [dateText, setDateText] = useState('');
    
    const [mode, setMode] = useState('');
    const [show, setShow] = useState('');
    const [selected, setSelected] = useState("");
    // ---------------

    const [modalVisible, setModalVisible] = useState(false);
    

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

    const handleDropDown = (selected) => {
        console.log(selected)
    }

    const cuisine = [
        { label: 'Burger', value: '1', icon: <AntDesign color="black" name="delete" size={17} /> },
        { label: 'Apple', value: '2', icon: <MaterialCommunityIcons color="black" name="food-apple" size={17} /> },
        { label: 'Item 3', value: '3', icon: <AntDesign color="black" name="delete" size={17} /> },
        { label: 'Item 4', value: '4', icon: <AntDesign color="black" name="delete" size={17} /> },
        { label: 'Item 5', value: '5', icon: <AntDesign color="black" name="delete" size={17} /> },
        { label: 'Item 6', value: '6', icon: <AntDesign color="black" name="delete" size={17} /> },
        { label: 'Item 7', value: '7', icon: <AntDesign color="black" name="delete" size={17} /> },
        { label: 'Item 8', value: '8', icon: <AntDesign color="black" name="delete" size={17} /> },
      ];

    const handleSubmit = async () => {
        try {
            setUploading(true)
            var uploadUrl = null
            if(image != null){
                console.log("uploading Image")
                uploadUrl = await uploadImageAsync(image);
            }
            const docRef = await addDoc(collection(firestoreDB, 'dishs'), {
                userId: user.uid,
                dishName: dishName,
                comment: comment,
                rating: rating,
                image: uploadUrl,
                updatedTime: new Date(),
                date: date,
                categories: [],
                wouldHaveAgain: WHA
            })
            console.log("Dish Added")
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setUploading(false)
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
                    <ImageUpload image={image} setImage={setImage} uploading={uploading} setUploading={setUploading}/>
                    <TextInput 
                        placeholder='Restaurant'
                        value={{}}
                        style={styles.input} 
                        maxLength = {25}
                        onChangeText = { text => setRestaurant(text)}
                    />
                    <TextInput 
                        placeholder='Dish Name'
                        value={{}}
                        style={styles.input} 
                        maxLength = {25}
                        onChangeText = { text => setDishName(text)}
                    />
                    <Image source={image} />
                    <TextInput 
                        placeholder='Rating'
                        value={{}}
                        style={styles.input} 
                        onChangeText = { text => setRating(text)}
                    />
                    <TextInput 
                        placeholder='Comments'
                        value={{}}
                        style={styles.input} 
                        onChangeText = { text => setComment(text)}
                    />
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <AppButton title='Add Date You Had Dish' height={spacing.xl} width={spacing.m} onPress={() => showMode('date')} fontSize={13} backgroundColor={colors.orange} color={colors.white}/>
                        {show && (
                            <DateTimePicker 
                            testID='DatePicker'
                            value={date}
                            mode={mode}
                            display='default'
                            onChange={onChangeDate}
                            />
                        )}
                        <Text 
                            placeholder="Add Date"
                            value={dateText}
                            style={styles.date} 
                            onPress={() => showMode('date')}
                        >{dateText ? dateText : "DD/MM/YYYY"}</Text>
                    </View>
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
                                            <AppButton
                                            fontSize={15}
                                            height={spacing.xl}
                                            width= {'100%'}
                                            onPress={() => alert("Add Cusine")}
                                            title= "Add New Cuisine"
                                            backgroundColor={colors.brown}
                                            color={colors.white}
                                            />
                                            <MultiSelectComponent data={cuisine}/>

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
                                                onPress={() => setModalVisible(!modalVisible)}
                                                title= "Cancel"
                                                backgroundColor={colors.white}
                                                color={colors.blue}
                                                buttonStyle={{borderColor: colors.blue, borderWidth: 2}}
                                            />
                                        </View>
                                    </View>
                                </Modal>
                                <View style={styles.cusineContainer}>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: sizes.width - 50 , alignItems: 'center', justifyContent: 'center'}}>
                                        <View style={styles.selectedStyle}>
                                            <Text numberOfLines={1}  style={styles.textSelectedStyle}>Pizza</Text>
                                            <AntDesign color="black" name="delete" size={17} />
                                        </View>
                                        <View style={styles.selectedStyle}>
                                            <Text style={styles.textSelectedStyle}>Burger</Text>
                                            <AntDesign color="black" name="delete" size={17} />
                                        </View>
                                        <View style={styles.selectedStyle}>
                                            <Text style={styles.textSelectedStyle}>American</Text>
                                            <AntDesign color="black" name="delete" size={17} />
                                        </View>
                                    </View>
                                    <View style={{margin: 5, alignItems: 'center', justifyContent: 'center', height: 50}}>
                                        <AppButton
                                            fontSize={14}
                                            height={50}
                                            width= {'40%'}
                                            onPress={() => setModalVisible(true)}
                                            title= "Add Cusines"
                                            backgroundColor={colors.darkGray}
                                            color={colors.white}
                                        />
                                    </View>
                                </View>
                    </View>

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
                        onPress={() => {
                            setImage(null)
                            setDate(null)
                            setDateText("")
                            navigation.navigate('Posts')}}
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
        width: '80%',
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
    date: {
        backgroundColor: 'white',
        color: colors.gray,
        borderRadius: 10,
        width: '40%',
        height: spacing.xl,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    switchText: {
        fontSize: sizes.body,
        fontWeight: '500'
    },

    //Modal
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        justifyContent: 'space-around',
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
        width: sizes.width - 50,
        overflow: 'hidden',
        padding: spacing.s,
        borderColor: colors.darkGray,
        backgroundColor: colors.lightOrange,
        marginTop: 10,
        borderRadius: 20,
        shadowOffset: {
        width: 1,
        height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 1.41,
        elevation: 5,
      }
})