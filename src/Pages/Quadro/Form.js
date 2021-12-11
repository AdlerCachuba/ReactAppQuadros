import React, { useEffect } from "react";
import { View, StyleSheet} from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import { Dropdown } from 'react-native-material-dropdown';
import api from "../../Services/Api";
import isEqual from "lodash/isEqual";

const  activeColor = '#6100ed';

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

        const response = await api.get('/select/selectsections');
        onChangeSectionList(response.data.data)
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
            sectionId: sectionId,
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
                label="Nome"
                style={input}
                onChangeText={onChangeName}
                value={name}
                activeUnderlineColor={activeColor}
            />
            <TextInput
                style={input}
                onChangeText={onChangeDescription}
                value={description}
                label="Descrição"
                activeUnderlineColor={activeColor}
            />
            <TextInput
                style={input}
                onChangeText={onChangePrice}
                value={price}
                label="Preço"
                keyboardType="numeric"
                activeUnderlineColor={activeColor}
            />
            <Dropdown
                label='Seção'
                data={sectionList}
                baseColor="#694fad"
                dropdownOffset={{top: 15, left: 50}}
                containerStyle={{
                    backgroundColor: 'white',
                    margin: 11,
                    padding: 10,
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4
                }}
                onChangeText={onChangeSectionId}
            />
            <TextInput
                style={input}
                onChangeText={onChangePhotoUrl}
                value={photoUrl}
                label="Url da Imagem"
                activeUnderlineColor={activeColor}
            />
            <Button
                mode="contained"
                onPress={() => isCreate
                    ? save()
                    : edit()
                }
                color='#6100ed'
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
        backgroundColor: 'black'
    }
});

export default Form;