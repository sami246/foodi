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
import AppButton from "../components/SmallComponents/AppButton";
import { addDoc, collection,setDoc, doc } from "firebase/firestore";
import { AirbnbRating } from "react-native-ratings";
import AppLoader from "../components/AppLoader";
import AppBannerAd from "../components/Ads/AppBannerAd";
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { AuthContext } from '../contexts/AuthProvider';
import TagsModal from "../components/Modal/TagsModal";
import BackButton from "../components/SmallComponents/BackButton";
import AddRestaurant from "../components/Modal/AddRestaurant";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const AddDishScreen = ({ navigation, route }) => {
  
  // States
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState(route.params?.dish?.image || null);
  const [dishName, setDishName] = useState(route.params?.dish?.dishName || null);
  const [price, setPrice] = useState(route.params?.dish?.price || null);
  const [restaurant, setRestaurant] = useState(route.params?.dish?.restaurant || null);
  const [restaurantAdditonal, setRestaurantAdditional] = useState(route.params?.dish?.restaurantAdditonal || null);
  const [rating, setRating] = useState(route.params?.dish?.rating || null);
  const [comment, setComment] = useState(route.params?.dish?.comment || null);
  const [tags, setTags] = useState(route.params?.dish?.tags || []);
  const [wouldHaveAgain, setWouldHaveAgain] = useState(route.params?.dish?.wouldHaveAgain || false);
  // Interstitial Ad
  const [loaded, setLoaded] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addRestaurantModalVisible, setAddRestaurantModalVisible] = useState(false);

  // For Date
  // ---------------
  const [date, setDate] = useState(route.params?.dish?.date || new Date());
  const [dateText, setDateText] = useState(route.params?.dish?.dateText || "");

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
    setWouldHaveAgain((previousState) => !previousState);
  };

  const handleCancel = () => {
    setImage(null);
    setDishName(null);
    setPrice(null);
    setRestaurant(null);
    setRestaurantAdditional(null);
    setRating(null);
    setComment(null);
    setWouldHaveAgain(false);
    setDate(null);
    setDateText("");
    setTags(null);
    if(route.params){
      navigation.navigate('Dishes');
    }
    else{
      navigation.goBack();
    } 
  };

  const handleRatingColour = () => {
    if(rating === 1 || rating === 2){
      return colors.red
    }
    else if(rating === 3 || rating === 4){
      return colors.orange
    }
    else if(rating === 5 || rating === 6){
      return colors.blue
    }
    else if(rating === 7 || rating === 8){
      return colors.green
    }
    else if(rating === 9 || rating === 10){
      return colors.gold
    }
    else{
      return colors.orange
    }
  };

  const handleSubmit = async () => {
    if(!restaurant && !dishName){
      alert("Restaurant and Dish Name Required Fields Missing")
    }
    else if(!restaurant){
      alert("Restaurant Required Fields Missing")
    }
    else if(!dishName){
      alert("Dish Name Required Fields Missing")
    }
    else{
      try {
        setUploading(true);
        interstitial.show();
        var uploadUrl = null;
        if (image != null && image != route.params?.dish?.image) {
          console.log("uploading Image");
          uploadUrl = await uploadImageAsync(image);
        }
        if(route.params){
          console.log("Updating Doc");
          const docRef = await setDoc(doc(firestoreDB, "dishs", route.params?.dish?.id), {
            userId: user.uid,
            restaurant: restaurant,
            restaurantPlaceId: restaurantAdditonal ? restaurantAdditonal.place_id : null,
            dishName: dishName,
            comment: comment,
            rating: rating,
            image: uploadUrl || image,
            updatedTime: new Date(),
            date: date,
            dateText: dateText,
            price: price,
            tags: tags,
            wouldHaveAgain: wouldHaveAgain,
          });
        }
        else{
          console.log("Adding Doc");
          const docRef = await addDoc(collection(firestoreDB, "dishs"), {
            userId: user.uid,
            restaurant: restaurant,
            restaurantPlaceId: restaurantAdditonal ? restaurantAdditonal.place_id : null,
            dishName: dishName,
            comment: comment,
            rating: rating,
            image: uploadUrl,
            updatedTime: new Date(),
            dateCreated: new Date(),
            date: date,
            dateText: dateText,
            price: price,
            tags: tags,
            wouldHaveAgain: wouldHaveAgain,
          });
        }
        console.log("Dish Added");
        if (restaurantAdditonal != null){
          const docRef2 = await setDoc(doc(firestoreDB, "restaurants", restaurantAdditonal.place_id), {
            name: restaurant,
            address: restaurantAdditonal.address ? restaurantAdditonal.address : null,
            url: restaurantAdditonal.url ? restaurantAdditonal.url : null,
            lat: restaurantAdditonal.lat ? restaurantAdditonal.lat : null,
            lng: restaurantAdditonal.lng ? restaurantAdditonal.lng : null,
            priceLevel: restaurantAdditonal.price_level ? restaurantAdditonal.price_level : null,
            website: restaurantAdditonal.website ? restaurantAdditonal.website : null,
            rating: restaurantAdditonal.rating ? restaurantAdditonal.rating : null,
          });
          console.log("Restaurant Added");
        }
        
      } catch (e) {
        console.log(e);
        alert("Upload failed, sorry :(");
      } finally {
      //   interstitial.onAdClosed()
        setUploading(false);
        handleCancel();
      }
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
      {addRestaurantModalVisible && <AddRestaurant
       modalVisible={addRestaurantModalVisible}
       setModalVisible={setAddRestaurantModalVisible}
       setRestaurant={setRestaurant}
       setRestaurantAdditional = {setRestaurantAdditional}
       />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppBannerAd height={100} width={sizes.width- 5}/>
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
              color={handleRatingColour()}
            />
            {/* Restaurant */}

            {/* <TextInput
              placeholder="Restaurant"
              value={restaurant}
              style={[styles.input, styles.inputShadow]}
              onChangeText={(text) => setRestaurant(text)}
            /> */}
            <View style={{width: "100%", flexDirection: 'row', justifyContent: 'center'}}>
              <Text 
              numberOfLines={1}
              style={[styles.input, styles.inputShadow, {flex: restaurantAdditonal ? 1 : 0,}]}
              onPress={() => setAddRestaurantModalVisible(true)}
              >{restaurant ? restaurant : "Restaurant"}</Text>
              {restaurantAdditonal && <MaterialCommunityIcons name='google-maps' size={30} color={colors.green} style={{marginLeft:5, textAlignVertical: 'center' }}/>}
            </View>

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
                  borderWidth: rating ? 2 : 0,
                  borderColor: handleRatingColour()
                },
                styles.inputShadow,
              ]}
            >
              <AirbnbRating
                selectedColor={handleRatingColour()}
                reviewColor={handleRatingColour()}
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
                defaultRating={rating || 0}
                size={20}
                starContainerStyle={{ paddingBottom: 10, }}
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
                maxLength={7}
              />
            </View>
            {/* Tags */}
            <TagsModal modalVisible={modalVisible} setModalVisible={setModalVisible} tags={tags} setTags={setTags} showButton={true} color={handleRatingColour()}/>
            {/* Would Have Again Switch */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Would have again?</Text>
              <Switch
                trackColor={{ false: colors.lightGray, true: colors.gray }}
                thumbColor={wouldHaveAgain ? handleRatingColour(): colors.gray}
                ios_backgroundColor="gray"
                onValueChange={toggleSwitch}
                value={wouldHaveAgain}
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
              title={route.params?.dish ? "Update Dish" : "Add Dish"}
              backgroundColor={handleRatingColour()}
              color={colors.white}
            />
            <AppButton
              fontSize={18}
              height={45}
              width={"100%"}
              onPress={handleCancel}
              title="Cancel"
              backgroundColor={colors.white}
              color={handleRatingColour()}
              buttonStyle={{ borderColor: handleRatingColour(), borderWidth: 2 }}
            />
          </View>
        </View>
        <BackButton iconColor={handleRatingColour()} />
        
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
    marginVertical: 5
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
    textAlignVertical: 'center',
    fontWeight: '400'
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
