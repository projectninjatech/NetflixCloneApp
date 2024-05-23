import { View, Text, TextInput, StatusBar, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { getAllShows } from '../api/showsList';
import { showsSearchAPI } from '../api/ShowsSearchAPI';
import SearchShowList from '../components/SearchShowList';
import DeviceInfo from 'react-native-device-info';

// Shows search screen
export default function ShowsSearchScreen() {

    const [searchText, setSearchText] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [showsList, setShowsList] = React.useState([])
    const [isTablet, setIsTablet] = React.useState(false)

    React.useEffect(() => {
        const apiCall = async () => {
            const shows = await getAllShows();
            setShowsList(shows)
            if (DeviceInfo.getDeviceType() === "Tablet") {
                setIsTablet(true)
            }
        }

        apiCall();
    }, [])

    const handleSearch = async (text) => {
        setSearchText(text);
        if (text.length > 2) {
            const results = await showsSearchAPI(text);
            setSearchResults(results);
            // Handle the search results as needed
            console.log('Search Results:', searchResults);
        } else {
            // Clear the search results or handle accordingly
            setSearchResults([]);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#888"
                        style={styles.searchInput}
                        onChangeText={handleSearch}
                        value={searchText}
                    />
                    <Icon name="search1" size={20} color="#888" style={styles.searchIcon} />
                </View>
                {searchResults.length > 0 ? (
                    <SearchShowList data={searchResults} />
                ) : (
                    <View>
                        <Text style={styles.allShowsLabel}>All Shows</Text>
                        <SearchShowList data={showsList} isTablet={isTablet}/>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 60,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#333',
        alignSelf: 'center',
        width: '90%', // 80% of the parent container
    },

    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    searchIcon: {
        marginLeft: 10,
    },

    allShowsLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10, 
        marginHorizontal: 20,
    }
})