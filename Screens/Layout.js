import { View, TextInput, StyleSheet } from 'react-native';
import globalStyle from '../Styles/Global';

const Layout = () => {
    
    return (
        <View style={styles.topContainer}>
           <TextInput value={tarea} style={styles.input}/>
        </View>
    )
}

export default Layout;

const styles = StyleSheet.create({
    topContainer: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    input: {
        padding: 4,
        backgroundColor: '#0303ef',
        fontSize: 14,
    },
    listContainer: {
        backgroundColor: '#0033ee',
        padding: 10,
    }
})