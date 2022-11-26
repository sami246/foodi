import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  Modal,
  Switch,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db, auth, firestoreDB } from "../firebase";
import ImageUpload from "../components/ImageUpload";
import { colors, sizes, spacing, STATUS_BAR_HEIGHT } from "../constants/theme";
import { ScrollView } from "react-native-gesture-handler";
import uuid from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AppButton from "../components/AppButton";
import { addDoc, collection } from "firebase/firestore";
import { AirbnbRating } from "react-native-ratings";
import AppLoader from "../components/AppLoader";
import AppBannerAd from "../components/Ads/AppBannerAd";
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { AuthContext } from '../contexts/AuthProvider';
import TagsModal from "../components/TagsModal";

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const AddDishScreen = ({ navigation, route }) => {
  // if (route){
  //     const dish = route.params.dish;
  //     console.log("IN ADD DISH", dish)
  // }

  // States
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [dishName, setDishName] = useState(null);
  const [price, setPrice] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState(null);
  const [tags, setTags] = useState([]);
  const [WHA, setWHA] = useState(false);
  // Interstitial Ad
  const [loaded, setLoaded] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // For Date
  // ---------------
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("");

  const [mode, setMode] = useState("");
  const [show, setShow] = useState("");
  const [selected, setSelected] = useState("");
  // ---------------

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    var dateT =
      currentDate.getDate() +
      "/" +
      currentDate.getMonth() +
      "/" +
      currentDate.getFullYear();
    console.log("T", dateT);
    setDateText(dateT);
  };

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const toggleSwitch = () => {
    setWHA((previousState) => !previousState);
  };

  const handleCancel = () => {
    setImage(null);
    setDishName(null);
    setPrice(null);
    setRestaurant(null);
    setRating(null);
    setComment(null);
    setWHA(false);
    setDate(new Date());
    setDateText("");
    setTags(null);
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      interstitial.show();
      var uploadUrl = null;
      if (image != null) {
        console.log("uploading Image");
        uploadUrl = await uploadImageAsync(image);
        console.log("ssssss", uploadUrl)
      }
      console.log("Adding Doc");
      const docRef = await addDoc(collection(firestoreDB, "dishs"), {
        userId: user.uid,
        restaurant: restaurant,
        dishName: dishName,
        comment: comment,
        rating: rating,
        image: uploadUrl,
        updatedTime: new Date(),
        date: date,
        dateText: dateText,
        price: price,
        tags: "tags",
        wouldHaveAgain: WHA,
      });
      
      console.log("Dish Added");
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
    //   interstitial.onAdClosed()
      setUploading(false);
      handleCancel();
    }
  };

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
    <>
      {uploading ? <AppLoader /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppBannerAd height={100} />
        <View
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.inputContainer}>
            {/* Image */}
            <ImageUpload
              image={image}
              setImage={setImage}
              uploading={uploading}
              setUploading={setUploading}
            />
            {/* Restaurant */}
            <TextInput
              placeholder="Restaurant"
              value={restaurant}
              style={[styles.input, styles.inputShadow]}
              onChangeText={(text) => setRestaurant(text)}
            />
            {/* Dish Name */}
            <TextInput
              placeholder="Dish Name"
              value={dishName}
              style={[styles.input, styles.inputShadow]}
              onChangeText={(text) => setDishName(text)}
            />
            {/* Rating */}
            <View
              style={[
                {
                  justifyContent: "center",
                  backgroundColor: "white",
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 10,
                  margin: 5,
                  width: "100%",
                },
                styles.inputShadow,
              ]}
            >
              <AirbnbRating
                selectedColor={colors.orange}
                reviewColor={colors.lightOrange}
                count={10}
                reviews={[
                  "   1/10\nTerrible",
                  "2/10\n Bad",
                  "3/10\nMeh",
                  "4/10\n  OK",
                  " 5/10\nGood",
                  "     6/10\nVery Good",
                  " 7/10\nGreat",
                  "   8/10\nAmazing",
                  "       9/10\nUnbelievable",
                  "     10/10\nMasterpiece",
                ]}
                defaultRating={0}
                size={20}
                starContainerStyle={{ paddingBottom: 10 }}
                onFinishRating={setRating}
              />
            </View>
            {/* Comments */}
            <TextInput
              placeholder="Comments"
              value={comment}
              style={[
                styles.input,
                styles.inputShadow,
                { textAlignVertical: "top", height: spacing.xl * 3 },
              ]}
              onChangeText={(text) => setComment(text)}
              multiline={true}
              underlineColorAndroid="transparent"
            />
            {/* Price and Date */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                margin: 5,
                justifyContent: "space-between",
              }}
            >
              <Text
                placeholder="Add Date"
                value={dateText}
                style={[styles.smallInput, styles.inputShadow]}
                onPress={() => showMode("date")}
              >
                {dateText ? dateText : "DD/MM/YYYY"}
              </Text>
              {show && (
                <DateTimePicker
                  testID="DatePicker"
                  value={date}
                  mode={mode}
                  display="default"
                  onChange={onChangeDate}
                />
              )}

              <TextInput
                placeholder="Price £"
                value={price}
                style={[styles.smallInput, styles.inputShadow]}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
            {/* Tags */}
            <TagsModal modalVisible={modalVisible} setModalVisible={setModalVisible} tags={tags} setTags={setTags}/>
            {/* Would Have Again Switch */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Would have again?</Text>
              <Switch
                trackColor={{ false: colors.lightGray, true: colors.gold }}
                thumbColor={WHA ? colors.orange : colors.gray}
                ios_backgroundColor="gray"
                onValueChange={toggleSwitch}
                value={WHA}
              />
            </View>
          </View>
          {/* Buttons */}
          <View style={{ width: "75%" }}>
            <AppButton
              fontSize={18}
              height={45}
              width={"100%"}
              onPress={handleSubmit}
              title="Add Dish"
              backgroundColor={colors.orange}
              color={colors.white}
            />
            <AppButton
              fontSize={18}
              height={45}
              width={"100%"}
              onPress={handleCancel}
              title="Cancel"
              backgroundColor={colors.white}
              color={colors.lightOrange}
              buttonStyle={{ borderColor: colors.orange, borderWidth: 2 }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AddDishScreen;

const styles = StyleSheet.create({
  // Containers
  container: {
    minHeight: sizes.height,
    justifyContent: "space-evenly",
    alignItems: "center",
    top: STATUS_BAR_HEIGHT,
    marginBottom: STATUS_BAR_HEIGHT + 10,
  },
  inputContainer: {
    width: "85%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonContainer: {
    alignSelf: "auto",
    width: "60%",
    justifyContent: "center",
    alignContent: "center",
    margin: 10,
    marginBottom: 50,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  //Inputs
  input: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    margin: 5,
    width: "100%",
    height: spacing.xl,
    color: colors.gray,
  },
  smallInput: {
    backgroundColor: "white",
    color: colors.gray,
    borderRadius: 10,
    width: "48%",
    height: spacing.xl,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlignVertical: "center",
  },
  switchText: {
    fontSize: sizes.body,
    fontWeight: "500",
  },
  inputShadow: {
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
