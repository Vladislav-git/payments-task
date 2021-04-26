import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import {useC, useUpdateC} from '../context/Context'
import axios from 'axios'

const Purchases = () => {

    const {context}:any = useC()
    const {updateData}:any = useUpdateC();

    const Buy = async() => {
        await Stripe.setOptionsAsync({
            publishableKey: 'pk_test_51IkNliKkNQOErIGphP8WOmqJbmxbGAmfg9BnL9nVzPVuUcAJ7OlBjIUrTtXvuoRPto5jg4DOj2tEqNSz4IkkLd48002tEApkEO', // Your key
            // androidPayMode: 'test', // [optional] used to set wallet environment (AndroidPay)
        });
        const res:any = await Stripe.paymentRequestWithCardFormAsync();
        console.log(res, 2)
        const response = await axios({
            method: 'post',
            data: {token: res.tokenId, product: context.purchases},
            url: 'http://192.168.31.181:8000/pay',
        })
        if (response.status === 200) {
            console.log('ok')
        } else {
            console.log('e')
        }
    }


    useEffect(() => {
        async() => {
            
            console.log(Stripe.stripeInitialized, 1)
    }}, [])

    

    return (
        <View style={styles.Container}>
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Welcome {context.familyName}{' '}{context.givenName}</Text>
                <Text style={styles.HeaderText}>Chose your product</Text>
            </View>

        
            <ScrollView style={{height: '50%'}}>
                <View style={styles.Product}>
                    <Text style={styles.ProductHeader}>{context.purchases.name}{' '}{context.purchases.price}</Text>
                    <TouchableOpacity style={styles.ProductButton} onPress={async() => await Buy()}>
                        <Text>Buy</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
    Content: {

    },
    GoogleButton: {

    },
    GoogleButtonText: {

    }
})

export default Purchases