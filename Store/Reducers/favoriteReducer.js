// Store/Reducers/favoriteReducer.js

const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id);
            if (favoriteFilmIndex !==-1) {  //findIndex en Javascript retourne l'index de l'élément dans le tableau s'il existe, sinon elle renvoie -1.
                /* Le film est déjà dans les favoris, on le supprime de la liste
                   On initialise un nouvel objet nextState avec une copie du state ...state pour garder l'immuabilité.
                   Puis, on redéfinit les films favoris de l'objet nextState avec un tableau qui correspond aux films favoris du state, auquel on a enlevé le film à l'index spécifié (fonction  filter ). 
                   Notre state reste inchangé et notre nextState  comprend les films favoris, moins le film passé via l'action.
                */
                nextState = { ...state, favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex) }
            }
            else {
                // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                nextState = { ...state, favoritesFilm: [...state.favoritesFilm, action.value] }
            }
            return nextState || state
    default:
        return state
    }
}

export default toggleFavorite;