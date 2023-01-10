import { StyleSheet, View, Modal } from 'react-native'
import React from 'react'
import { colors, sizes, spacing } from '../../constants/theme';
import { TagsData } from "../../data/index";
import Tags from '../Tags';
import AppButton from '../SmallComponents/AppButton';
import MultiSelectComponent from "../MultiSelect";
import { ScrollView } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TagsModal = ({modalVisible, setModalVisible, tags, setTags, showButton, color}) => {
  return (
    <View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
            {/* <AppButton
                                    fontSize={15}
                                    height={spacing.xl}
                                    width= {'100%'}
                                    onPress={() => alert("Add tags")}
                                    title= "Add New Tags"
                                    backgroundColor={colors.brown}
                                    color={colors.white}
                                    /> */}
            <Pressable style={{position: 'absolute', zIndex: 1, top: 0, right: 0, paddingRight: 10, paddingTop: 5}} onPress={() => {setModalVisible(!modalVisible);}}>
                <Ionicons name='close' size={35} color={colors.white} />
            </Pressable>
            <ScrollView style={{marginTop: spacing.l, maxHeight: 500, marginBottom: spacing.s }} showsVerticalScrollIndicator={true}>
                <MultiSelectComponent
                data={TagsData}
                selected={!tags ? [] : tags}
                setSelected={setTags}
                />
            </ScrollView>

            <View style={{height: 60, width: 150, alignSelf: 'center'}}>
                <AppButton
                fontSize={18}
                height={60}
                width={"100%"}
                onPress={() => {
                  if(tags == []){
                    setTags(null)
                  }
                  setModalVisible(!modalVisible)}}
                title="Save"
                backgroundColor={colors.gold}
                color={colors.white}
                />
              </View>
              <View style={{height: 60, width: 150, alignSelf: 'center', marginBottom: 7}} >
                <AppButton
                fontSize={18}
                height={60}
                width={"100%"}
                onPress={() => {
                    setTags(null);
                    setModalVisible(!modalVisible);
                }}
                title="No Tags"
                backgroundColor={colors.white}
                color={colors.gold}
                buttonStyle={{
                    borderColor: colors.gold,
                    borderWidth: 2,
                }}
                />
              </View>
        </View>
      </Modal>


        {showButton &&
        <View style={[styles.cusineContainer, styles.inputShadow, {backgroundColor: color}]}>
        <Tags tags={tags} bColor={colors.white} fColor={colors.black} wrap={true}/>
        <View
            style={{
            margin: 5,
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            }}
        >
            <AppButton
            fontSize={14}
            height={50}
            width={"50%"}
            onPress={() => setModalVisible(true)}
            title="Add/Remove Tags"
            backgroundColor={colors.darkGray}
            color={colors.white}
            />
        </View>
        </View>
        }
    </View>
  )
}

export default TagsModal

const styles = StyleSheet.create({
      //Modal
  centeredView: {
        justifyContent: 'center',
        // height: sizes.height,
        top: 45,
        margin: 10,
        alignSelf: 'center',
        alignContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 20,
        width: sizes.width - spacing.l,
        height: sizes.height - 105,
        backgroundColor: colors.blue,
        borderWidth: 3,
        borderColor: colors.white
        },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  cusineContainer: {
    alignItems: "center",
    borderWidth: 2,
    width: sizes.width - 55,
    overflow: "hidden",
    padding: spacing.s,
    borderColor: colors.darkGray,
    backgroundColor: colors.lightOrange,
    marginTop: 5,
    borderRadius: 20,
  },
})