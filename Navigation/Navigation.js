// Navigation/Navigation.js

import { createStackNavigator, createAppContainer  } from 'react-navigation';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';

const SearchStackNavigator = createStackNavigator({
    // en ajoutant notre vue Search à notre StackNavigator, un objet Navigation se rajoute dans ses props (voir console log de Search)
    
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: { title: 'Rchercher' }
    },
    // Encore une fois j'ai mis le même nom que celui du component mais libre à moi de choisir un nom différent
    FilmDetail: { screen: FilmDetail }
});

export default createAppContainer(SearchStackNavigator);