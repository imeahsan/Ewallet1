/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, DataTable, Snackbar, Text, TextInput} from 'react-native-paper';
import {handleSave} from '../firebase/firebse_CRUD';

const Categories = () => {
    const [newCategory, setNewCategory] = useState('');
    const [categoryList, setCategoryList] = useState([
        {label: 'Utility', value: 'Utility'},
        {
            label: 'Grocery',
            value: 'Grocery',
        },
    ]);
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@categoryList');
            let x = JSON.parse(jsonValue);
            console.log('category List: ', jsonValue);
            if (x) {
                setCategoryList(x);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleAddCategory = async () => {
        if (newCategory) {
            let li;
            console.log(categoryList)
            let tmp = {label: newCategory, value: newCategory}
            console.log(tmp)
            if (categoryList.length > 5) {
                showSnackBar('Only 6 categories can be added')
                return
            }
            if (categoryList.some(item => item.label === tmp.label)) {
                showSnackBar('Duplicate category name')
            } else {
                if (categoryList) {
                    li = [...categoryList, {label: newCategory, value: newCategory}];
                } else {
                    li = [{label: newCategory, value: newCategory}];
                }
                setCategoryList(li);
                try {
                    const jsonValue = JSON.stringify(li);
                    await AsyncStorage.setItem('@categoryList', jsonValue);
                    showSnackBar('Category Added!!');
                } catch (e) {
                    // error reading value
                    console.log(e);
                }
                getData();
                handleSave(false);

            }

        } else {
            showSnackBar('Enter category Name!!');
        }
    };

    const handleCategoryDelete = async c => {
        let index = categoryList.indexOf(c);

        // If the element is found, remove it from the array
        if (index !== -1) {
            let c = categoryList;
            console.log(c);
            c.splice(index, 1);
            setCategoryList([...c]);
            console.log(45, categoryList);
            try {
                const jsonValue = JSON.stringify(categoryList);
                await AsyncStorage.setItem('@categoryList', jsonValue);
                showSnackBar("Category deleted!!")
            } catch (e) {
                // error reading value
                console.log(e);
            }
        }
    };

    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const showSnackBar = (msg) => {
        setMessage(msg)
        console.log(message)
        onToggleSnackBar()
        // setTimeout(onToggleSnackBar, 3000)
    }
    return (
        <View style={{margin: 0, height: '100%'}}>
            <View style={{marginTop: 15}}>
                <Text
                    variant="titleLarge"
                    style={{
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}>
                    Categories
                </Text>
            </View>
            <View style={{padding: 10}}>
                <TextInput
                    label="Category Name"
                    placeholder="Category Name"
                    right={<TextInput.Affix text="required"/>}
                    style={{marginTop: 5, marginBottom: 5}}
                    onChangeText={e => {
                        setNewCategory(e.trim());
                    }}
                />
                <Button onPress={handleAddCategory} mode='contained' icon="shape-plus">Add Category</Button>

                <View style={{marginTop: 25, marginBottom: 5}}>
                    <Text variant="titleMedium">Categories</Text>
                    <DataTable style={{marginTop: 5, height: 350}}>

                        <DataTable.Header>
                            <DataTable.Title>Category</DataTable.Title>

                            <DataTable.Title>Delete</DataTable.Title>
                        </DataTable.Header>
                        <ScrollView>
                            {categoryList
                                ? categoryList.map(c => (
                                    <DataTable.Row key={Math.random()}>
                                        <DataTable.Cell>{c.label}</DataTable.Cell>

                                        <DataTable.Cell>
                                            <Button
                                                icon="delete"
                                                buttonColor={'transparent'}
                                                textColor='red'
                                                rippleColor='transparent'
                                                mode="contained"
                                                onPress={() => {
                                                    handleCategoryDelete(c);
                                                }}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))
                                : null}
                        </ScrollView>
                    </DataTable>
                </View>
            </View>
            <Snackbar
                style={{
                    marginBottom: -5, margin: 25, alignContent: 'center', position: 'absolute',
                    bottom: 0,
                }}
                duration={3000}
                visible={visible}
                icon="information-outline"
                onDismiss={onDismissSnackBar}
            >
                <View style={{backgroundColor: 'transparent', ...styles.centeredContent}}>
                    <Text style={{backgroundColor: 'transparent', ...styles.centeredContent}}>{message}</Text>
                </View>

            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredContent: {

        alignItems: 'center',
        justifyContent: 'center',
        color: "black"
    },
})
export default Categories;
