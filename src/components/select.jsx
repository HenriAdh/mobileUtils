import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Select = ({ valueChange, options=[{label:'', value:''}], placeHolder='Escolha um...', textColor, adtStyle }) => {
    return(
        <RNPickerSelect
            placeholder={{label: placeHolder}}
            onValueChange={(value) => valueChange(value)}
            items={[...options]}
            style={{inputAndroid: [Styles.select, adtStyle, {color: textColor}]}}
        />
    )
}

const Styles = StyleSheet.create({
    select: {
        backgroundColor: '#FFF',
        width: '80%',
        alignSelf: 'center',
        marginVertical: 15
    }
})

export default Select;