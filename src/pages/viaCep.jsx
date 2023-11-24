import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import Button from "../components/button";
import InputText from "../components/inputText";
import { apiCep } from "../services/axios";

export const ViaCep = () => {
    const [data, setData] = useState({uf:'', ddd:'', cidade:'', bairro:'', rua:''})
    const [cep, setCep] = useState('');
    const [cepFound, setCepFound] = useState(false);

    const changeCep = (text) => {
        // colocar mascara
        setCep(text);
    }

    const fetchCep = async () => {
        const tempCep = cep.match( /\d+/g ).join('')
        if (tempCep.length !== 8) return setCepFound(false);
        try{
            const result = await apiCep.get(tempCep + '/json/');
            const obj = await result.data
            setData({...obj});
            if (obj.ddd.length > 0) setCepFound(true);
            else setCepFound(false)
        } catch(e) {
            console.log(e)
            setCepFound(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>  Buscar Cep  </Text>
            <View style={styles.resultContainer}> 
                <Text style={styles.texts}>UF: {data?.uf}</Text>
                <Text style={styles.texts}>DDD: {data?.ddd}</Text>
                <Text style={styles.texts}>Cidade: {data?.localidade}</Text>
                <Text style={styles.texts}>Bairro: {data?.bairro}</Text>
                <Text style={styles.texts}>Rua: {data?.logradouro}</Text>
            </View>
            <Text style={{fontSize: 16}}>Digite o CEP que deseja procurar: </Text>
            <InputText value={cep} placeHolder={'00000000'} onChangeText={(text) => changeCep(text)} type={'numeric'} max={8} adtStyle={styles.input} />

            <Button textStyleAlter={styles.textButton} StyleAlter={styles.button} onpress={() => fetchCep()} text={'Buscar'} color="blue" />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#EEF'
    },
    title: {
        fontSize: 28,
        marginBottom: 25,
        fontWeight: "700",
        textDecorationLine: 'underline'
    },
    texts: {
        fontSize: 18,
    },
    resultContainer: {
        width: '80%',
        backgroundColor: '#AAF',
        borderRadius: 8,
        paddingLeft: 10,
        paddingVertical: 8,
        marginBottom: 20,
    },
    input: {
        textAlign: 'center',
        borderWidth: 1
    },
    button: {
        backgroundColor: '#33F'
    },
    textButton: {
        fontSize: 18
    }
})