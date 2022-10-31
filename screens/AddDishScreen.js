import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, Button, Keyboard, TouchableOpacity, TouchableHighlight  } from 'react-native'
import React from 'react'
import { useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import SelectList from 'react-native-dropdown-select-list'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytes } from 'firebase/storage'; //access the storage database
import { db } from '../firebase';
import ImageUpload from '../components/ImageUpload';
import { sizes, spacing, STATUS_BAR_HEIGHT } from '../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';



const AddDishScreen = ({ navigation }) => {

    const [WHA, setWHA] = useState('');

    // For Date
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);
    const [mode, setMode] = useState('');
    const [show, setShow] = useState('');
    const [selected, setSelected] = useState("");

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const testDataCusine = [
        {key:'1',value:'Burger'},
        {key:'2',value:'Indian'},
        {key:'3',value:'British'},
        {key:'4',value:'Dessert'},
      ];

    useEffect(() => {
    (async () => {
        if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        }
    })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.cancelled) {
            console.log({result})
          const ref = ref(db, string(result.uri)); //how the image will be addressed inside the storage
            
          //convert image to array of bytes
          const img = await fetch(result.uri);
          const bytes = await img.blob();
    
          await uploadBytes(ref, bytes); //upload images
          setImage(result.uri)
        }
      };

  
  return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
            <View style = {styles.inputContainer}>
                <ImageUpload />
                <TextInput 
                    placeholder='Dish Name'
                    value={{}}
                    style={styles.input} 
                    maxLength = {25}
                    onChangeText = { text => setEmail(text)}
                />
                <TextInput 
                    placeholder='Rating'
                    value={{}}
                    style={styles.input} 
                    onChangeText = { text => setEmail(text)}
                />
                <TextInput 
                    placeholder='Comment'
                    value={{}}
                    style={styles.input} 
                    onChangeText = { text => setEmail(text)}
                />
                <Button title='Add Date' onPress={() => showMode('date')}/>
                {show && (
                    <DateTimePicker 
                    testID='DatePicker'
                    value={date}
                    mode={mode}
                    display='default'
                    onChange={onChangeDate}
                    />
                )}
                {/* <DatePicker
                        value={date}
                        mode="date"
                        placeholder="Date"
                        format="DD-MM-YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onChange={(event, date) => {setDate(date)}}
                    /> */}
                <Text>Hmm {date.toString()}</Text>
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
                <View style={styles.radioButtonContainer}>
                    <Text>Would Have Again? </Text>
                    <View style={styles.wrapper}>
                        {['Yes', 'No'].map(option => (
                            <View key={option} style={styles.radioButton}>
                                <Text >{option}</Text>
                                <TouchableOpacity 
                                    style={styles.outter}
                                    onPress={() => setWHA(option)}
                                    >
                                    {WHA === option && <View style={styles.selected}/>}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={{}}
                    style = {styles.button}>
                    <Text style = {styles.buttonText}>Add</Text>   
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('Posts')}
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
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        top: STATUS_BAR_HEIGHT,
        bottom: 20,
    },
    inputContainer: {
        flex: 10,
        width: '80%',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        width: '100%'
    },
    buttonContainer: {
        flex: 1,
        alignSelf: 'auto',
        width: '60%',
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 80
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