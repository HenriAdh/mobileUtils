import { StyleSheet, Text, View } from "react-native"
import { useState } from "react"
import InputText from "../components/inputText"
import Button from "../components/button"
import { apiPrice } from '../services/axios'

export const PricePage = () => {
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [ask, setAsk] = useState('');
    const [money, setMoney] = useState('');

    const handleFetchPrice = async () => {
        setMoney(value2);
        try {
            const result = await apiPrice.get(value1.toUpperCase() + '-' + value2.toUpperCase());
            const resAsk = await result.data[value1.toUpperCase() + value2.toUpperCase()].ask
            if (resAsk) return setAsk(resAsk);
            setAsk('Não encontrado.');
        } catch (e){
            console.log(e);
            setAsk('Não encontrado.')
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>  Valor da moeda  </Text>
            <Text style={styles.label}>Escolha as moedas desejadas:</Text>
            <View style={styles.inputFields}>
                <InputText adtStyle={styles.inputEdt} placeHolder={'Moeda 1'} onChangeText={(val) => setValue1(val)} />
                <Text style={styles.arrow}>{' ➡ '}</Text>
                <InputText adtStyle={styles.inputEdt} placeHolder={'Moeda 2'} onChangeText={(val) => setValue2(val)} />
            </View>
            <Text style={styles.ask}>Cotação atual: {ask} {money}</Text>
            <Button StyleAlter={styles.button} textStyleAlter={styles.textButton} text={'Calcular'} color="red" onpress={() => handleFetchPrice()} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#FEE'
    },
    title: {
        fontSize: 28,
        marginBottom: 25,
        fontWeight: "700",
        textDecorationLine: 'underline'
    },
    arrow: {
        fontSize: 18,
        width: '20%',
        textAlign: "center",
        textAlignVertical: 'center'
    },
    equal: {
        fontSize: 18
    },
    ask: {
        marginTop: 20,
        backgroundColor: '#FAA',
        padding: 10,
        borderRadius: 8,
        fontSize: 20,
        marginBottom: 20,
        width: '80%'
    },
    button: {
        backgroundColor: '#F33'
    },
    textButton: {
        fontSize: 16
    },
    label: {
        fontSize: 16
    },
    inputFields: {
        flexDirection: "row",
        width: '80%'
    },
    inputEdt: {
        width: "40%",
        borderWidth: 1,
        fontSize: 16
    }
})