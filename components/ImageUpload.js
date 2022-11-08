import * as ImagePicker from "expo-image-picker";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  LogBox,
  TouchableHighlight,
  Pressable
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { colors, sizes, spacing } from "../constants/theme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from "./AppButton";

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);


export default class ImageUpload extends React.Component {
    


  async componentDidMount() {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  }

  render() {

    return (
      <View>
      {!this.props.image ?  
        <Pressable onPress={this._pickImage} style={{
        width: 320,
        height: 225,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: colors.lightGray,
        borderWidth: 2,
        borderColor: colors.white,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5,
        marginBottom: 5,
        }}>
        <View style={{ }}>
            
             
            <View style={{ alignItems: "center", margin: 10 }}>
                <MaterialCommunityIcons name='image-edit-outline' size={60} color='gray' style={{margin:5}}/>
                <AppButton 
                  title='Pick an image from camera roll'
                  height={spacing.m}
                  width={225}
                  onPress={this._pickImage}
                  fontSize={13}
                  backgroundColor={colors.orange}
                  color={colors.white}/>

                {/* <Button onPress={this._takePhoto} title="Take a photo" /> */}
            </View>
            

            
            {this._maybeRenderUploadingOverlay()}
        </View>
    </Pressable>
     : 
     <View>{this._maybeRenderImage()}</View>
     }
    </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.props.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    if (!this.props.image) {
      return;
    }

    return (
        <View >
          <View style={{
            width: 320,
            height: 225,
            alignItems: "center",
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.white,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            marginTop: 10,
            elevation: 4
            }}>
                <Pressable onPress={this._pickImage} >
                    <Image 
                    source={{ uri: this.props.image }}
                    style={{ width: sizes.width - spacing.xl - spacing.s, height: 225, resizeMode: 'center', zIndex: 0}} 
                    />
                </Pressable>                
          </View>
          <View style={{flexDirection: 'row'}}>
                <AppButton 
                  title="Change"
                  height={spacing.xl}
                  width={spacing.l}
                  onPress={this._pickImage}
                  fontSize={14}
                  icon={
                      <MaterialCommunityIcons
                      name='image-edit-outline'
                      size={22}
                      color={colors.white}
                      />}
                      backgroundColor={colors.orange}
                      color={colors.white}
                  />
                  <AppButton 
                  title="Delete"
                  height={spacing.xl}
                  width={spacing.l}
                  onPress={console.log("DELETE")}
                  fontSize={14}
                  icon={
                      <MaterialCommunityIcons
                      name='delete-outline'
                      size={22}
                      color={colors.white}
                      style={{flex: 0.5, alignSelf: 'center'}}
                      />}
                      backgroundColor={colors.orange}
                      color={colors.white}
                  />
          </View>
        </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.props.image,
      title: "Check out this photo",
      url: this.props.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.props.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      aspect: [3, 2],
      allowsEditing: true,
      quality: 0.6
    });
    this.props.setImage(pickerResult)
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [3, 2],
      allowsEditing: true,
      quality: 0.6
    });
    if (!pickerResult.cancelled) {
      this.props.setImage(pickerResult.uri)
    }
    
    // this._handleImagePicked(pickerResult);
  };

}

