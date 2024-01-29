import auth from '@react-native-firebase/auth';
import { createUserFormData } from '../../types';

export const createAccount = (data: createUserFormData) => {
    if(!data.email && !data.password) return;
    auth()
        .createUserWithEmailAndPassword(data.email, data.password)
        .then(() => {
            console.log("Usuário criado");
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('Este email não pode ser usado!');
            }
            if (error.code === 'auth/invalid-email') {
                throw new Error('Email invalido...')
            }
        })
}