import firestore from '@react-native-firebase/firestore';
import { ActionReducerChat } from '../../screens/Chat';
import { getTime } from '../../utils/getTime';

export const realTimeMessages = (dispatch: React.Dispatch<ActionReducerChat>) => {
    firestore().collection('Messages').orderBy('date', 'desc').onSnapshot((querySnapshot) => {
        const messages: Array<{text: string, date: string, from: string | undefined | null}> = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            messages.push({text: data.text, date: getTime(data.date), from: data.from})
            dispatch({
                type: "add_new_historc",
                payload: {
                    chatHistoric: messages
                }
            })
        })
    })
}