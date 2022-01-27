import
    React, {
    Component, useEffect
} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    Alert
} from 'react-native';
import isNull from "lodash/isNull";
import api from "../services/Api";

const Quadro = ({data, reload, onEdit}) => {
    const {
        nome,
        foto,
        id,
        preco
    } = data

    const deleteById = () => {
        Promise.all(
            [
                api.delete(
                    '/products/delete',
                    {
                        headers: {'id': id}
                    }
                )
            ]
        ).then(
            (response)=> {
                reload()
            }
        )
    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Atenção!",
            "Você tem certeza que deseja remover?",
            [
                {
                    text: "Sim",
                    onPress: deleteById
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
            <Text style={styles.preco}>R${preco} </Text>
            <TouchableHighlight
                onLongPress={() => onEdit(id)}
                onPress={showConfirmDialog}
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
    },
    preco:{
        color:'white',
        fontSize:17,
        justifyContent:'center',
        alignSelf:'center',
        marginBottom:10,
    },
    fotoQuadro:{
        width: 200,
        height:250,
        borderRadius:30,
        alignSelf:'center',
    }
})

export default Quadro;