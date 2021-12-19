import React, {Component} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import isNull from "lodash/isNull";
import api from "../../Services/Api";

const Quadro = ({data, onPress}) => {
    const {
        nome,
        foto,
        id
    } = data

    const showConfirmDialog = () => {
        return Alert.alert(
            "Alerta",
            "Você tem certeza que deseja remover?",
            [
                {
                    text: "Sim",
                    onPress: async () => {
                        const response = await api.delete('/products/delete', {
                            headers: {'id': id}
                        });
                    },
                },
                {
                    text: "Não",
                },
            ]
        );
    };


    return(
        <View>
            <Text style={styles.nomeQuadro}>{nome} </Text>
            <TouchableHighlight
                onPress={showConfirmDialog}
        //        onPress={()=> alert(nome)}
        //        onLongPress={showConfirmDialog}
                delayLongPress={10000}
            >
                <Image style={styles.fotoQuadro} source={{
                    uri: isNull(foto)
                        ? "https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg/image"
                        : foto
                }}></Image>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    nomeQuadro:{
        color:'white',
        fontSize:22,
        fontWeight:'bold',
        justifyContent:'center',
        alignSelf:'center',
        marginTop: 30,
        marginBottom:20,

    },

    fotoQuadro:{
        width: 200,
        height:250,
        borderRadius:30,
        alignSelf:'center',
    }
})

export default Quadro;