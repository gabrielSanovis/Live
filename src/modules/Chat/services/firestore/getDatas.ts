import firestore from '@react-native-firebase/firestore';
import { ActionReducerChat } from '../../screens/Chat';

export const realTimeMessages = (dispatch: React.Dispatch<ActionReducerChat>) => {
    firestore().collection('Messages').onSnapshot((querySnapshot) => {
        const messages: Array<{text: string, date: string}> = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            messages.push({text: data.text, date: data.date})
            messages.sort((a, b) => {
                if(a.date < b.date) {
                    return 1;
                }
                if(a.date > b.date) {
                    return -1;
                }
                return 0;
            })
            dispatch({
                type: "add_new_historc",
                payload: {
                    chatHistoric: messages
                }
            })
        })
    })
}