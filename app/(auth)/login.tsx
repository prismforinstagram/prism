import {
  StyleSheet,
  Alert,
  ImageRequireSource,
  TouchableOpacity,
  useColorScheme,
} from 'react-native'
import { Text, View, TextInput } from '../../components/Themed'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Colors from '../../constants/Colors'
import { login } from '../../lib/api/auth'
import { useAuth } from '../../context/AuthContext'

// @ts-ignore
const ICON: ImageRequireSource = require('../../assets/images/icon.png')

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // @ts-ignore
  const { updateAuthToken } = useAuth()

  const onSignIn = async () => {
    router.replace('/')
    try {
      const res = await login(username, password);
      await updateAuthToken(res);
    } catch (e: any) {
      Alert.alert('Error', e.message)
    }
  }

  const colorScheme = useColorScheme()
  const invertedBackground =
    colorScheme === 'dark' ? Colors['light']['background'] : Colors['dark']['background']
  const invertedText = colorScheme === 'dark' ? Colors['light']['text'] : Colors['dark']['text']

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={ICON}
          style={styles.img}
          accessible={true}
          accessibilityIgnoresInvertColors
        />
        <Text style={styles.title}>Prism</Text>
      </View>
      <View>
        <View style={[styles.groupContent, { borderColor: invertedBackground }]}>
          <FontAwesome name="at" size={22} style={[styles.groupContentIcon, { color: invertedBackground }]} />
          <TextInput
            testID="loginUsernameInput"
            style={styles.textInput}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor={Colors[colorScheme ?? 'light'].text}
            autoCapitalize="none"
            autoFocus
            autoCorrect={false}
            autoComplete="username"
            returnKeyType="next"
            blurOnSubmit={false} // prevents flickering due to onSubmitEditing going to next field
          />
        </View>
        <View style={[styles.groupContent, { borderColor: invertedBackground }]}>
          <FontAwesome name="lock" size={22} style={[styles.groupContentIcon, { color: invertedBackground }]} />
          <TextInput
            testID="loginPasswordInput"
            style={styles.textInput}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor={Colors[colorScheme ?? 'light'].text}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            returnKeyType="done"
            enablesReturnKeyAutomatically={true}
            secureTextEntry={true}
            textContentType="password"
            clearButtonMode="while-editing"
          />
        </View>
        <View testID="signIn" style={styles.btnWrapper}>
          <TouchableOpacity
            disabled={false}
            activeOpacity={0.8}
            testID="signInButton"
            style={[styles.btn, { backgroundColor: invertedBackground }]}
            onPress={onSignIn}
          >
            <Text style={[styles.btnLabel, { color: invertedText }]}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  hero: {
    flex: 2,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  img: {
    width: 200,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  groupContent: {
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupContentIcon: {
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    letterSpacing: 0.25,
    fontWeight: '400',
    borderRadius: 10,
    borderWidth: 1,
  },
  btnWrapper: {
    paddingBottom: 20,
  },
  btn: {
    borderRadius: 6,
    paddingVertical: 16,
    marginHorizontal: 20,
  },
  btnLabel: {
    textAlign: 'center',
    fontSize: 18,
  },
})

export default Login
