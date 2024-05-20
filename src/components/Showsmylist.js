import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { responsiveHeight as rh, responsiveWidth as rw, responsiveFontSize as rf } from "react-native-responsive-dimensions";
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { showsMyList } from '../api/mylistAPI';

const Showsmylist = ({ label, userShowMylist }) => {

  const navigation = useNavigation();

  const [showsList, setShowsList] = React.useState([]);
  console.log("User Shows in my list called", userShowMylist)
  React.useEffect(() => {
    const fetchShows = async () => {
      const shows = await showsMyList();
      console.log("Shows in my list called", shows)
      setShowsList(shows.showsInMyList);
    };

    fetchShows();
  }, [userShowMylist]);

  const handleShowDetails = (show) => {
    navigation.navigate('ShowDetails', { show });
  }

  const renderShowCards = ({ item }) => (
    <TouchableOpacity onPress={() => handleShowDetails(item)} style={styles.showCardContainer}>
      <Image source={{ uri: item.posterPath }} style={styles.showCardImage} />
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <FlatList data={showsList} keyExtractor={(item) => item._id} renderItem={renderShowCards} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 250,
  },
  label: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
  showCardContainer: {
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal:10
  },
  showCardImage: {
    width: 150,
    height: '100%',
    borderRadius: 10,
  }
})

export default Showsmylist;
