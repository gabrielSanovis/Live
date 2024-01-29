import { TextInput } from "react-native";
import styled from "styled-components/native";

export const TextLabel = styled.Text`
    font-size: 14px;
    color: black;
    margin-bottom: 4px;
`;

export const Input = styled(TextInput)`
    border-width: 1px;
    border-radius: 15px;
    background-color: white;
    color: black;
    margin-bottom: 3px;
    padding: 4px 10px;
`;

export const TextError = styled.Text`
    font-size: 12px;
    color: #c92e2e;
    font-weight: 700;
`;