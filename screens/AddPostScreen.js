import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, Button, Keyboard, TouchableOpacity  } from 'react-native'
import React from 'react'
import { useState, useEffect} from 'react';
import DatePicker from '@react-native-community/datetimepicker'
import SelectList from 'react-native-dropdown-select-list'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const AddPostScreen = ({ navigation }) => {
    const [WHA, setWHA] = useState('');
    const [password, setPassword] = useState('');
    const [date, setDate] = useState(new Date());
    const [selected, setSelected] = useState("");

    const testDataCusine = [
        {key:'1',value:'Burger'},
        {key:'2',value:'Indian'},
        {key:'3',value:'British'},
        {key:'4',value:'Dessert'},
      ];

  
  return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
            <View style = {styles.inputContainer}>
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

  )
}

export default AddPostScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        top: 80,
        bottom: 20,
    },
    inputContainer: {
        flex: 7,
        width: '80%',
        justifyContent: "space-around"
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
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