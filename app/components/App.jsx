import React from 'react';
import { Navigator} from 'react-onsenui';
import MainPage from './MainPage';

const App = () => {
    const renderPage = (route, navigator) => {
        return <route.component key={route.key} navigator={navigator} {...route.props} />
    };

    return (
        <Navigator
            renderPage={renderPage}
            initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
        />
    );
};
export default App;
