// ShowCardList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ShowCard = ({ genre, showsList, handleShowDetails }) => {
  // Filter shows based on the current genre
  console.log("Showlist are", showsList)
  const filteredShows = showsList.filter((show) => show.genres.includes(genre));

  const renderShowCards = ({ item }) => (
    <TouchableOpacity onPress={() => handleShowDetails(item)} style={styles.showCardContainer}>
      <Image source={{ uri: item.posterPath }} style={styles.showCardImage} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{genre}</Text>
      <FlatList
        data={filteredShows}
        keyExtractor={(item) => item._id}
        renderItem={renderShowCards}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 250,
  },
  label: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 20,
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
  },
});

export default ShowCard;
