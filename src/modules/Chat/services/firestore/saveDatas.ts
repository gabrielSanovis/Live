import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import perf from '@react-native-firebase/perf';

interface ISaveNewMessage {
    text: string,
    date: string
}
 
export const saveNewMessage = async ({text, date}: ISaveNewMessage) => {
    const metric = await perf().newHttpMetric("https://firebase.com/firestore", 'POST');
    console.log(JSON.stringify({text, date}));
    metric.putAttribute('messages', JSON.stringify({text: text.length < 100 ? text : text.slice(0, 37)+ '...', date}));
    await metric.start();
    firestore()
    .collection('Messages')
    .add({
        text: text,
        date: date,
        from: auth().currentUser?.email
    })
    .then(async () => {
        metric.setHttpResponseCode(200)
        await metric.stop();
        console.log("Sucesso!")
    })
}