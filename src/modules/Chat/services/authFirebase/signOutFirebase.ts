import auth from '@react-native-firebase/auth';

export const signOutFirebase = () => {
    auth()
        .signOut()
        .then(() => console.log('Usuário saiu com sucesso!'));
}