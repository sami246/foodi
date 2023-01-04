import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const TOP_PLACES = [
    {
      id: 1,
      image: {uri: 'https://media-cdn.tripadvisor.com/media/photo-s/10/ed/d4/4e/photo0jpg.jpg'},
      title: 'Pancakes',
      location: 'The Diner',
      rating: 9,
      description:
        'The ultimate Amalfi Coast travel guide, where to stay, where to eat, and what areas to visit in the Amalfi Coast of Italy. Positano, Ravello, Amalfi and more',
      category: ['dessert']
    },
    {
      id: 2,
      image: {uri: 'https://s3-media0.fl.yelpcdn.com/bphoto/gHRC8QxmiZsSTIMFyO6AKA/348s.jpg'},
      title: 'Gangnam Wings',
      location: "Randy's Wing Bar",
      rating: 9,
      description:
        'Granada is the capital city of the province of Granada, in the autonomous community of Andalusia, Spain',
      category: ['chicken', 'american']
    },
    {
      id: 3,
      image: {uri: 'https://www.londonxlondon.com/wp-content/uploads/2021/08/Black-Bear-Burger-Boxpark.jpeg'},
      title: 'Black Truffle Burger',
      location: 'Burger UK',
      rating: 8,
      description:
        "Cherry blossoms usually bloom between mid-March and early May. In 2022, Tokyo's cherry blossom season officially began on March 20",
    },
  ];
  
  export const PLACES = [
    {
      id: 4,
      image: 'https://steakandteeth.files.wordpress.com/2016/05/2016-05-18-07-25-05-1-2-jpg.jpeg?w=1140',
      dishName: 'Caramel Popcorn Freak Shake',
      restaurant: 'Sweet Stepney Green',
      rating: 3,
      comment:
        "Cappadocia's landscape includes dramatic expanses of soft volcanic rock, shaped by erosion into towers, cones, valleys, and caves. Rock-cut churches and underground tunnel complexes from the Byzantine and Islamic eras are scattered throughout the countryside.",
    },
    {
      id: 5,
      image: 'https://www.hot-dinners.com/images/stories/blog/2019/coqfighter2.jpg',
      dishName: 'Chicken Burger',
      restaurant: 'Coqfighter Kings Cross',
      rating: 5,
      comment:
        'Capri is an island of a thousand faces, where visitors can walk the trails skirting the cliffs above the Mediterranean in total solitude, dive into the crystalline waters of its rocky shore, or plunge into the vibrant crowds of the Piazzetta and shop in the most fashionable boutiques in the world.',
    },
    {
      id: 6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ4QU9gM25u_hoEmw_E_HO9Xf-3ZBkjnWa_s_b2kWa9rDzMnXrY6pEGUukqjgQvgatyIs&usqp=CAU',
      dishName: 'Steak',
      restaurant: 'Steakout',
      rating: 1,
      comment:
        'Learn how you can travel Bora Bora on a budget and how overwater bungalows are possible for cheap plus tips on keeping Bora Bora trip costs low.',
    },
    {
      id: 7,
      image: 'https://i.pinimg.com/736x/51/40/c5/5140c501e7d035d64e896bbce9e3f4c5--wagamama-teppanyaki.jpg',
      dishName: 'Chicken * Prawn Pad-Thai testtttt',
      restaurant: 'Wagamama Stratford',
      rating: 5,
      comment:
        'Phuket is the largest island in Thailand. It is located in the Andaman Sea in southern Thailand',
    },
  ];

  export const TagsData = [
    { label: 'American', value: 'American', icon: <MaterialCommunityIcons color="black" name="food-hot-dog" size={17} />, type: MaterialCommunityIcons, name: 'food-hot-dog', size:17 },
    { label: 'Breakfast', value: 'Breakfast', icon: <MaterialCommunityIcons color="black" name="food-variant" size={17} />, type: MaterialCommunityIcons, name: 'food-variant', size:17 },
    { label: 'Brunch', value: 'Brunch', icon: <MaterialCommunityIcons color="black" name="food-croissant" size={17} />, type: MaterialCommunityIcons, name: 'food-croissant', size:17 },
    { label: 'Burger', value: 'Burger', icon: <MaterialCommunityIcons color="black" name="hamburger" size={17} />, type: MaterialCommunityIcons, name: 'hamburger', size:17 },
    { label: 'Chicken', value: 'Chicken', icon: <MaterialCommunityIcons color="black" name="food-drumstick" size={17} />, type: MaterialCommunityIcons, name: 'food-drumstick', size:17 },
    { label: 'Chinese', value: 'Chinese', icon: <MaterialCommunityIcons color="black" name="food-takeout-box" size={17} />, type: MaterialCommunityIcons, name: 'food-takeout-box', size:17 },
    { label: 'Dessert', value: 'Dessert', icon: <Entypo color="black" name="cake" size={17} />, type: Entypo, name: 'cake', size:17 },
    { label: 'Drink', value: 'Drink', icon: <MaterialCommunityIcons color="black" name="cup" size={17} />, type: MaterialCommunityIcons, name: 'cup', size:17 },
    { label: 'Fish', value: 'Fish', icon: <FontAwesome5 color="black" name="fish" size={17} />, type: FontAwesome5, name: 'fish', size:17 },
    { label: 'Gluten Free', value: 'Gluten Free', icon: <FontAwesome5 color="black" name="ban" size={17} />, type: FontAwesome5, name: 'ban', size:17 },
    { label: 'Halal', value: 'Halal', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} />, type: MaterialCommunityIcons, name: 'food-halal', size:17 },
    { label: 'Italian', value: 'Italian', icon: <FontAwesome5 color="black" name="globe-europe" size={17} />, type: FontAwesome5, name: 'globe-europe', size:16 },
    { label: 'Meat', value: 'Meat', icon: <MaterialCommunityIcons color="black" name="food-steak" size={17} />, type: MaterialCommunityIcons, name: 'food-steak', size:17 },
    { label: 'Mexican', value: 'Mexican', icon: <FontAwesome5 color="black" name="globe-americas" size={17} />, type: FontAwesome5, name: 'globe-americas', size:16 },
    { label: 'Pizza', value: 'Pizza', icon: <FontAwesome5 color="black" name="pizza-slice" size={17} />, type: FontAwesome5, name: 'pizza-slice', size:16 },
    { label: 'Snack', value: 'Snack', icon: <FontAwesome5 color="black" name="cookie-bite" size={17} />, type: FontAwesome5, name: 'cookie-bite', size:17 },
    { label: 'Spicy', value: 'Spicy', icon: <FontAwesome5 color="black" name="burn" size={17} />, type: FontAwesome5, name: 'burn', size:17 },
    // { label: 'Sushi', value: 'Sushi', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Value for Money', value: 'Value for Money', icon: <FontAwesome5 color="black" name="money-bill-alt" size={17} />, type: FontAwesome5, name: 'money-bill-alt', size:17 },
    { label: 'Vegetarian', value: 'Vegetarian', icon: <FontAwesome color="black" name="envira" size={17} />, type: FontAwesome, name: 'envira', size:17 },
  ];

  const Images = [
    { image: require("../assets/place-holders/image-placeholder-blue.png") },
    { image: require("../assets/place-holders/image-placeholder-gold.png") },
    { image: require("../assets/place-holders/image-placeholder-green.png") },
    { image: require("../assets/place-holders/image-placeholder-red.png") },
];

