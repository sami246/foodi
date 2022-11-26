import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
    { label: 'American', value: 'American', icon: <MaterialCommunityIcons color="black" name="food-hot-dog" size={17} /> },
    { label: 'Breakfast', value: 'Breakfast', icon: <MaterialCommunityIcons color="black" name="food-croissant" size={17} /> },
    { label: 'Brunch', value: 'Brunch', icon: <AntDesign color="black" name="delete" size={17} /> },
    { label: 'Burger', value: 'Burger', icon: <MaterialCommunityIcons color="black" name="hamburger" size={17} /> },
    { label: 'Chicken', value: 'Chicken', icon: <MaterialCommunityIcons color="black" name="food-drumstick" size={17} /> },
    { label: 'Chinese', value: 'Chinese', icon: <MaterialCommunityIcons color="black" name="food-takeout-box" size={17} /> },
    { label: 'Dessert', value: 'Dessert', icon: <AntDesign color="black" name="delete" size={17} /> },
    { label: 'Fish', value: 'Fish', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Gluten Free', value: 'Gluten Free', icon: <AntDesign color="black" name="delete" size={17} /> },
    { label: 'Halal', value: 'Halal', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Italian', value: 'Italian', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Meat', value: 'Meat', icon: <MaterialCommunityIcons color="black" name="food-steak" size={17} /> },
    { label: 'Mexican', value: 'Mexican', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Pizza', value: 'Pizza', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Snack', value: 'Snack', icon: <AntDesign color="black" name="delete" size={17} /> },
    { label: 'Spicy', value: 'Spicy', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Sushi', value: 'Sushi', icon: <MaterialCommunityIcons color="black" name="food-halal" size={17} /> },
    { label: 'Value for Money', value: 'Value for Money', icon: <AntDesign color="black" name="delete" size={17} /> },
    { label: 'Vegetarian', value: 'Vegetarian', icon: <AntDesign color="black" name="delete" size={17} /> },
  ];