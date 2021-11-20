import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import List from "./src/Pages/Quadro/List";
import Form from './src/Pages/Quadro/Form';

const ListRoute = () => <List/>;
// const ListRoute = () => <Text>Albums</Text>;

// const FormRoute = () => <Text>Albums</Text>;
const FormRoute = () => <Form/>;

const App = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'list', title: 'Listar', icon: 'palette' },
        { key: 'form', title: 'Criar', icon: 'pencil' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        list: ListRoute,
        form: FormRoute
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default App;
