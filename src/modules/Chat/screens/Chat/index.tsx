import React, { useEffect, useReducer, useRef } from 'react';
import { TextInput } from "react-native";
import { formatTime } from '../../utils/formatTime';
import { saveNewMessage } from '../../services/firestore/saveDatas';
import { realTimeMessages } from '../../services/firestore/getDatas';
import * as S from './styles'

interface InitialArg {
    chatHistoric: Array<{ date: string, text: string }>;
    newText: null | { date: string, text: string };
}

export interface ActionReducerChat { type: "add_new_text_in_historc" | 'add_new_historc', payload: Partial<InitialArg> }

const initialArg: InitialArg = {
    chatHistoric: [],
    newText: null
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

const HandleInputText = (value: string | null, dispatch: React.Dispatch<ActionReducerChat>, ref: React.RefObject<ITextInput> | null) => {
    if (!value) return;
    if (typeof value === 'string') {
        const date = new Date();
        saveNewMessage({ text: value, date: formatTime(date) })
        ref?.current?.clear();
        validateRef(ref, "")
    }
}

const validateRef = (ref: React.RefObject<ITextInput> | null, value: string) => {
    if (!ref) return;
    if (!!ref.current) {
        return ref.current.value = value
    }
}

export const Chat = () => {
    const [state, dispatch] = useReducer(reducer, initialArg)
    let inputRef = useRef<ITextInput>(null);

    useEffect(() => {
        realTimeMessages(dispatch);
    }, [])
    return (
        <S.Container>
            <S.List
                data={state.chatHistoric}
                renderItem={({ item, index }) => (
                    <S.WrapperTextChat key={index}>
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
            </S.WrapperTools>
        </S.Container>
    );
}