import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";
import React from 'react'
import { moviesListAPI } from '../api/moviesList';
import { useNavigation } from '@react-navigation/native';

const MovieCards = ({ genreID, label, isTablet }) => {

  const navigation = useNavigation();

  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const movies = await moviesListAPI(genreID);
      setMoviesList(movies);
    };

    fetchMovies();
  }, [genreID]);

  const handleMovieDetails = (movie) => {
    navigation.navigate('MovieDetails', { movie });
  }

  const renderMovieCards = ({ item }) => (
    <TouchableOpacity onPress={() => handleMovieDetails(item)} style={[styles.movieCardContainer, {marginRight: isTablet ? 20 : 10}]}>
      <Image source={{ uri: item.posterPath }} style={[styles.moviecardImage, {width: isTablet ? 250 : 150}]} />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { height: isTablet ? 500 : 280 }]}>
      <Text style={styles.label}>{label}</Text>
      <FlatList data={moviesList.slice(0, 10)} keyExtractor={(item) => item._id} renderItem={renderMovieCards} windowSize={2} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // height: 280,
  },
  label: {
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: 'white'
  },
  movieCardContainer: {
    // marginRight: 10,
    borderRadius: 20,
    marginBottom:20
  },
  moviecardImage: {
    // width: 150,
    height: '100%',
    borderRadius: 10,
  }
})

export default MovieCards;