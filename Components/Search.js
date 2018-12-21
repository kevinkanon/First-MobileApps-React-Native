// Components/Search.js
import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'; 

class Search extends React.Component {

    constructor(props) {
        super(props);  
        this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state, car il modifie pas l'aafichage de notre component
        this.state = { 
            films: [],
            isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche 
        }     
    }
    
    // appel de la fonction permettant l'appel à l'API  
    _loadFilms() {
        //console.log(this.state.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            this.setState({ isLoading: true }) // Lancement du chargement
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ 
                    films: data.results,
                    isLoading: false // Arrêt du chargement 
                })
            })
        }
    }
    // hydratation de la valeur du text saisie en temps réel dans le Input
    _searchTextInputChanged(text) { this.searchedText = text; }

    _displayLoading() {
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
              <ActivityIndicator size='large' />
              {/* Le component ActivityIndicator affiche un icon loader de chargement pr l'expereince utilisateur */}
            </View>
          )
        }
      }

    render() {
        //console.log("RENDER")
        console.log(this.state.isLoading)
        return (
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            <View style={styles.main_container}>
                <TextInput 
                    style={[styles.textinput, { marginBottom:10 }]} 
                    placeholder='titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadFilms()}   //Validation de la recherche avec le clavier mobile === fonction définie sur le button onPress == onSubmitEditing
                />
                <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._loadFilms()}/>
                
                <FlatList   //Flatlist permet de crée une liste d'objets
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                 />
                 
                 {this._displayLoading()}
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
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
  })

export default Search;