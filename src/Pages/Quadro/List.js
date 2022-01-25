import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import Quadro from "./Quadro";

const List = (props) => {
    const {
        list,
        reload,
        onEdit
    } = props

    return (
        <SafeAreaView style = { styles.container } >
            <FlatList
                data = { list }
                keyExtractor = { item => item.id }
                renderItem = {
                    ({ item }) => <Quadro data={ item } reload={reload} onEdit={onEdit}/>
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