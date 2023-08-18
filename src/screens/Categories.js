/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Button, ScrollView, View} from 'react-native';
import {DataTable, Text, TextInput} from 'react-native-paper';
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

            if (categoryList) {
                li = [...categoryList, {label: newCategory, value: newCategory}];
            } else {
                li = [{label: newCategory, value: newCategory}];
            }
            setCategoryList(li);

            try {
                const jsonValue = JSON.stringify(li);
                await AsyncStorage.setItem('@categoryList', jsonValue);
                alert('Category Added!!');
            } catch (e) {
                // error reading value
                console.log(e);
            }
            console.log(categoryList);

            getData();
        } else {
            alert('Enter category Name!!');
        }
        handleSave(false);
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
                // alert("Category Added!!")
            } catch (e) {
                // error reading value
                console.log(e);
            }
        }
    };
    return (
        <ScrollView style={{margin: 5}}>
            <View style={{marginTop: 15}}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                    }}>
                    Categories
                </Text>
            </View>
            <TextInput
                label="Category Name"
                placeholder="Category Name"
                right={<TextInput.Affix text="required"/>}
                style={{marginTop: 5, marginBottom: 5}}
                onChangeText={e => {
                    setNewCategory(e.trim());
                }}
            />
            <Button title="Add Category" onPress={handleAddCategory}/>

            <View style={{marginTop: 25, marginBottom: 5}}>
                <Text variant="titleLarge">Categories</Text>
                <DataTable style={{marginTop: 5, height: 475}}>

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
                                        title="Delete"
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
        </ScrollView>
    );
};

export default Categories;
