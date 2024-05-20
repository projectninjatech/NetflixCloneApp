// MovieBanner.js
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { addMovieToList, removeMovieFromList } from '../api/mylistAPI';
import { useNavigation } from '@react-navigation/native';

const MovieBanner = ({ moviesList, mylist, handleBanner, posterPlayButton, posterInfoButton }) => {

    const navigation = useNavigation();
    const [userMylist, setUsermyList] = React.useState(mylist)

      const moveToShowsScreen = () => {
        navigation.navigate('ShowsTabNav')
    }

    const addToList = async (item) => {
        try {
            let response;

            if (userMylist.includes(item._id)) {
                console.log("Movie is in the list");
                response = await removeMovieFromList(item._id);
            } else {
                console.log("Movie is not in the list");
                response = await addMovieToList(item._id);
            }

            setUsermyList(response.user.mylist);
            navigation.navigate('HomeScreen', { mylist: response.user.mylist });
        } catch (error) {
            console.error("Error adding/removing movie from list", error);
        }
    };

    const renderMovieBanner = ({ item }) => (
        <TouchableOpacity onPress={() => handleBanner(item)}>
            <ImageBackground source={{ uri: item.posterPath }} style={styles.posterImage} resizeMode="cover">
                <TouchableOpacity style={styles.transparentButton} onPress={() => moveToShowsScreen()}>
                    <Text style={styles.buttonText}>TV Shows</Text>
                </TouchableOpacity>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']} style={styles.linearGradient}>
                    <TouchableOpacity key={item} style={styles.myListButton} onPress={() => addToList(item)}>
                        {userMylist.includes(item._id) ? (<Icon name="checkcircle" size={30} color="lightgreen" />) : (<Icon name="plus" size={30} color="white" />)}
                        <Text style={styles.myListText}>My List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.posterPlayButton} onPress={() => posterPlayButton(item._id, item.downloadLink, item.title)}>
                        <EntypoIcon name="controller-play" size={30} color="black" />
                        <Text style={styles.playText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.posterInfoButton} onPress={() => posterInfoButton(item)}>
                        <Icon name="infocirlceo" size={30} color="white" />
                        <Text style={styles.infoButtonTxt}>Info</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                pagingEnabled
                data={moviesList}
                keyExtractor={(item) => item._id}
                renderItem={renderMovieBanner}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(70),
        width: '100%',
    },
    posterImage: {
        width: responsiveWidth(100),
        height: '100%',
        justifyContent: 'flex-end',
    },
    linearGradient: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    posterPlayButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: responsiveWidth(2),
        width: responsiveWidth(25),
    },
    playText: {
        color: 'black',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginLeft: responsiveWidth(1.5)
    },
    myListButton: {
        alignItems: 'center',
    },
    myListText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginTop: responsiveHeight(0.5)
    },
    posterInfoButton: {
        alignItems: 'center',
    },
    infoButtonTxt: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginTop: responsiveHeight(0.5)
    },
    transparentButton: {
        position: 'absolute',
        top: responsiveHeight(6),
        right: responsiveWidth(3),
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        
    },
});

export default MovieBanner;