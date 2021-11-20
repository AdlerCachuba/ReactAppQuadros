import React, {Component} from "react";
import {View,Text,Image,StyleSheet, TouchableOpacity} from 'react-native';

export default class Quadro extends Component{
    render(){
        return(
            <View>
                <Text style={styles.nomeQuadro}>{this.props.data.nome} </Text>
                {/*função anonima que ao clicque faz a ação*/}
                <TouchableOpacity onPress={()=> alert(this.props.data.nome)}>
                    <Image style={styles.fotoQuadro} source={{uri: this.props.data.foto}}></Image>
                </TouchableOpacity>
            </View>
        )
    }
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