import { View, StatusBar, ScrollView, StyleSheet, BackHandler, Alert } from 'react-native'
import React from 'react'
import { moviesListAPI } from '../api/moviesList'
import { mylistAPI } from '../api/mylistAPI';
import { getAllMoviesGenres } from '../api/moviesList';
import { getAllWatchTimes } from '../api/userMovieWatchtimeAPI';
import MovieBanner from '../components/MovieBanner';
import MovieCards from '../components/MovieCards';
import { useNavigation } from '@react-navigation/native';
import MylistMovies from '../components/MylistMovies';
import ContinueWatching from '../components/ContinueWatching';
import { useFocusEffect } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

export default function HomeScreen({ route }) {
    const navigation = useNavigation();
    const [moviesList, setmoviesList] = React.useState([])
    const [mylist, setMylist] = React.useState(route.params.mylist);
    const [watchedMovies, setWatchedMovies] = React.useState(route.params.watchedMovies);
    const [allGenres, setAllGenres] = React.useState([]);
    const [isTablet, setIsTablet] = React.useState(false)

    // useFocusEffect(
    //     React.useCallback(() => {
    //         const moviesListAPICall = async () => {
    //             const movies = await moviesListAPI();
    //             console.log("Movies list are as",movies)
    //             setmoviesList(movies)
    //             if (DeviceInfo.getDeviceType() === "Tablet") {
    //                 setIsTablet(true)
    //             }
    //         }

    //         moviesListAPICall();
    //     }, [])
    // )

    React.useEffect(() => {
        const moviesListAPICall = async () => {
            const movies = await moviesListAPI();
            console.log("Movies list are as", movies)
            setmoviesList(movies)
            if (DeviceInfo.getDeviceType() === "Tablet") {
                setIsTablet(true)
            }
        }

        moviesListAPICall();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            const updateMylist = async () => {
                const updatedMylist = await mylistAPI();
                setMylist(updatedMylist.moviesInMyList);
            };

            updateMylist();
        }, [route.params.mylist])
    )

    React.useEffect(() => {
        const fetchAllGenres = async () => {
            // Fetch unique genres from your API
            const response = await getAllMoviesGenres()
            setAllGenres(response);
        };

        fetchAllGenres();
    }, []);

    console.log("Movies genres are", allGenres)

    // React.useEffect(() => {
    //     const updateMylist = async () => {
    //         // You may need to fetch the updated mylist from your API here
    //         // console.log("Homescreen mylist has been updated")
    //         const updatedMylist = await mylistAPI();
    //         setMylist(updatedMylist.moviesInMyList);
    //     };

    //     updateMylist();
    // }, [route.params.mylist])


    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }, []) // Empty dependency array means this effect runs once when the screen is focused
    );


    // console.log("Mylist length", mylist)
    // console.log("Watchmovies length", watchedMovies.length)

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

    const handleMovieDetails = (movie) => {
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
                    isTablet={isTablet}
                />


                <View style={styles.subContainer}>
                    {mylist.length != 0 && (<MylistMovies label={"My List"} mylist={mylist} isTablet={isTablet} />)}

                    {watchedMovies.length != 0 && (<ContinueWatching label={"Continue Watching"} watchedMovieList={watchedMovies} isTablet={isTablet} />)}

                    {/* <MovieCards genreID={"Netflix"} label={'Trending Movies'} isTablet={isTablet} /> */}
                    {/* <MovieCards genreID={35} label={'Comedy Movies'} isTablet={isTablet}/>
                    <MovieCards genreID={18} label={'Drama Movies'} isTablet={isTablet}/>
                    <MovieCards genreID={14} label={'Fantasy Movies'} isTablet={isTablet}/>
                    <MovieCards genreID={878} label={'Sci-Fi Movies'} isTablet={isTablet}/>
                    <MovieCards genreID={28} label={'Action Movies'} isTablet={isTablet}/> */}

                    {allGenres.map((genre) => (
                        <MovieCards key={genre} genre={genre} moviesList={moviesList} handleMovieDetails={handleMovieDetails} isTablet={isTablet} />
                    ))}
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
        marginBottom:20
    },
})