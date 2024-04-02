import React, { useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ThemeProvider, Button, Text, Input, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { firebase } from '../database/firebaseDb';
import { CheckBox } from 'react-native-elements';

const AddUserScreen = ({ navigation }) => {
    const dbRef = firebase.firestore().collection('react-native-crud');
    const [name_song, setNameSong] = useState("");
    const [artist, setArtist] = useState("");
    const [Year_published, setYearPublished] = useState("");
    const [band, setBand] = useState("");
    const [detail, setDetail] = useState("");
    const [link, setLink] = useState("");
    const [data, setData] = useState(["", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [isSelected1, setIsSelected1] = useState(false);
    const [isSelected2, setIsSelected2] = useState(false);

    const inputValueUpdate = (val, prop) => {
        switch (prop) {
            case 'name_song':
                setNameSong(val);
                break;
            case 'artist':
                setArtist(val);
                break;
            case 'Year_published':
                setYearPublished(val);
                break;
            case 'band':
                setBand(val);
                break;
            case 'detail':
                setDetail(val);
                break;
            case 'link':
                setLink(val);
                break;
            case 'data':
                setData(val);
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

    const storeUser = () => {
        if (name_song === '') {
            alert('Fill at least the song name!');
        } else {
            setIsLoading(true);
            dbRef.add({
                name_song,
                artist,
                Year_published,
                band: selectedValue,
                detail,
                link,
                data
            }).then((res) => {
                setNameSong('');
                setArtist('');
                setYearPublished('');
                setBand('');
                setDetail('');
                setLink('');
                setData(["", ""]);
                setIsSelected1(false);
                setIsSelected2(false);
                setSelectedValue(null);
                setIsLoading(false);
                navigation.navigate('UserScreen');
            })
            .catch((err) => {
                console.log('Error found: ', err);
                setIsLoading(false);
            })
        }
    }

    if (isLoading) {
        return (
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
        )
    }

    const placeholder = {
        label: 'เลือก band',
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
                <Text>ชื่อเพลง :</Text>
                <Input
                    leftIcon={
                        <Icon
                            name='user-o'
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  ชื่อเพลง'}
                    value={name_song}
                    onChangeText={(val) => inputValueUpdate(val, 'name_song')}
                />
                <Text>ชื่อผู้แต่ง :</Text>
                <Input
                    leftIcon={
                        <Icon
                            name='envelope-o'
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  ชื่อผู้แต่ง'}
                    value={artist}
                    onChangeText={(val) => inputValueUpdate(val, 'artist')}
                />
                <Text>วงดนตรี :</Text>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={options}
                    onValueChange={(value) => setSelectedValue(value)}
                    value={selectedValue}
                    style={pickerSelectStyles}
                />
                <Text>เพศ :</Text>
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
                <Text>รายละเอียด :</Text>
                <Input
                    leftIcon={
                        <Icon
                            name='envelope-o'
                            size={20}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  รายละเอียด'}
                    value={detail}
                    onChangeText={(val) => inputValueUpdate(val, 'detail')}
                />
                <Image
                    source={{ uri: link }}
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                    containerStyle={{ marginLeft: 'auto', marginRight: 'auto' }}
                />
                <Text>Link รูปภาพ :</Text>
                <Input
                    leftIcon={
                        <Icon
                            name='mobile'
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  Link รูปภาพ'}
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
                    value={data[0]}
                    onChangeText={(val) => {
                        const newData = [...data];
                        newData[0] = val;
                        setData(newData);
                    }}
                />
                <Text>ยอดไลค์ :</Text>
                <Input
                    leftIcon={
                        <Icon
                            name='mobile'
                            size={30}
                            color='#0085E6'
                        />
                    }
                    placeholder={'  ยอดไลค์'}
                    value={data[1]}
                    onChangeText={(val) => {
                        const newData = [...data];
                        newData[1] = val;
                        setData(newData);
                    }}
                />
                <Button
                    icon={
                        <Icon
                            name='check'
                            size={15}
                            color='white'
                        />
                    }
                    title='  เพิ่มเพลง'
                    buttonStyle={{
                        backgroundColor: "green"
                    }}
                    onPress={() => storeUser()}
                />
                <Button
                    icon={
                        <Icon
                            name='users'
                            size={15}
                            color='white'
                        />
                    }
                    title='  เพลงทั้งหมด'
                    onPress={() => navigation.navigate('UserScreen')}
                    containerStyle={{
                        marginTop: 10
                    }}
                />
            </ScrollView>
        </View>
    );
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

export default AddUserScreen;
