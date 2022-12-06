import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { colors, sizes, spacing } from '../constants/theme';
import { TagsData } from "../data";
import Tags from './Tags';
import AppButton from './SmallComponents/AppButton';
import MultiSelectComponent from "../components/MultiSelect";

const TagsModal = ({modalVisible, setModalVisible, tags, setTags, showButton, color}) => {
  return (
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
            <View style={{ flex: 4, marginTop: spacing.l }}>
                <MultiSelectComponent
                data={TagsData}
                selected={tags}
                setSelected={setTags}
                />
            </View>

            <View style={{ flex: 1 }}>
                <AppButton
                fontSize={15}
                height={spacing.xl}
                width={"100%"}
                onPress={() => setModalVisible(!modalVisible)}
                title="Save"
                backgroundColor={colors.blue}
                color={colors.white}
                />
                <AppButton
                fontSize={15}
                height={spacing.xl}
                width={"100%"}
                onPress={() => {
                    setTags([]);
                    setModalVisible(!modalVisible);
                }}
                title="Cancel"
                backgroundColor={colors.white}
                color={colors.blue}
                buttonStyle={{
                    borderColor: colors.blue,
                    borderWidth: 2,
                }}
                />
            </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: sizes.height,
    width: sizes.width,
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    marginTop: 10,
    borderRadius: 20,
  },
})