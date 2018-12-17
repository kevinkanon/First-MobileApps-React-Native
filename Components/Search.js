// Components/Search.js
import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native';
import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';

class Search extends React.Component {
    render() {
        return (
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            <View style={styles.main_container}>
                <TextInput style={[styles.textinput, { marginBottom:10 }]} placeholder='titre du film'/>
                <Button style={{ height: 50 }} title='Rechercher' onPress={() => {}}/>
                <FlatList
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                 />
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        flex: 1,
        marginTop: 20
    },
    textinput: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    }
  })

export default Search;