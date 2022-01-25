import
    React, {
    Component
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
import api from "../../Services/Api";

const Quadro = ({data, reload}) => {
    const {
        nome,
        foto,
        id
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