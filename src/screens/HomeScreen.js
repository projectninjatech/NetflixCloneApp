import { View, StatusBar, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { moviesListAPI } from '../api/moviesList'
import { mylistAPI } from '../api/mylistAPI';
import { getAllWatchTimes } from '../api/userMovieWatchtimeAPI';
import MovieBanner from '../components/MovieBanner';
import MovieCards from '../components/MovieCards';
import { useNavigation } from '@react-navigation/native';
import MylistMovies from '../components/MylistMovies';
import ContinueWatching from '../components/ContinueWatching';
import { useFocusEffect } from '@react-navigation/native';


export default function HomeScreen({ route }) {
    const navigation = useNavigation();
    const [moviesList, setmoviesList] = React.useState([])
    const [mylist, setMylist] = React.useState(route.params.mylist);
    const [watchedMovies, setWatchedMovies] = React.useState(route.params.watchedMovies);

    React.useEffect(() => {
        const apiCall = async () => {
            const movies = await moviesListAPI();
            setmoviesList(movies)
        }

        apiCall();
    }, [])

    React.useEffect(() => {
        const updateMylist = async () => {
            // You may need to fetch the updated mylist from your API here
            console.log("Homescreen mylist has been updated")
            const updatedMylist = await mylistAPI();
            setMylist(updatedMylist.moviesInMyList);
        };

        updateMylist();
    }, [route.params.mylist])




    console.log("Mylist length", mylist)
    console.log("Watchmovies length", watchedMovies.length)

    useFocusEffect(
        React.useCallback(() => {
            const fetchWatchedMovies = async () => {
                const movies = await getAllWatchTimes();
                setWatchedMovies(movies.watchedMovies);
            };

            fetchWatchedMovies();
        }, []) // Empty dependency array means this effect runs once when the component mounts
    );



    const handleBanner = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    }

    const posterPlayButton = (movieID, movieLink, movieTitle) => {
        navigation.navigate('VideoPlayer', { movieID, movieLink, movieTitle });
    }

    const posterInfoButton = (movie) => {
        navigation.navigate('MovieDetails', { movie });
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView style={styles.scrollView}>
                <MovieBanner
                    moviesList={moviesList}
                    mylist={mylist}
                    handleBanner={handleBanner}
                    posterPlayButton={posterPlayButton}
                    posterInfoButton={posterInfoButton} 
                    />


                <View style={styles.subContainer}>
                    {mylist.length != 0 && (<MylistMovies label={"My List"} mylist={mylist} />)}

                    {watchedMovies.length != 0 && (<ContinueWatching label={"Continue Watching"} watchedMovieList={watchedMovies} />)}

                    <MovieCards genreID={"Netflix"} label={'Only on Netflix'} />
                    <MovieCards genreID={35} label={'Comedy Movies'} />
                    <MovieCards genreID={18} label={'Drama Movies'} />
                    <MovieCards genreID={14} label={'Fantasy Movies'} />
                    <MovieCards genreID={878} label={'Sci-Fi Movies'} />
                    <MovieCards genreID={28} label={'Action Movies'} />
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    subContainer: {
        paddingHorizontal: 15,
        gap: 10,
        marginTop: 20,
    },
})