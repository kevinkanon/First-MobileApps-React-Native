// Components/FilmList.js
/* 
component qui affiche la liste des films.
component custom, qui est ré-utilisé dans la vue recherche et dans la vue Favoris qui affiche la liste des films 
isolation de la liste de films dans ce component

ce n'est pas à notre liste de films de récupérer les films depuis l'API ou du store Redux.
Le component FilmList va recevoir des films de par ses props, les afficher et, au clic sur un film, naviguer vers son détail. 
*/
 
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import FilmItem from './FilmItem';
import { connect } from 'react-redux';

class FilmList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { films: [] }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display film " + idFilm)
        // On a récupéré les informations de la navigation, on peut afficher le détail du film
        this.props.navigation.navigate('FilmDetail', {idFilm: idFilm})
    }

    render() {
        return (
            <FlatList style={styles.list} data={this.props.films} keyExtractor={(item) => item.id.toString()} renderItem={({item}) => (
                <FilmItem
                    film={item}
                    isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false} // Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non
                    displayDetailForFilm={this._displayDetailForFilm}
                />
            )}
                onEndReachedThreshold={0.5}
                onEndReached={() => { 
                    // On appelle la méthode loadfilm du component Search pour charger plus de film
                    if (this.props.films.length > 0 && this.props.page < this.props.totalPages) { this.props.loadFilms() }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({ list: { flex: 1 } })

// On connecte le store Redux, ainsi que les films favoris du state de notre application, à notre component FilmList
const mapStateToProps = state => { 
    return { favoritesFilm: state.favoritesFilm } 
}

export default connect(mapStateToProps)(FilmList);