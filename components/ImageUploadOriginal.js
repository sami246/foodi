import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
import { db } from "../firebase";
import uuid from "uuid";
import { colors, sizes, spacing } from "../constants/theme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

export default class ImageUpload extends React.Component {
  state = {
    image: null,
    uploading: false,
  };

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
    let { image } = this.state;

    return (
    <Pressable onPress={this._pickImage} style={{
        width: 320,
        height: 250,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: colors.lightGray,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5,
        overflow: "hidden",
        marginBottom: 10,
     }}>
        <View style={{ alignItems: "center",}}>
            <MaterialCommunityIcons name='image-edit-outline' size={60} color='gray'/>
            {!image &&   
            <View style={{ margin: 10 }}>
                
                <Button
                onPress={this._pickImage}
                title="Pick an image from camera roll"
                />

                <Button onPress={this._takePhoto} title="Take a photo" />
            </View>
            }

            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
        </View>
    </Pressable>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
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
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
        <View style={{margin: spacing.m}}>
            <Pressable onPress={this._pickImage}>
                <Image 
                source={{ uri: image }}
                style={{ width: sizes.width - spacing.xl - spacing.s, height: 230, overflow: 'hidden', resizeMode: 'center' }} 
                />
            </Pressable>
        </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.6
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.6
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({ uploading: false });
    }
  };
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
  console.log({fileRef}, {blob})
  const result = await uploadBytes(fileRef, blob);
  console.log(fileRef.fullPath)
  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
}