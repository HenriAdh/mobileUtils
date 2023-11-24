import { StyleSheet, Text, TouchableOpacity } from "react-native"

export default Button = ({ text, onpress, onLongPress, color='grey', textColor='white', StyleAlter, textStyleAlter }) => {
    return(
        <TouchableOpacity style={[Styles.button, Styles[color], StyleAlter]} onPress={()=>onpress()} onLongPress={()=>onLongPress()}>
            <Text style={[Styles.textButton, Styles[textColor], textStyleAlter]}>{text}</Text>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 5,
    },
    textButton: {
        color: '#FFF'
    },
    grey: {
        backgroundColor: '#AAA'
    },
    red: {
        backgroundColor: '#A00'
    },
    blue: {
        backgroundColor: '#00A'
    },
    green: {
        backgroundColor: '#0A0'
    },
    pink: {
        backgroundColor: '#A0A'
    },
    yellow: {
        backgroundColor: '#AA0'
    },
    LightBlue: {
        backgroundColor: '#0AA'
    },
    white: {
        color: '#FFF'
    },
    black: {
        color: '#000'
    }
})