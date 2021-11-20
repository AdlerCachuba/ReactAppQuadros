import React, { useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import api from "../../Services/Api";
import isEqual from "lodash/isEqual";

const Form = ({isCreate = true, id = "0"}) => {
    const [name, onChangeName] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const [price, onChangePrice] = React.useState("");
    const [photoUrl, onChangePhotoUrl] = React.useState("");
    const [isLoading, onChangeIsLoading] = React.useState(false);
    const [sectionList, onChangeSectionList] = React.useState([]);
    const [sectionId, onChangeSectionId] = React.useState();
    const [gotQuadro, onChangeGotQuadro] = React.useState(false);


    useEffect(async () => {
        if (!isCreate && !isEqual(id, "0") && !gotQuadro) {
            await getQuadro();
            onChangeGotQuadro(true);
        }
    });

    const getQuadro = async  () => {
        const response = await api.get(
            '/products/getbyid',
            {
                headers: {
                    'id': id
                }
            }
        );

        const {
            name,
            description,
            price,
            photoUrl,
            sectionId,
        } = response.data.data

        if(response.data.status) {
            onChangeName(name);
            onChangeDescription(description);
            onChangePrice(price.toString());
            onChangePhotoUrl(photoUrl);
            onChangeSectionId(sectionId);
        }
    }

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
        const response = await api.put('/products/update', {
            id: parseInt(id),
            name: name,
            description: description,
            price: parseFloat(price),
            sectionId: 1,
            photoUrl: photoUrl
        });
        onChangeIsLoading(false);
        // if(response.data.status) {
        //     onChangeName("");
        //     onChangeDescription("");
        //     onChangePrice("");
        //     onChangePhotoUrl("");
        // }
        console.warn(response);
    }

    const {
        input,
        title,
        button,
        container
    } = styles;

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
                onPress={() => isCreate
                    ? save()
                    : edit()
                }
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