import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import api from "../../Services/Api" ;
import Quadro from "./Quadro";

const List = () => {
    const [quadros, onChangeQuadros] = React.useState([]);

    useEffect(async () => {
        const response = await api.get('/products/getall');
        onChangeQuadros(response.data.data)
    });

    return (
        <SafeAreaView style = { styles.container } >
            <FlatList
                //recebe a lista de quadros
                data = { quadros }
                // o key extractor vai pegar o id, que é string e precisa ser string
                keyExtractor = { item => item.id }
                renderItem = {
                    ({ item }) => <Quadro data = { item }/>
                }
            >
            </FlatList>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default List;