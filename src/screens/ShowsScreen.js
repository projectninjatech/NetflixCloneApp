import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { getAllShows, getAllgenres } from '../api/showsList';
import { getAllShowsWatchtime } from '../api/userShowsWatchtimeAPI';
import ShowsBanner from '../components/ShowsBanner';
import ShowsContinueWatching from '../components/ShowsContinueWatching';
import { showsMyList } from '../api/mylistAPI';
import Showsmylist from '../components/Showsmylist';
import ShowCard from '../components/ShowCard';

export default function ShowsScreen() {
  const navigation = useNavigation();

  const [showsList, setShowsList] = React.useState([])
  const [userShowMylist, setuserShowMylist] = React.useState([])
  const [allGenres, setAllGenres] = React.useState([]);
  const [watchedShowlist, setWatchedShowlist] = React.useState([]);

  console.log("Show screen user show list", userShowMylist)
  React.useEffect(() => {
    const apiCall = async () => {
      const shows = await getAllShows();
      setShowsList(shows)
    }

    apiCall();
  }, [])

  React.useEffect(() => {
    const fetchedWatchedShows = async () => {
      const allWatchedShows = await getAllShowsWatchtime();
      setWatchedShowlist(allWatchedShows.watchedShows)
    };

    fetchedWatchedShows();

  }, [])


  React.useEffect(() => {
    const fetchAllGenres = async () => {
      // Fetch unique genres from your API
      const response = await getAllgenres()
      setAllGenres(response);
    };

    fetchAllGenres();
  }, []);

  console.log("All genres are", allGenres)

  React.useEffect(() => {
    const fetchShowsMylist = async () => {
      const userMylistShows = await showsMyList()
      setuserShowMylist(userMylistShows.showsInMyList)
    };

    fetchShowsMylist();

  }, [])


  const updateUserShowMylist = (newList) => {
    setuserShowMylist(newList);
  };


  const handleShowDetails = (show) => {
    // Navigate to show details screen or perform any action
    navigation.navigate('ShowDetails', { show });
  };


  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={styles.scrollView}>
        {showsList.length !== 0 && (<ShowsBanner showsList={showsList} ShowMylist={userShowMylist} updateUserShowMylist={updateUserShowMylist} />)}
        {watchedShowlist.length !== 0 && (<ShowsContinueWatching label={"Continue Watching"} allshowsList={showsList} />)}
        {userShowMylist.length != 0 && <Showsmylist label={"My list"} userShowMylist={userShowMylist} />}

        {allGenres.map((genre) => (
          <ShowCard key={genre} genre={genre} showsList={showsList} handleShowDetails={handleShowDetails} />
        ))}

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
    marginBottom: 20,
  },

})