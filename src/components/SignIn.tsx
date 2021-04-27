import React from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {useUpdateC} from '../context/Context'
import * as Google from 'expo-google-app-auth';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {Ru, En} from '../../localization'

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: En,
  ru: Ru,
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;


const SignIn = ({navigation}:any) => {

    const {updateData}:any = useUpdateC();

    const logIn = async () => {
        const result = await Google.logInAsync({
            androidClientId: '7827040613-v22eje7tjjptnnkn8ec1erl9lts7u0q1.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
        });
        if (result.type === 'success') {
            updateData(result.user)
            navigation.navigate('Main')
        } else {
            alert('try again')
        }
    }

    return (
        <View style={styles.Container}>
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>{i18n.t('signInHeaderText')}</Text>
            </View>

            <View style={styles.Content}>
                <TouchableOpacity style={styles.GoogleButton} onPress={async() => await logIn()}>
                    <View style={styles.IconWrapper}>
                        <FontAwesome style={styles.Icon} name="google" size={32} color="#02c71c" />
                    </View>
                    <Text style={styles.GoogleButtonText}>{i18n.t('googleButtonText')}</Text>
                </TouchableOpacity>
            </View>

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
    Content: {
        flex: 1.5,
        alignItems: 'center'
    },
    GoogleButton: {
        marginTop: '10%',
        height: Dimensions.get('screen').height * 0.075,
        width: Dimensions.get('screen').width * 0.6,
        flexDirection: 'row',
        borderWidth: 2,
        alignSelf: 'center',
        backgroundColor: '#2f78eb',
        borderColor: '#2f78eb'
    },
    IconWrapper: {
        width: '22%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    Icon: {
        alignSelf: 'center',
    },
    GoogleButtonText: {
        fontSize: 17,
        alignSelf: 'center',
        marginLeft: '5%',
        color: 'white'
    }
})

export default SignIn