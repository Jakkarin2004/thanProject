import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text ,Alert} from 'react-native';
import { firebase } from '../database/firebaseDb';
import { ThemeProvider, Button, Input, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import RNPickerSelect from 'react-native-picker-select';
import { CheckBox } from 'react-native-elements';

const UserDetailScreen = ({ route, navigation }) => {
    const [name_song, setNameSong] = useState('');
    const [artist, setArtist] = useState('');
    const [band, setBand] = useState('');
    const [Year_published, setYearPublished] = useState('');
    const [link, setLink] = useState('');
    const [detail, setDetail] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);
    const [numberViews, setNumberViews] = useState('');
    const [topLike, setTopLike] = useState('');

    useEffect(() => {
        const dbRef = firebase.firestore().collection('react-native-crud').doc(route.params.userKey);
        dbRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                setNameSong(user.name_song);
                setArtist(user.artist);
                setBand(user.band);
                setYearPublished(user.Year_published);
                setLink(user.link);
                setDetail(user.detail);
                setNumberViews(user.numberViews);
                setTopLike(user.topLike);
                setData(user.data);
                setIsLoading(false);
            } else {
                console.log('Document does not exist!');
            }
        })
    }, []);

    const inputValueUpdate = (val, prop) => {
        switch(prop) {
            case 'name_song':
                setNameSong(val !== '' ? val : null);
                break;
            case 'artist':
                setArtist(val !== '' ? val : null);
                break;
            case 'Year_published':
                setYearPublished(val !== '' ? val : null);
                break;
            case 'band':
                setBand(val !== '' ? val : null);
                break;
            case 'detail':
                setDetail(val !== '' ? val : null);
                break;
            case 'link':
                setLink(val !== '' ? val : null);
                break;
            case 'numberViews':
                setNumberViews(val !== '' ? val : null);
                break;
            case 'topLike':
                setTopLike(val !== '' ? val : null);
                break;
            default:
                break;
        }
    }

    const handleCheck1 = () => {
        setIsSelected1(true);
        setIsSelected2(false);
        setYearPublished('ชาย');
    };

    const handleCheck2 = () => {
        setIsSelected1(false);
        setIsSelected2(true);
        setYearPublished('หญิง');
    };

    const updateUser = () => {
        setIsLoading(true);

        // เช็คค่า numberViews และ topLike ว่าไม่ใช่ undefined หรือไม่
        const updatedData = [];
        if (typeof numberViews !== 'undefined' && typeof topLike !== 'undefined') {
            updatedData.push(numberViews, topLike);
        }

        const updateDBRef = firebase.firestore().collection('react-native-crud').doc(route.params.userKey);
        updateDBRef.set({
            name_song: name_song || '',
            artist: artist || '',
            band: band || '',
            Year_published: Year_published || '',
            detail: detail || '',
            link: link || '',
            data: data || [],  // ส่งค่า data ที่เช็คค่าไม่ใช่ undefined เพื่อเขียนลงใน Firestore
            numberViews: numberViews || null,
            topLike: topLike || null,
        }).then(() => {
            setNameSong('');
            setArtist('');
            setBand('');
            setYearPublished('');
            setDetail('');
            setLink('');
            setNumberViews('');
            setTopLike('');
            setIsLoading(false);
            navigation.navigate('UserScreen');
        })
        .catch((err) => {
            console.error('Error:', err),
            setIsLoading(false);
        });
    }

    const deleteUser = () => {
        const dbRef = firebase.firestore().collection('react-native-crud').doc(route.params.userKey);
        dbRef.delete().then(() => {
            console.log("Item removed from database");
            navigation.navigate('UserScreen');
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const openTwoButtonAlert = () => {
        Alert.alert(
            'Delete User',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => deleteUser()},
                {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'}
            ],
            {
                cancelable: true
            }
        );
    }

    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        )
    }

    const placeholder = {
        label: band,
        value: null,
    };

    const options = [
        { label: 'Rock', value: 'Rock' },
        { label: 'Pop', value: 'Pop' },
        { label: 'Electronic', value: 'Electronic' },
        { label: 'Indie', value: 'Indie' },
        { label: 'R&B', value: 'R&B' },
        { label: 'Metal', value: 'Metal' },
        { label: 'Country', value: 'Country' },
        { label: 'Jazz', value: 'Jazz' },
        { label: 'Classical', value: 'Classical' },
        { label: 'Hip Hop', value: 'Hip Hop' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    source={{ uri: link }}
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                    containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
                <Text>ชื่อเพลง :</Text>
                <Input
                    placeholder={'ชื่อเพลง'}
                    value={name_song}
                    onChangeText={(val) => inputValueUpdate(val, 'name_song')}
                />
                <Text>ชื่อผู้แต่ง :</Text>
                <Input
                    placeholder={'ชื่อผู้แต่ง'}
                    value={artist}
                    onChangeText={(val) => inputValueUpdate(val, 'artist')}
                />
                <Text>เพศ :</Text>
                <Input
                    placeholder={'เพศ'}
                    value={Year_published}
                    onChangeText={(val) => inputValueUpdate(val, 'Year_published')}
                />
                <CheckBox
                    checked={isSelected1}
                    onPress={handleCheck1}
                    title={"ชาย"}
                />
                <CheckBox
                    checked={isSelected2}
                    onPress={handleCheck2}
                    title={"หญิง"}
                />
                <Text>วงดนตรี :</Text>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={options}
                    onValueChange={(val) => inputValueUpdate(val, 'band')}
                    value={band}
                    style={pickerSelectStyles}
                />
                <Text>รายละเอียด :</Text>
                <Input
                    placeholder={'รายละเอียด'}
                    value={detail}
                    onChangeText={(val) => inputValueUpdate(val, 'detail')}
                />
                <Text>Link รูปภาพ :</Text>
                <Input
                    placeholder={'link'}
                    value={link}
                    onChangeText={(val) => inputValueUpdate(val, 'link')}
                />

                <Text>ยอดวิว :</Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name='mobile'
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  ยอดวิว'}
                    value={numberViews || data[0]}
                    onChangeText={(val) => inputValueUpdate(val, 'numberViews')}
                />
                <Text></Text>
                <Text>ยอดไลค์ : </Text>
                <Input 
                    leftIcon={
                        <Icon 
                            name='mobile'
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  ยอดไลค์'}
                    value={topLike || data[1]}
                    onChangeText={(val) => inputValueUpdate(val, 'topLike')}
                />

                <Button
                    icon={
                        <Icon
                            name="wrench"
                            size={15}
                            color="#fff"
                        />
                    }
                    title='  แก้ไข'
                    onPress={updateUser}
                />
                <Button
                    icon={
                        <Icon
                            name="trash"
                            size={15}
                            color="#fff"
                        />
                    }
                    title='  ลบข้อมูล'
                    containerStyle={{
                        marginTop: 10
                    }}
                    buttonStyle={{
                        backgroundColor: "red"
                    }}
                    onPress={openTwoButtonAlert}
                />
            </ScrollView>
        </View>
    )
}

const theme = {
    Button: {
        raised: true
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        overflowY: 'scroll',
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    selectedText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default UserDetailScreen;
