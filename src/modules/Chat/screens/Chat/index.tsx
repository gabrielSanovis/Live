import React, { useEffect, useReducer, useRef } from 'react';
import { TextInput } from "react-native";
import { formatTime } from '../../utils/formatTime';
import { saveNewMessage } from '../../services/firestore/saveDatas';
import { realTimeMessages } from '../../services/firestore/getDatas';
import * as S from './styles'
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import perf from '@react-native-firebase/perf';

interface InitialArg {
    chatHistoric: Array<{ date: string, text: string, from: string | undefined | null }>;
    newText: null | { date: string, text: string };
}

export interface ActionReducerChat { type: "add_new_text_in_historc" | 'add_new_historc', payload: Partial<InitialArg> }

const initialArg: InitialArg = {
    chatHistoric: [],
    newText: null,
}

interface ITextInput extends TextInput {
    value: string
}

const reducer = (state: InitialArg, action: ActionReducerChat) => {
    switch (action.type) {
        case 'add_new_text_in_historc': {
            return {
                ...state,
                chatHistoric: [...state.chatHistoric, action.payload.newText]
            } as InitialArg
        }
        case 'add_new_historc': {
            return {
                chatHistoric: action.payload.chatHistoric
            } as InitialArg
        }
    }
    throw new Error('Unknow action: ' + action.type);
}

const HandleInputText = async (value: string | null, dispatch: React.Dispatch<ActionReducerChat>, ref: React.RefObject<ITextInput> | null) => {
    const trace = await perf().startTrace('handle_input_text');
    if (!value) {
        trace.putMetric('textLenght', value?.length || 0);
        await trace.stop()
        return;
    };
    if (typeof value === 'string') {
        crashlytics().log("mensagem enviada")
        trace.putAttribute('text', value.length < 100 ? value : value.slice(0, 99));
        trace.putMetric('textLenght', value.length);
        const date = new Date();
        saveNewMessage({ text: value, date: formatTime(date) })
        ref?.current?.clear();
        validateRef(ref, "")
    }
    await trace.stop();
}

const validateRef = (ref: React.RefObject<ITextInput> | null, value: string) => {
    if (!ref) return;
    if (!!ref.current) {
        return ref.current.value = value
    }
}

export const Chat = () => {
    async function screenTrace() {
        // Define & start a screen trace
        try {
            const trace = await perf().startScreenTrace('ChatScreen');
            // Stop the trace
            await trace.stop();
        } catch (e) {
            // rejects if iOS or (Android == 8 || Android == 8.1)
            // or if hardware acceleration is off
        }
    }
    screenTrace()
    const [state, dispatch] = useReducer(reducer, initialArg)
    let inputRef = useRef<ITextInput>(null);
    const user = auth().currentUser?.email

    useEffect(() => {
        crashlytics().log("tela montada")
        realTimeMessages(dispatch);
    }, [])

    return (
        <S.Container>
            <S.List
                data={state.chatHistoric}
                renderItem={({ item, index }) => (
                    <S.WrapperTextChat key={index} outside={user !== item.from}>
                        <S.TextChat>{item.text}</S.TextChat>
                        <S.TextDate>{item.date}</S.TextDate>
                    </S.WrapperTextChat>
                )}
                inverted
            />
            <S.WrapperTools>
                <S.Input
                    ref={inputRef}
                    placeholder='Escreva algo...'
                    onChangeText={(value) => validateRef(inputRef, value)}
                    multiline={true}
                />
                <S.SendButton onPress={() => HandleInputText(inputRef?.current?.value ?? "", dispatch, inputRef)}>
                    <S.SendTextButton>Enviar</S.SendTextButton>
                </S.SendButton>
                <S.SendButton onPress={() => {
                    crashlytics().log("testar falha")
                    crashlytics().crash()
                }}>
                    <S.SendTextButton>crash</S.SendTextButton>
                </S.SendButton>
            </S.WrapperTools>
        </S.Container>
    );
}