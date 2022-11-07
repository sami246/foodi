import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, Button, Keyboard, TouchableOpacity, TouchableHighlight, Image, Switch  } from 'react-native'
import React from 'react'
import { useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import SelectList from 'react-native-dropdown-select-list'
import { db, auth, firestoreDB } from '../firebase';
import ImageUpload from '../components/ImageUpload';
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import uuid from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import AppButton from '../components/AppButton';
import { addDoc, collection } from 'firebase/firestore';


const AddDishScreen = ({ navigation }) => {
    const [user, setUser] = useState(auth.currentUser)

    const [image, setImage] = useState(null);
    const [dishName, setDishName] = useState('');
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

    const testDataCusine = [
        {key:'1',value:'Burger'},
        {key:'2',value:'Indian'},
        {key:'3',value:'British'},
        {key:'4',value:'Dessert'},
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
                rating: 0,
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
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            >
                <View style = {styles.inputContainer}>
                    <ImageUpload image={image} setImage={setImage} uploading={uploading} setUploading={setUploading}/>
                    <TextInput 
                        placeholder='Dish Name'
                        value={{}}
                        style={styles.input} 
                        maxLength = {25}
                        onChangeText = { text => setEmail(text)}
                    />
                    <Image source={image} />
                    <TextInput 
                        placeholder='Rating'
                        value={{}}
                        style={styles.input} 
                        onChangeText = { text => setEmail(text)}
                    />
                    <TextInput 
                        placeholder='Comments'
                        value={{}}
                        style={styles.input} 
                        onChangeText = { text => setEmail(text)}
                    />
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <AppButton title='Add Date You Had Dish' onPress={() => showMode('date')}/>
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
                            value={dateText}
                            style={styles.date} 
                        >{dateText}</Text>
                    </View>
                    <SelectList 
                        onSelect={() => alert(selected)}
                        setSelected={setSelected} 
                        data={testDataCusine}  
                        searchPlaceholder = "Cuisine"
                        // arrowicon={<FontAwesomeIcon icon="fa-solid fa-chevron-down" size={12} color={'black'} />} 
                        // searchicon={<FontAwesomeIcon icon="search" size={12} color={'black'} />} 
                        search={true} 
                        boxStyles={{borderRadius:0}} //override default styles
                        />
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        style = {styles.button}>
                        <Text style = {styles.buttonText}>Add</Text>   
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => {
                            setImage(null)
                            navigation.navigate('Posts')}}
                        style = {[styles.button, styles.buttonOutline]}>
                        <Text style = {styles.buttonOutlineText}>Cancel</Text>   

                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </ScrollView>
  )
}

export default AddDishScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: STATUS_BAR_HEIGHT,
        bottom: 10,
    },
    inputContainer: {
        flex: 10,
        width: '80%',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        margin: 5,
        width: '100%',
    },
    date: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        margin: 5,
        alignSelf: 'center'
    },
    buttonContainer: {
        flex: 1,
        alignSelf: 'auto',
        width: '60%',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    switchText: {
        fontSize: sizes.h3,
        fontWeight: '600'
    },
    button: {
        backgroundColor: '#CC9767',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 7,
        borderColor: '#CC9767',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#CC9767',
        fontWeight: '700',
        fontSize: 16
    },
    outter : {
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selected:{
        width: 15,
        height: 15,
        backgroundColor: 'gray',
        borderRadius: 10
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    radioButton : {
        marginHorizontal: 15,
    },
    radioButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    
})