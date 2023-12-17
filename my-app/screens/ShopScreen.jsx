import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import {setSearchValue} from '../store/filterSlice'
import { setThreats } from '../store/threatSlice';
import DeviceCard from '../components/DeviceCard';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ShopScreen({ navigation }) {
    const dispatch = useDispatch();
    const { threats } = useSelector((state) => state.threat);
    const { lowPrice, highPrice, searchValue } = useSelector((state) => state.filter);

    useEffect(() => {
        async function getAllThreats() {
            console.log(11111111)
            await axiosInstance.get(`/threats?query=${searchValue}&lowPrice=${lowPrice}&highPrice=${highPrice}`).then((response) =>  dispatch(setThreats(response?.data)))}
        getAllThreats();
    }, [dispatch, searchValue]);

    const onTextChange = (text) => {
        dispatch(setSearchValue(text));
        console.log(searchValue)
    };

    return (
        <ScrollView>
            <View style={styles.page}>
                <Breadcrumbs pages={[]} navigation={navigation}/>
                <TextInput
                    style={styles.input}
                    onChangeText={onTextChange}
                    value={searchValue}
                />
                {!!threats &&
                    threats.map((threat) => <DeviceCard key={threat.threatId} {...threat} navigation={navigation} />)}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
    input: {
        height: 40,
        margin: 8,
        width: 320,
        padding: 10,
        color: 'white',
        borderWidth: 1,
        backgroundColor: '#303030',
        borderRadius: 8,
        borderWidth: 0, 
    }
});