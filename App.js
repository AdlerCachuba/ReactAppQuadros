import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import api from './src/Services/Api';
import Quadro from "./src/Pages/Quadro";
import { NativeText } from "react-native/Libraries/Text/TextNativeComponent";
import Form from "./src/Pages/Quadro/Form";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quadros: [
                // {
                //     id: "1",
                //     nome: "bbbbbb",
                //     foto: "https://scontent.fmgf8-1.fna.fbcdn.net/v/t1.6435-9/39580591_920128778171287_351232031646023680_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEtslleXyg-vBEIFcI8diD7tBwVRNnNzXS0HBVE2c3NdGuBhwmjrmAEVyAfwRfV3RuxNR3W1ARUY_nXyO2le1Fb&_nc_ohc=RMm_vTUz7UUAX-auyx2&_nc_ht=scontent.fmgf8-1.fna&oh=12e37576ba87279818b6c35b594eb911&oe=61BBA8DC",
                // }
            ]
        }
    }

    // toda vez que o app for montado vai ser executado abaixo
    // async componentDidMount() {
    //     const response = await api.get('/products/getall');
    //     this.setState({
    //         quadros: response.data.data
    //     });
    // }

    render() {
        return (
            <SafeAreaView style = { styles.container } >
                <Form
                    isCreate={false}
                    id={"1"}
                />
                {/*<FlatList*/}
                {/*    //recebe a lista de quadros*/}
                {/*    data = { this.state.quadros }*/}
                {/*    // o key extractor vai pegar o id, que é string e precisa ser string*/}
                {/*    keyExtractor = { item => item.id }*/}
                {/*    renderItem = {*/}
                {/*        ({ item }) => <Quadro data = { item }/>*/}
                {/*    }*/}
                {/*>*/}
                {/*</FlatList>*/}
            </SafeAreaView>
            )
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'black',
        },
    }
);