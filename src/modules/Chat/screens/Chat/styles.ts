import { FlatList, TextInput } from "react-native";
import { styled } from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding: 8px 16px;
`;

export const List = styled(FlatList<{ date: string, text: string }>)`
    width: 100%;
`;

export const WrapperTextChat = styled.View`
    border-radius: 10px;
    background-color: #023E8A;
    align-self: flex-end;
    justify-content: center;
    padding: 4px 6px;
    margin-bottom: 8px;
`;

export const TextChat = styled.Text`
    font-size: 16px;
    color: white;
    align-self: flex-start;
    margin-right: 30px;
`;

export const TextDate = styled.Text`
    font-size: 10px;
    color: #D9D9D9;
    font-weight: 700;
    align-self: flex-end;
`;

export const WrapperTools = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    column-gap: 16px;
`;

export const Input = styled(TextInput)`
    border-width: 1px;
    border-radius: 15px;
    flex: 1;
    padding: 8px 0px;
`;

export const SendButton = styled.TouchableOpacity`
    background-color: #023E8A;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 30px;
`;

export const SendTextButton = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 700;
`;