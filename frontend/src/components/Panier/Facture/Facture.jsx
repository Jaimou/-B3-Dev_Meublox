import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import meubloxLogo from './assets/meubloxLogo.png';


const Facture = (props) => {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#ffffff'
        },
        section: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
            padding: 10,
        },

        infos: {
            flexDirection: 'column',
            margin: 10,
            padding: 10,
        },

        image: {
            width: 100
        }
    })

    const order = props.order
    const userCart = props.userCart
    const deliveryAddress = props.deliveryAddress

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.image} alt='logo' src={meubloxLogo} />
                    <View style={styles.infos}>
                        <Text>Commande n° {order._id} </Text>
                        <Text>Adresse: </Text>
                        <Text>{deliveryAddress.adresse} - {deliveryAddress.ville} - {deliveryAddress.code_postal} </Text>
                    </View>
                </View>
                <View style={styles.section}>
                    {userCart.map((product) => {
                        return (
                            <Text>{product.nom} - quantité : {product.quantity} - Total : {product.quantity * product.prix}</Text>
                        )
                    })}
                </View>
            </Page>
        </Document>

    )
}


export default Facture;