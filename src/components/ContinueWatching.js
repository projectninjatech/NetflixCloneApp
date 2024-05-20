import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAllWatchTimes, removeWatchedMovie } from '../api/userMovieWatchtimeAPI';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const ContinueWatching = ({ watchedMovieList, label }) => {

    const navigation = useNavigation();

    const [moviesList, setMoviesList] = React.useState([]);

    React.useEffect(() => {
        const fetchMovies = async () => {
            const movies = await getAllWatchTimes();
            setMoviesList(movies.watchedMovies);
        };

        fetchMovies();
    }, [watchedMovieList]);

    const handleMovieDetails = (movieID, movieLink, movieTitle) => {
        navigation.navigate('VideoPlayer', { movieID, movieLink, movieTitle });
    }

    const handleInfoIconPress = (movie) => {
        console.log("Movie Details continue watching", movie)
        navigation.navigate('MovieDetails', { movie });
    }

    const handleCrossIconPress = async (movie) => {
        console.log("Move remove from watched movies", movie._id)
        try {
            // Call the API to remove the movie from the watched list
            await removeWatchedMovie(movie._id);
    
            // After removing, trigger a re-fetch of the watched movies list
            const updatedMovies = await getAllWatchTimes();
            setMoviesList(updatedMovies.watchedMovies);
        } catch (error) {
            console.error("Error removing movie from watched list:", error.message);
        }
    }

    const renderMovieCards = ({ item }) => (
        <TouchableOpacity onPress={() => handleMovieDetails(item.movie._id, item.movie.downloadLink, item.movie.title)} style={styles.movieCardContainer}>
            <Image source={{ uri: item.movie.posterPath }} style={styles.moviecardImage} />
            <View style={styles.progressbarContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={item.movie.runtime * 60}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="white"
                    thumbTintColor="red"
                    value={item.watchedTime}
                />
                <TouchableOpacity>
                    <View style={styles.imageFooter}>
                        <TouchableOpacity onPress={() => handleInfoIconPress(item.movie)}>
                            <Icon name="info-circle" size={20} color="white" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleCrossIconPress(item.movie)}>
                            <EntypoIcon name="cross" size={25} color="white" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
            <Icon style={styles.playButton} name="play-circle" size={80} color="white" />
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <FlatList data={moviesList} keyExtractor={(item) => item.movie._id} renderItem={renderMovieCards} horizontal showsHorizontalScrollIndicator={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: 250,
    },
    label: {
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: rf(2.5),
        fontWeight: 'bold',
        color: 'white'
    },
    movieCardContainer: {
        marginRight: 10,
        borderRadius: 20,
        position: 'relative',
    },
    moviecardImage: {
        width: 150,
        height: '100%',
        borderRadius: 10,
        opacity: 0.85
    },
    progressbarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '20%',
        backgroundColor: '#343541',

    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -40 }, { translateY: -40 }],
    },
    slider: {
        width:'100%',
        bottom:8,
    },
    imageFooter: {
        backgroundColor: '#343541',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        bottom:8
    }
})

export default ContinueWatching;