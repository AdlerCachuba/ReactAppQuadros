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
        { key: 'form', title: 'Formulário', icon: 'pencil' },
    ]);
    const [quadros, onChangeQuadros] = React.useState([]);
    const [isLoading, onChangeIsLoading] = React.useState(true);
    const [id, onChangeId] = React.useState("0");

    useEffect(() => {
        onChangeId('0')
        Promise.all(
            [api.get('/products/getall')
        ]).then(
            (response)=> {
                onChangeQuadros(response[0].data.data)
                onChangeIsLoading(false)
            }
        )
    },[ isLoading ])



    // criar uma função para alterar index do bottom navigation bar e passar por parametro para List -> quadro e deve ser chamada no onpressed
    const onEdit = (id) => {
        setIndex(1);
        onChangeId(id.toString());
    }

    const reload = () => {
        onChangeIsLoading(true)
    }

    const list = () => <List list={quadros} reload={reload} onEdit={onEdit}/>
    const form = () => <Form isCreate={id === "0"} id={id} />

    const renderScene = BottomNavigation.SceneMap({
        list,
        form
    });

    if (isLoading) {
        return <View style={[styles.container]}>
            <ActivityIndicator size="large"/>
        </View>
    }

    const changePage = (valor) => {
        if(index === 0 && id !== '0') {
            onChangeId('0')
        }
        if(index !== 0) {
            reload()
        }
        setIndex(valor)
    }


    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={changePage}
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

