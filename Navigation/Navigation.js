// Navigation/Navigation.js

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator ,createAppContainer  } from 'react-navigation';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import Favorites from '../Components/Favorites';

const SearchStackNavigator = createStackNavigator({
    // en ajoutant notre vue Search à notre StackNavigator, un objet Navigation se rajoute dans ses props (voir console log de Search)
    // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    Search: { screen: Search, navigationOptions: { title: 'Rechercher' } },
    // Encore une fois j'ai mis le même nom que celui du component mais libre à moi de choisir un nom différent
    FilmDetail: { screen: FilmDetail, navigationOptions: { title: 'Détails du film' } }
});


const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Favoris'
      }
    },
    FilmDetail: {
      screen: FilmDetail
    }
})

//combinaison de navigation avec intégration du StackNavigator dans le TabNavigator
const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { // On définit le rendu de nos icônes par les images 
                return <Image source={require('../Images/ic_search.png')} style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
                }
            }
        },
        Favorites: {
            screen: Favorites,
            navigationOptions: {
                tabBarIcon: () => {
                return <Image source={require('../Images/favorite_film.png')} style={styles.icon}/>
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: true, // affiche/masque les titres
            showIcon: true // affiche/masque icons
        }
    }
)
  
const styles = StyleSheet.create({
    icon: { width: 30, height: 30 }
})

//export default createAppContainer(SearchStackNavigator);
/* 
Le TabNavigator devient la navigation principale dans l'application. C'est donc ce nouveau component que l'on va exporter. 
En remplaçant SearchStackNavigator par MoviesTabNavigator dans l'export;
*/
export default createAppContainer(MoviesTabNavigator);

