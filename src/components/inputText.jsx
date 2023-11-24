import { StyleSheet, TextInput } from "react-native"

export default InputText = ({ placeHolder, onChangeText, value, type, max, adtStyle }) => {
    return(
        <TextInput
            value={value}
            style={[styles.textInput, adtStyle]} 
            placeholder={placeHolder} 
            onChangeText={text => onChangeText(text)} 
            keyboardType={type}
            maxLength={max}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: '80%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        marginBottom: 15,
        marginTop: 15
    }
})