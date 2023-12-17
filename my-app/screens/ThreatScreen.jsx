import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetThreat, setThreat } from '../store/threatSlice';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { axiosInstance } from '../api';

export default function ThreatScreen({ route, navigation }) {
    const handlePressThreats = () => {
        navigation.navigate('Список угроз');
    };

    const { id } = route.params;
    const dispatch = useDispatch();
    const { threat } = useSelector((state) => state.threat);
    useEffect(() => {
        async function getThreatById() {
            console.log(id)
            await axiosInstance.get(`/threats/${id}`).then((response) => {
                dispatch(setThreat(response?.data));
                console.log(threat)}).catch((err) => {console.log(err)})
        }
        getThreatById();
        // return () => {
        //     dispatch(resetThreat());
        // };
    }, [dispatch]);

    const newHost = "192.168.0.106";

    return (
    <ScrollView>
        <View style={styles.page}>
                <View>
                    <Text style={styles.breadcrumb} onPress={handlePressThreats}>Список угроз</Text>
                        <Text style={styles.textGreen} onPress={handlePressThreats}>
                        { " / " + threat.name}
                    </Text> 
                </View>
            {threat != null &&  threat.name != "" && threat.image != undefined &&
            <View style={{margin: 15}}>
                <View>
                    <Image style={styles.image} source={{ uri: `${threat.image.replace("localhost", newHost)}` }}/>
                    <View>                
                        <Text style={styles.textTitle}>{threat.name}</Text>
                        <Text style={styles.text}> {threat.description}</Text>
                        <View>
                            <Text style={styles.textTitle}>Статистика</Text>
                                <Text style={styles.text}>
                    Количество обнаружений за последний год: {threat.count}
                                </Text>
                                <Text style={styles.text}>
                    Средняя цена мониторинга(месяц): {threat.price} руб
                                </Text>
                        </View>
                    </View>
                </View>
            </View> }
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2a2a',
    },
    text: { color: '#f0f0f0', fontSize: 16 },
    textGreen: {color : '#00A88E'},
    textTitle: { color: '#f0f0f0', fontSize: 18 , marginTop: 10, marginBottom: 10},
    breadcrumb: { color: '#f0f0f0', fontSize: 16 },
    image: { height: 320, alignSelf: 'stretch' },
});