export const markers = [
    {
      id: 'ChIJ490zYTwbdkgRn-Nq3Dq5t6g',
      coordinate: {
        latitude: 51.5412934,
        longitude: -0.1463145,
      },
      name: "KHAAO - CAMDEN LOCK",
      description: "This is the best food place",
      url: 'https://maps.google.com/?cid=12157389381567177631',
      website: 'http://www.khaaokarachi.com/',
      address: 'Camden Lock Market Unit WY21, London NW1 8AF, UK',
      image: Images[0].image,
      rating: 4.1,
      priceLevel: null,
    },
    {
      id: 'ChIJBS8tKT8bdkgRlUzYr3nKauU',
      coordinate: {
        latitude: 51.5311021,
        longitude: -0.1198515,
      },
      name: "Pizza Union King's Cross",
      description: "This is the second best food place",
      url: 'https://maps.google.com/?cid=16531248006206868629',
      website: 'http://www.pizzaunion.com/',
      address: '246-250 Pentonville Rd, London N1 9JY, UK',
      image: Images[1].image,
      rating: 4.6,
      priceLevel: 1,
    },
    {
      id: 'ChIJiZRSWuQadkgRtNhKUxpQV5s',
      coordinate: {
        latitude: 51.543277,
        longitude: -0.1488976,
      },
      name: "BUK - CAMDEN",
      description: "This is the third best food place",
      url: 'https://maps.google.com/?cid=11193503472849442996',
      website: 'http://www.bukburger.com/',
      address: '8 Ferdinand new Date(), Chalk Farm, London NW1 8ER, UK',
      image: Images[2].image,
      rating: 4.3,
      priceLevel: null,
    },
    {
      id: 'ChIJw9BFM8gbdkgRYIc2RQikaMs',
      coordinate: {
        latitude: 51.53035689999999,
        longitude: -0.1214034,
      },
      name: "KFC London - Kings Cross",
      description: "This is the fourth best food place",
      url: 'https://maps.google.com/?cid=14657145342705174368',
      website: 'https://www.kfc.co.uk/kfc-near-me/london-kings-cross?utm_term=London&utm_medium=organic&utm_source=uberall',
      address: '323 Grays Inn Rd, London WC1X 8PX, UK',
      image: Images[3].image,
      rating: 1,
      priceLevel: 1,
    },
    {
      id: 'ChIJB2ELl8scdkgR3x_68FAD5VE',
      coordinate: {
        latitude: 51.5184071,
        longitude: -0.0656871,
      },
      name: "The Urban Chocolatier Whitechapel",
      description: "This is the fifth best food place",
      url: 'https://maps.google.com/?cid=5901126532914094047',
      website: 'https://urbanchocolatier.com/',
      address: '9 Davenant new Date(), London E1 5NB, UK',
      image: Images[3].image,
      rating: 4.3,
      priceLevel: 2,
    },
    {
      id: 'ChIJFXPozbkFdkgRDXyH1C-H_gM',
      coordinate: {
        latitude: 51.51421079999999,
        longitude: -0.1369016,
      },
      name: "Kasa and Kin",
      description: "This is the fifth best food place",
      url: 'https://maps.google.com/?cid=5901126532914094047',
      website: 'https://urbanchocolatier.com/',
      address: '52-53 Poland St, London W1F 7NQ, UK',
      image: Images[3].image,
      rating: 4.3,
      priceLevel: null,
    },
];

