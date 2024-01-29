import auth from "@react-native-firebase/auth"
import { loginUserFormData } from "../../screens/SignIn"


export const signInAccount = (data: loginUserFormData) => {
    if(!data.email && !data.password) return;
    auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then(() => {
            console.log('Você entrou, parabéns')
        })
        .catch(error => {
            if(error.code === 'auth/invalid-credential') {
                console.log("Credencial Invalida!")
            }
        })
}