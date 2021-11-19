import React from "react";
import { View, StyleSheet} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import api from "../../Services/Api";

const Form = ({isCreate = true}) => {
    const [name, onChangeName] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const [price, onChangePrice] = React.useState("");
    const [photoUrl, onChangePhotoUrl] = React.useState("");
    const [isLoading, onChangeIsLoading] = React.useState(false);

    const {
        input,
        title,
        button,
        container
    } = styles;

    const save = async () => {
        onChangeIsLoading(true);
        const response = await api.post('/products/insert', {
            name: name,
            description: description,
            price: parseFloat(price),
            sectionId: 1,
            photoUrl: photoUrl
        });
        onChangeIsLoading(false);
        if(response.data.status) {
            onChangeName("");
            onChangeDescription("");
            onChangePrice("");
            onChangePhotoUrl("");
        }
        console.warn(response);
    }

    const edit = async () => {
        onChangeIsLoading(true);
        const response = await api.post('/products/update', {
            name: name,
            description: description,
            price: parseFloat(price),
            sectionId: 1,
            photoUrl: photoUrl
        });
        onChangeIsLoading(false);
        if(response.data.status) {
            onChangeName("");
            onChangeDescription("");
            onChangePrice("");
            onChangePhotoUrl("");
        }
        console.warn(response);
    }

    return (
        <View style={container}>
            {
                isCreate
                    ? <Title style={title}>Novo Quadro</Title>
                    : <Title style={title}>Editar Quadro</Title>
            }
            <TextInput
                style={input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Nome"
                activeUnderlineColor="red"
            />
            <TextInput
                style={input}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="Descrição"
                activeUnderlineColor="red"
            />
            <TextInput
                style={input}
                onChangeText={onChangePrice}
                value={price}
                placeholder="Preço"
                keyboardType="numeric"
                activeUnderlineColor="red"
            />
            <TextInput
                style={input}
                onChangeText={onChangePhotoUrl}
                value={photoUrl}
                placeholder="Url da Imagem"
                activeUnderlineColor="red"
            />
            <Button
                mode="contained"
                onPress={() => save()}
                color='red'
                style={button}
                loading={isLoading}
            >Salvar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 12
    },
    title: {
        textAlign: 'center',
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        padding: 5,
        margin: 15
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }
});

export default Form;