export const dummyDishesDataByRating = [
  {
    "comment": null, "date": [new Date()], "dateCreated": [new Date()], "dateText": "9/8/2022", "dishName": "Dummyyyyyyyyyy Data", "id": "kvy6I6vRB8IDUegsrLbO", "image": "https://firebasestorage.googleapis.com/v0/b/foodi-562d0.appspot.com/o/dish_pictures%2F86a76751-ffc5-4d0d-9794-5c7f5ba8715c?alt=media&token=547d5e22-a03c-47fb-8319-24620214f6c2", "imagePlaceholder": "gold", "key": "kvy6I6vRB8IDUegsrLbO", "price": null, "rating": 8, "restaurant": "Pizzeria Sa Cova", "restaurantPlaceId": "ChIJvTOU0VGSlxIRlic9Kya9KyM", "tags": [Array], "updatedTime": [new Date()], "userId": "MLtw1ar0jBORPslhwd7aOzCuU9u2", "wouldHaveAgain": true
  },
  {
    "comment": null, "date": [new Date()], "dateText": "14/9/2022", "dishName": "White Chocolate Cookie Dough", "id": "7WKZE7F9vwX4wYAv1RHz", "image": "https://firebasestorage.googleapis.com/v0/b/foodi-562d0.appspot.com/o/dish_pictures%2F48021484-34eb-4d54-9b42-481b209ea02c?alt=media&token=ff6a7bbe-400f-4a83-bc60-24b89e1028a5", "key": "7WKZE7F9vwX4wYAv1RHz", "price": "£12", "rating": 8, "restaurant": "The Urban Chocolatier Whitechapel", "restaurantPlaceId": "ChIJB2ELl8scdkgR3x_68FAD5VE", "tags": [Array], "updatedTime": [new Date()], "userId": "MLtw1ar0jBORPslhwd7aOzCuU9u2", "wouldHaveAgain": true
 },
 {
  "comment": "Better in single", "date": [new Date()], "dateText": "18/10/2022", "dishName": "Beef Special Double", "id": "rBdTdKkXln8VgebFgsiN", "image": "https://firebasestorage.googleapis.com/v0/b/foodi-562d0.appspot.com/o/dish_pictures%2F3fce933c-35f2-48ce-a69d-3f71d17497bd?alt=media&token=844569b1-54bb-4254-adb7-bc1ded737f4d", "key": "rBdTdKkXln8VgebFgsiN", "price": "£7 ", "rating": 7, "restaurant": "BUK - CAMDEN", "restaurantPlaceId": "ChIJiZRSWuQadkgRtNhKUxpQV5s", "tags": [Array], "updatedTime": [new Date()], "userId": "MLtw1ar0jBORPslhwd7aOzCuU9u2", "wouldHaveAgain": true
},
 {
  "comment": null, "date": [new Date()], "dateText": "25/10/2022", "dishName": "Mexican Burger", "id": "Ci5PQORzpmDnY75ITWdz", "image": null, "imagePlaceholder": "orange", "key": "Ci5PQORzpmDnY75ITWdz", "price": "£7", "rating": 7, "restaurant": "Cheat Meals", "restaurantPlaceId": null, "tags": [Array], "updatedTime": [new Date()], "userId": "MLtw1ar0jBORPslhwd7aOzCuU9u2", "wouldHaveAgain": true
},
 {
  "comment": "Bit too tangy and rich", "date": [new Date()], "dateText": "10/10/2022", "dishName": "Mediterranean Chicken Pizza", "id": "M7VRmfatTPzUeQvZtKg6", "image": "https://firebasestorage.googleapis.com/v0/b/foodi-562d0.appspot.com/o/dish_pictures%2Fdbae096c-3caf-45db-944d-08ecb3355078?alt=media&token=dc0f4540-cc4e-4c5f-8728-e9ad5f6c6df9", "key": "M7VRmfatTPzUeQvZtKg6", "price": "£14", "rating": 4, "restaurant": "Gallio", "tags": [Array], "updatedTime": [new Date()], "userId": "MLtw1ar0jBORPslhwd7aOzCuU9u2", "wouldHaveAgain": false
}
]