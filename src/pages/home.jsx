import { StyleSheet, Text, View } from "react-native"

export const HomePage = () => {
    return(
        <View style={Styles.container}>
            <Text>Home Page</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    }
})