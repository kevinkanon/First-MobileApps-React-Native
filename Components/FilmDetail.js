// Components/FilmDetail.js

import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getFilmDetailFromApi, getImageFromApi  } from '../API/TMDBApi';
import moment from 'moment';        //  libraririe pour formater la date
import numeral from 'numeral';      //  librairie js pour mabipuler et formater les numbers
import { connect } from 'react-redux'; // sert à connecter le store à notre component FilmDetail.
  
class FilmDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            film: undefined, // Pour l'instant on n'a pas les infos du film, on initialise donc le film à undefined.
            isLoading: true // A l'ouverture de la vue, on affiche le chargement, le temps de récupérer le détail du film
        }
    }

    /* 
        React native fonction qui s'exécute directement après le render() du component dans son cycle de vie
        ici on récupère les infos du film notemment son id depuis l'API. Et on arrête le ActivityIndicator
    */
    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({ film: data, isLoading: false })
        })
    }

    /*
        React native fonction qui s'exécute directement après un update des données du component FilmDetails
        FilmDetail envoie les données de l'action à Redux -> Store -> reducer ... 
        FilmDetail la liste des nouveaux films du store, la mappe à ses props et lance le cycle de vie updating pour se re-rendre.
    */
    componentDidUpdate() {
        /*console.log("componentDidUpdate : ");
        console.log(this.props.favoritesFilm);*/
    }
    

    _displayLoading() {
    if (this.state.isLoading) {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' />
            </View>
            )
        }
    }

    //console.log(this.state.film);
    _displayFilm() {
        const { film } = this.state;
        if (film != undefined) {
          return (
            <ScrollView style={styles.scrollview_container}>
                <Image style={styles.image} source={{uri: getImageFromApi(film.backdrop_path)}}/>

                <Text style={styles.title_text}>{film.title}</Text>
                {/* Déclenchement fonction lié à Redux */}
                <TouchableOpacity style={styles.favorite_container} onPress={() => this._toggleFavorite()}>        
                    {this._displayFavoriteImage()} 
                </TouchableOpacity>

                <Text style={styles.description_text}>{film.overview}</Text>
                <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                    return genre.name;
                    }).join(" / ")}
                </Text>
                <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                    return company.name;
                    }).join(" / ")}
                </Text>
            </ScrollView>
          )
        }
    }

    _displayFavoriteImage() {
        var sourceImage = require('../Images/unfavorite_film.png');
        //findIndex en Javascript retourne l'index de l'élément dans le tableau s'il existe, sinon elle renvoie -1.
        if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) { // Film dans nos favoris si l'id du film du state = l'id du film courant
            sourceImage = require('../Images/favorite_film.png')
        }
        return ( <Image style={styles.favorite_image} source={sourceImage}/> )
    }

    // action déclenchée par l'utilisateur qui activera Redux qui transmettra les infos de l'action au -> store -> reducer -> view .. qui fera re rendre le component filmdetais. 
    _toggleFavorite() {
        const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
        this.props.dispatch(action);
    }

    render() {
        //console.log(this.props);
        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
            )
        }
    }

const styles = StyleSheet.create({
    main_container: { flex: 1 },
    loading_container: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
    scrollview_container: { flex: 1 },
    image: { height: 169, margin: 5 },
    title_text: { fontWeight: 'bold', fontSize: 35, flex: 1, flexWrap: 'wrap', marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10, color: '#000000', textAlign: 'center' },
    description_text: { fontStyle: 'italic', color: '#666666', margin: 5,  marginBottom: 15 },
    default_text: { marginLeft: 5, marginRight: 5, marginTop: 5, },
    favorite_container: { alignItems: 'center' },
    favorite_image: { width: 40, height: 40 }
})

/* 
    fonction native de redux const mapStateToProps = (state) => { return state } retourne tout le state de l'applicatiopn qui ne nous interesse pas 
    on veut juste le state lié au film favoris 
    voir fonction ci dessous
    les info du state global de Redux sont mappé aux Props du component FilmDetails
*/
const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail); //Store connecté le store à notre component FilmDetail.
