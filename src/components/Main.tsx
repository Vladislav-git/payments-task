import React, {useState} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {useC, useUpdateC} from '../context/Context'

const testProduct = {
    price: '0.00$',
    name: 'some product',
}


const Main = ({navigation}:any) => {

    const {context}:any = useC()
    const {updateData}:any = useUpdateC();

    const [inPurchases, setInPurchases] = useState(false)

    const Purchase = () => {
        if (context.purchases != undefined) {
            updateData({...context, purchases: undefined})
            setInPurchases(false)
        } else {
            updateData({...context, purchases: {
                name: testProduct.name,
                price: testProduct.price
            }})
            setInPurchases(true)
        }
    }

    console.log(context)

    return (
        <View style={styles.Container}>
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Welcome {context.familyName}{' '}{context.givenName}</Text>
                <Text style={styles.HeaderText}>Chose your product</Text>
            </View>

        
            <ScrollView style={{height: '50%'}}>
                <View style={styles.Product}>
                    <Text style={styles.ProductHeader}>{testProduct.name}{' '}{testProduct.price}</Text>
                    <TouchableOpacity style={styles.ProductButton} onPress={() => Purchase()}>
                        <FontAwesome name="shopping-basket" size={20} color={inPurchases ? "#ff1c1c" : "#02c71c"} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            <TouchableOpacity style={styles.Nav} onPress={() => navigation.navigate('Purchases')}>
                <Text style={styles.NavT}>Go to purchases</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        backgroundColor: 'white'
    },
    Header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    HeaderText: {
        padding: 10,
        width: '90%',
        fontSize: 20,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor: '#25effa'
    },
    Product: {
        flex: 1,
        alignItems: 'center',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    ProductHeader: {
        marginLeft: '10%',
        fontSize: 18,
    },
    ProductButton: {
        marginLeft: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    ProductText: {
        fontSize: 17,
    },
    Nav: {
        alignSelf: 'center',
        backgroundColor: "#02c71c",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        height: '6%'
    },
    NavT: {
        fontWeight: 'bold',
        color: 'white'
    }
})

export default Main