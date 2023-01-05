import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { colors, sizes, spacing } from '../../constants/theme';
import AppButton from '../SmallComponents/AppButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SortModal = ({modalVisible, setModalVisible, sortFilter, setSortFilter}) => {
    const handleClick = (name, direction) => {
        if(name){
            setSortFilter({
                name: name,
                direction: direction
            })
        }
        else{
            setSortFilter(null)
        }
        setModalVisible(!modalVisible);
    }

  return (
    <View>
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
        setModalVisible(!modalVisible);
    }}
    style={{justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}
    >
        <View style={styles.centeredView}>
        
        <Pressable style={{position: 'absolute', zIndex: 1, top: 0, right: 0, padding: 15}} onPress={() => {setModalVisible(!modalVisible);}}>
             <Ionicons name='close' size={35} color={colors.white} />
        </Pressable>
        <Text style={styles.title}>Sort By:</Text>
        <View style={{alignItems: 'center', flexDirection: 'row', margin: 15, flexWrap: 'wrap', justifyContent: 'space-evenly'}}>

            <Pressable style={[styles.filterButton, 
                {backgroundColor: sortFilter?.name == 'rating' && sortFilter?.direction == 'asc' ? colors.blue : colors.white,
                borderColor: sortFilter?.name == 'rating' && sortFilter?.direction == 'asc' ? colors.white : null,
                borderWidth: sortFilter?.name == 'rating' && sortFilter?.direction == 'asc' ? 3 : 0,
                elevation: sortFilter?.name == 'rating' && sortFilter?.direction == 'asc' ? 2 : 0
            }]}
            onPress={() => {handleClick('rating', 'asc')}}
            >
                <FontAwesome5 name='sort-amount-up' size={26} color={sortFilter?.name == 'rating' && sortFilter?.direction == 'asc' ? colors.white : colors.primary} style={{padding: 5}}/>
                <Text style={[styles.filterText, {
                    color: sortFilter?.name == 'rating' && sortFilter?.direction == 'asc' ? colors.white : colors.primary,
                    fontWeight: sortFilter?.name == 'rating' && sortFilter?.direction == 'asc' ? '600' : 'normal',
                    }]}> Rating Asc</Text>
            </Pressable>


            <Pressable style={[styles.filterButton, 
                {backgroundColor: sortFilter?.name == 'rating' && sortFilter?.direction == 'desc' ? colors.blue : colors.white,
                borderColor: sortFilter?.name == 'rating' && sortFilter?.direction == 'desc' ? colors.white : null,
                borderWidth: sortFilter?.name == 'rating' && sortFilter?.direction == 'desc' ? 3 : 0,
                elevation: sortFilter?.name == 'rating' && sortFilter?.direction == 'desc' ? 2 : 0
            }]}
                onPress={() => {handleClick('rating', 'desc')}}
                >
                    <FontAwesome5 name='sort-amount-down' size={26} color={sortFilter?.name == 'rating' && sortFilter?.direction == 'desc' ? colors.white : colors.primary} style={{padding: 5}}/>
                    <Text style={[styles.filterText, {
                    color: sortFilter?.name == 'rating' && sortFilter?.direction == 'desc' ? colors.white : colors.primary,
                    fontWeight: sortFilter?.name == 'rating' && sortFilter?.direction == 'desc' ? '600' : 'normal',
                    }]}> Rating Desc</Text>
            </Pressable>


            <Pressable style={[styles.filterButton, 
                {backgroundColor: sortFilter?.name == 'date' && sortFilter?.direction == 'asc' ? colors.blue : colors.white,
                borderColor: sortFilter?.name == 'date' && sortFilter?.direction == 'asc' ? colors.white : null,
                borderWidth: sortFilter?.name == 'date' && sortFilter?.direction == 'asc' ? 3 : 0,
                elevation: sortFilter?.name == 'date' && sortFilter?.direction == 'asc' ? 2 : 0
            }]}
                onPress={() => {handleClick('date', 'asc')}}
                >
                    <FontAwesome5 name='sort-amount-up' size={26} color={sortFilter?.name == 'date' && sortFilter?.direction == 'asc' ? colors.white : colors.primary} style={{padding: 5}}/>
                    <Text style={[styles.filterText, {
                    color: sortFilter?.name == 'date' && sortFilter?.direction == 'asc' ? colors.white : colors.primary,
                    fontWeight: sortFilter?.name == 'date' && sortFilter?.direction == 'asc' ? '600' : 'normal',
                    }]}> Date Asc</Text>
            </Pressable>


            <Pressable style={[styles.filterButton, 
                {backgroundColor: sortFilter?.name == 'date' && sortFilter?.direction == 'desc' ? colors.blue : colors.white,
                borderColor: sortFilter?.name == 'date' && sortFilter?.direction == 'desc' ? colors.white : null,
                borderWidth: sortFilter?.name == 'date' && sortFilter?.direction == 'desc' ? 3 : 0,
                elevation: sortFilter?.name == 'date' && sortFilter?.direction == 'desc' ? 2 : 0
            }]}
                onPress={() => {handleClick('date', 'desc')}}
                >
                    <FontAwesome5 name='sort-amount-down' size={26} color={sortFilter?.name == 'date' && sortFilter?.direction == 'desc' ? colors.white : colors.primary} style={{padding: 5}}/>
                    <Text style={[styles.filterText, {
                    color: sortFilter?.name == 'date' && sortFilter?.direction == 'desc' ? colors.white : colors.primary,
                    fontWeight: sortFilter?.name == 'date' && sortFilter?.direction == 'desc' ? '600' : 'normal',
                    }]}> Date Desc</Text>
            </Pressable>

            {/* TODO Add Sort Price */}
        
        </View>
        <View style= {{height: 55, width: 150, alignSelf: 'center', marginBottom: spacing.xs}}>
                    
                    <AppButton
                        fontSize={15}
                        height={spacing.xl}
                        width={"100%"}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        title="Save"
                        backgroundColor={colors.darkBlue}
                        color={colors.white}
                        buttonStyle={{
                            borderColor: colors.white,
                            borderWidth: 2,
                        }}
                        />
        </View>
        <View style= {{height: 55, width: 150, alignSelf: 'center', marginBottom: spacing.m}}>
                    
                    <AppButton
                        fontSize={15}
                        height={spacing.xl}
                        width={"100%"}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setSortFilter(null)
                        }}
                        title="No Filters"
                        backgroundColor={colors.darkBlue}
                        color={colors.white}
                        buttonStyle={{
                            borderColor: colors.white,
                            borderWidth: 2,
                        }}
                        />
        </View>
        </View>
    </Modal>
    </View>

  )
}

export default SortModal

const styles = StyleSheet.create({
    //Modal
    centeredView: {
    justifyContent: 'center',
    top: 45,
    margin: 10,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
    width: sizes.width - spacing.xl,
    backgroundColor: colors.blue,
    borderWidth: 3,
    borderColor: colors.white
    },
    title: {
        fontSize: 27,
        fontWeight: '500',
        marginLeft: spacing.l,
        color: colors.white,
        marginTop: spacing.m,
    },
    filterText: {
        fontSize: 17,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    filterButton: {
        flexDirection: 'row',
        width: '46%',
        backgroundColor: colors.white,
        paddingHorizontal: 3,
        paddingVertical: 4,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: colors.gray,
        margin: 5 }
})