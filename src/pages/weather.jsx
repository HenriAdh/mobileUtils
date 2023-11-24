import { useEffect, useState } from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import Select from "../components/select";
import InputText from "../components/inputText";
import Button from "../components/button";
import { apiWeather } from '../services/axios'
import { Ionicons } from '@expo/vector-icons'

export const WeatherPage = () => {
    const url = '?unitGroup=metric&key=ACR62RQ5MMQA829ZFEPDT9MEX&contentType=json';
    const [city, setCity] = useState('');
    const [other, setOther] = useState('');
    const [result, setResult] = useState({});
    const [date, setDate] = useState('');
    const [day, setDay] = useState(true);

    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abriu', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    useEffect(() => {
        const dt = new Date();
        const day = days[dt.getDay()];
        const month = months[dt.getMonth()];
        const date = dt.getDate();
        const year = dt.getFullYear();
        const hour = dt.getHours();
        setDate(day + ', ' + date + ' de ' + month + ' de ' + year);
        setDay(hour < 18 && hour > 5);
    }, [])

    const handleFetchWeather = async (city) => {
        if (city === 'other') return setCity('other');
        setCity(city);
        try {
            const res = await apiWeather.get(
                city === 'other' ? other + url : city + url
            )
            const resData = await res.data;
            if (Object.keys(resData).length > 0) return setResult({ ...resData });
            return setResult({});
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={[Styles.container, day ? Styles.light : Styles.dark]}>
            <View style={[Styles.header, Styles.div]}>
                <Text style={[Styles.title, Styles[day ? 'lightText' : 'darkText']]}>Weather page</Text>
                <Select valueChange={(val) => handleFetchWeather(val)} placeHolder={'Escolha uma cidade'} adtStyle={Styles[day ? 'light' : 'dark']} textColor={day ? '#000' : '#FFF'}
                    options={[
                        { value: 'other', label: 'Outro...' },
                        { value: 'sorocaba', label: 'Sorocaba' },
                        { value: 'sao-paulo', label: 'São Paulo' },
                        { value: 'votorantim', label: 'Votorantim' },
                        { value: 'campinas', label: 'Campinas' },
                        { value: 'santo-andre', label: 'Santo André' }
                    ]}
                />
                {city === 'other' &&
                    <View style={Styles.other}>
                        <InputText adtStyle={Styles[day ? 'light' : 'dark']} placeHolder={'Cidade'} onChangeText={(text) => setOther(text)} value={other} />
                        <Button text={'Buscar'} onpress={() => handleFetchWeather(other)} color="yellow" />
                    </View>
                }
            </View>
            <View style={Styles.div}>
                {Object.keys(result).length > 0 &&
                    <View style={[Styles.infsContainer]}>
                        <View style={Styles.infsContainer}>
                            <Text style={Styles.infs}>
                                {
                                    <Ionicons size={50} color={day ? '#000' : '#FFF'} name={
                                        result.days[0].icon === 'rain' ? 'rainy'
                                            : result.days[0].icon === 'clear-day' ? 'sunny'
                                                : result.days[0].icon === 'snow' ? 'snow'
                                                    : result.days[0].icon === 'clear-night' ? 'moon'
                                                        : result.days[0].icon === 'partly-cloudy-day' ? 'partly-sunny'
                                                            : result.days[0].icon === 'partly-cloudy-night' ? 'cloudy-night'
                                                                : result.days[0].icon === 'cloudy' ? 'cloudy'
                                                                    : result.days[0].icon === 'wind' ? 'cloudy'
                                                                        : result.days[0].icon === 'fog' ? 'cloudy'
                                                                            : 'cloudy'}
                                    />
                                }
                            </Text>
                            <Text style={[Styles.infs, Styles.temp, Styles[day ? 'lightText' : 'darkText']]}>{result.currentConditions.temp}°C</Text>
                            <Text style={[Styles.date, Styles[day ? 'lightText' : 'darkText']]}>{date}</Text>

                        </View>
                    </View>
                }
            </View>
            <View style={Styles.div}>
                {Object.keys(result).length > 0 &&
                    (<View>
                        <View style={Styles.infsAdc}>
                            <Text style={[Styles.infs, Styles[day ? 'lightText' : 'darkText']]}>Temp Min: {result.days[0].tempmin}°C</Text>
                            <Text style={[Styles.infs, Styles[day ? 'lightText' : 'darkText']]}>Temp Máx: {result.days[0].tempmax}°C</Text>
                        </View>
                        <View style={Styles.infsAdc}>
                            <Text style={[Styles.infs, Styles[day ? 'lightText' : 'darkText']]}>Sens térm: {result.currentConditions.feelslike}°C</Text>
                            <Text style={[Styles.infs, Styles[day ? 'lightText' : 'darkText']]}>Humidade: {result.currentConditions.humidity}%</Text>
                            {/* <Text style={Styles.infs}>Clima: {result.days[0].description}</Text> */}
                            {/* https://codebeautify.org/jsonviewer */}
                        </View>
                    </View>)}
            </View>

        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    light: {
        backgroundColor: '#FFF',
    },
    lightText: {
        color: '#000'
    },
    dark: {
        backgroundColor: "#111",
    },
    darkText: {
        color: '#FFF'
    },
    title: {
        fontSize: 26,
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16
    },
    city: {
        fontSize: 16,
        marginTop: 15,
        borderBottomWidth: 2,
        marginBottom: 10
    },
    infsContainer: {
        gap: 5,
        width: '80%',
        alignItems: 'center'
    },
    infs: {
        fontSize: 16,
    },
    infsAdc: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        flexWrap: 'wrap'
    },
    date: {
        fontSize: 18
    },
    div: {
        width: '100%',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    other: {
        flex: 1,
        flexDirection: 'column',
    },
    temp: {
        fontSize: 60
    }
})