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
    <Pressable onPress={this._pickImage} style={{
        width: 320,
        height: 250,
        alignItems: "center",
        justifyContent: "space-around",
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5,
        overflow: "hidden",
        marginBottom: 5,
     }}>
        <View style={{ }}>
            
            {!this.props.image &&   
            <View style={{ alignItems: "center", margin: 10 }}>
                <MaterialCommunityIcons name='image-edit-outline' size={60} color='gray' style={{margin:5}}/>
                <Button
                onPress={this._pickImage}
                title="Pick an image from camera roll"
                />

                {/* <Button onPress={this._takePhoto} title="Take a photo" /> */}
            </View>
            }

            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
        </View>
    </Pressable>
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
        <View>
          <View style={{margin: spacing.m, overflow: 'hidden'}}>
              <Pressable onPress={this._pickImage}>
                  <Image 
                  source={{ uri: this.props.image }}
                  style={{ width: sizes.width - spacing.xl - spacing.s, height: 230, overflow: 'hidden', resizeMode: 'center' }} 
                  />
              </Pressable>
          </View>
          <View>
            <MaterialCommunityIcons name='image-edit-outline' size={60} color='gray' style={{z: 1, position: 'absolute', left: spacing.m}}/>
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
      allowsEditing: true,
      quality: 0.6
    });
    this.props.setImage(pickerResult)
    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.6
    });
    if (!pickerResult.cancelled) {
      this.props.setImage(pickerResult.uri)
    }
    
    // this._handleImagePicked(pickerResult);
  };

}

