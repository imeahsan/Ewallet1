import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import { Text, TextInput, DataTable } from 'react-native-paper';


const Categories = () => {
  const [newCategory, setNewCategory] = useState('')
  const [categoryList, setCategoryList] = useState([]);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@categoryList')
      let x = JSON.parse(jsonValue)
      console.log('category List: ', jsonValue);
      setCategoryList(x)

    } catch (e) {
      console.log(e);
    }
  }


  useEffect(() => {
    getData()


  },[])


  const handleAddCategory = async () => {

    if (newCategory) {
      let li = [...categoryList, { label: newCategory, value: newCategory },
      ]
      setCategoryList(li)



      try {
        const jsonValue = JSON.stringify(li)
        await AsyncStorage.setItem('@categoryList', jsonValue)
        alert("Category Added!!")
      } catch (e) {
        // error reading value
        console.log(e);
      }
      console.log(categoryList);

      getData()
    } else {
      alert("Enter category Name!!")
    }
  }


  const handleCategoryDelete = async (c) => {
    let index = categoryList.indexOf(c);

    // If the element is found, remove it from the array
    if (index !== -1) {
      let c = categoryList
      console.log(c);
      c.splice(index, 1)
      setCategoryList([...c])
      console.log(45, categoryList);
      try {
        const jsonValue = JSON.stringify(categoryList)
        await AsyncStorage.setItem('@categoryList', jsonValue)
        // alert("Category Added!!")
      } catch (e) {
        // error reading value
        console.log(e);
      }
    }


  }
  return (
    <ScrollView style={{ margin: 5 }}>
      <Text variant="titleLarge">Add Category</Text>
      <TextInput
        label="Category Name"
        placeholder="Category Name"
        right={<TextInput.Affix text="required" />}
        style={{ marginTop: 5, marginBottom: 5 }}
        onChangeText={(e) => {
          setNewCategory(e.trim())
        }}
      />
      <Button title="Add Category" onPress={handleAddCategory}></Button>

      <View style={{ marginTop: 25, marginBottom: 5 }}>
        <Text variant="titleLarge">Categories</Text>
        <DataTable style={{ marginTop: 5 }}>
          <DataTable.Header>
            <DataTable.Title>Category</DataTable.Title>

            <DataTable.Title>Delete</DataTable.Title>
          </DataTable.Header>

          {categoryList ?
            categoryList.map((c) => (
              <DataTable.Row key={Math.random()}>
                <DataTable.Cell>{c.label}</DataTable.Cell>

                <DataTable.Cell>
                  <Button title="Delete" onPress={() => {
                    handleCategoryDelete(c)

                  }}></Button>
                </DataTable.Cell>
              </DataTable.Row>
            )) : null
          }


        </DataTable>
      </View>
    </ScrollView>
  );
};

export default Categories;
