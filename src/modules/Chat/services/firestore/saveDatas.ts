import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface ISaveNewMessage {
    text: string,
    date: string
}
 
export const saveNewMessage = ({text, date}: ISaveNewMessage) => {
    firestore()
    .collection('Messages')
    .add({
        text: text,
        date: date,
        from: auth().currentUser?.email
    })
    .then((res) => {
        console.log("Resolved!")
    })
}