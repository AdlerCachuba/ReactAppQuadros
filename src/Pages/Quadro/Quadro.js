import React, {Component} from "react";
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import isNull from "lodash/isNull";

const Quadro = ({data, onPress}) => {
    const {
        nome,
        foto,
    } = data

    return(
        <View>
            <Text style={styles.nomeQuadro}>{nome} </Text>
            <TouchableOpacity onPress={()=> alert(nome)}>
                <Image style={styles.fotoQuadro} source={{
                    uri: isNull(foto)
                        ? "https://www.buritama.sp.leg.br/imagens/parlamentares-2013-2016/sem-foto.jpg/image"
                        : foto
                }}></Image>
            </TouchableOpacity>
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