import React, { useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import { BottomNavigation, ActivityIndicator } from 'react-native-paper';
import List from "./src/Pages/Quadro/List";
import Form from './src/Pages/Quadro/Form';
import api from "./src/Services/Api" ;

const App = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'list', title: 'Listar', icon: 'palette' },
        { key: 'form', title: 'Criar', icon: 'pencil' },
    ]);
    const [quadros, onChangeQuadros] = React.useState([]);
    const [isLoading, onChangeIsLoading] = React.useState(true);

    useEffect(() => {
        Promise.all(
            [api.get('/products/getall')
        ]).then(
            (response)=> {
                onChangeQuadros(response[0].data.data)
                onChangeIsLoading(false)
            }
        )
    },[])

    const list = () => <List list={quadros}/>
    const form = () => <Form/>

    const renderScene = BottomNavigation.SceneMap({
        list,
        form
    });

    if (isLoading) {
        return <View style={[styles.container]}>
            <ActivityIndicator size="large" />
        </View>
    }

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black"
    },
});

export default App;

