import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchShowList = ({ data }) => {

  const navigation = useNavigation();

  const formatReleaseDate = (dateString) => {
    const year = new Date(dateString).getFullYear();
    return year.toString();
  };

  const handleShowPress = (show) => {
    navigation.navigate('ShowDetails', { show });
  }

  const renderItem = ({ item }) => (

    <View>
      <TouchableOpacity onPress={() => handleShowPress(item)}>
        <View style={styles.showContainer}>
          <Image source={{ uri: item.posterPath }} style={styles.posterImage} />
          <View style={styles.showInfo}>
            <Text style={styles.showName}>{item.name} ({formatReleaseDate(item.releaseDate)})</Text>
            <Text style={styles.showName}>Ratings: {item.ratings}</Text>
            <View style={styles.genreContainer}>
              {item.genres.map((genre, index) => (
                <View key={index} style={styles.genreItem}>
                  <Text style={styles.showGenres}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.flatList}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: 'black',
  },
  showContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  posterImage: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  showInfo: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor:'red',
    justifyContent: 'space-evenly'
  },
  showName: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold'
  },
  genreContainer: {
    flexDirection: 'row',
  },
  genreItem: {
    backgroundColor: '#202124',
    borderRadius: 10, // Adjust the border radius as needed
    marginRight: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  showGenres: {
    fontWeight:'bold',
    color:'white'
  }

});

export default SearchShowList;
