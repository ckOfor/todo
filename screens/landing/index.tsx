// react
import React, { useEffect, useState, useRef, useCallback } from "react";

// react-native
import {
    View,
    ViewStyle,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";

import {
    AntDesign, MaterialCommunityIcons, Entypo
} from "@expo/vector-icons";

// third-partie
import { Fab, Icon, Box, Center, NativeBaseProvider, Input, Button } from "native-base";
import Swipeout from "react-native-swipeout";
import SlidingUpPanel from "rn-sliding-up-panel";

// styles
import { colors } from "../../theme";
import { Layout } from "../../constants";


export const InputComponent = ({ placeholder, onChangeText, value }) => {
    return (
        <Input
            placeholder={placeholder}
            size="lg"
            onChangeText={onChangeText}
            value={value}
        />
    )
}

export const FabItem = ({ onPress, value }) => {
    return (
        <Box position="relative" h={100} w="100%">
            <Fab
                position="absolute"
                size="sm"
                icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
                onPress={onPress}
                value={value}
            />
        </Box>
    )
};

const ROOT: ViewStyle = {
    paddingVertical: 30,
    paddingHorizontal: 10,
    height: '100%',
    backgroundColor: colors.white
};


export const ButtonComponent = ({ onPress, text, disable }) => {
    return (
        <>
            <Button isDisabled={disable} onPress={onPress} style={{ marginTop: Layout.window.height / 10 }}>{text}</Button>
        </>
    )
}

const Landing = (props) => {

    // props
    const [swipeRefs, setSwipeRefs] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const [mode, setAppMode] = useState('');
    const [value, setValue] = React.useState("")
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [currentTodo, setCurrentTodo] = React.useState(0)

    // refs
    let sliderRef = useRef();

    var swipeoutBtns = [
        {
            text: "Button",
            component: (
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                    onPress={() => {
                        setAppMode('edit')
                        sliderRef.current.show()
                    }}
                >
                    <Entypo
                        name="edit"
                        size={30}
                        color={'#1DA1F2'}
                        style={{
                            // marginHo: 10
                            bottom: 5
                        }}
                    />
                </TouchableOpacity>
            ),
            backgroundColor: colors.transparent,
        },
        {
            text: "Button",
            component: (
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                    onPress={() => handleDelete()}
                >
                    <MaterialCommunityIcons
                        name="delete"
                        size={30}
                        color={'#DB4437'}
                        style={{
                            bottom: 5
                        }}
                    />
                </TouchableOpacity>
            ),
            backgroundColor: colors.transparent,
        },
    ];

    const handleChange = (value: string) => setValue(value)

    const handleAdd = () => {
        let newList = todoList;
        newList.push(value);
        setTodoList(newList)
        setAppMode('');
        sliderRef.current.hide();
        setValue('');
    }

    const handleSave = () => {
        const arr = todoList;
        arr[currentIndex] = value;
        setAppMode('');
        sliderRef.current.hide();
        setValue('');
    }

    const handleDelete = () => {
        const arr = [...todoList];
        arr.splice(currentIndex, 1);
        console.log(arr)
        setTodoList(arr)
    }

    const closeAll = () => {
        [].map((beneficiary, index) => {
            swipeRefs[index].current._close();
        });
    };

    const Item = ({ title, index }) => (
        <Swipeout
            right={swipeoutBtns}
            backgroundColor={colors.transparent}
            ref={swipeRefs[index]}
            onOpen={(s) => {
                setCurrentIndex(index)
                setCurrentTodo(title)
                if (swipeRefs[index]) {
                    swipeRefs[index].current._close();
                    closeAll();
                }
            }}
        >
            <View
                style={{
                    padding: 20,
                    backgroundColor: '#F1A85A',
                    marginBottom: 10,
                    borderRadius: 10
                }}
            >
                <Text style={{ color: colors.white }}>{title}</Text>
            </View>
        </Swipeout>
    );

    const renderItem = ({ item, index }) => (
        <Item title={item} index={index} />
    );

    return (
        <NativeBaseProvider>
            <View
                style={ROOT}
            >
                {
                    todoList.length > 0 && <Text
                        style={{
                            marginBottom: 20
                        }}
                    >
                        Slide item to manage
                    </Text>
                }
                <FlatList
                    bounces={false}
                    data={todoList}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    ListEmptyComponent={
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: Layout.window.height / 3
                                }}
                            >
                                You have no todos :D
                            </Text>
                        </View>
                    }
                />

                <NativeBaseProvider>
                    <Center flex={1} px="3">
                        <FabItem onPress={() => {
                            sliderRef.current.show()
                            setAppMode('create')
                        }} />
                    </Center>
                </NativeBaseProvider>

                <SlidingUpPanel
                    ref={sliderRef}
                    draggableRange={{
                        top: Layout.window.height / 2.5,
                        bottom: 0,
                    }}
                    friction={0.5}
                    allowDragging={false}
                >

                    <View
                        style={{
                            backgroundColor: colors.white,
                            height: Layout.window.height,
                            paddingHorizontal: 20,
                            paddingVertical: 30
                        }}
                    >
                        <Text
                            style={{
                                marginBottom: 20
                            }}
                        >
                            {mode === 'create' ? 'Create todo' : 'Edit todo'}
                        </Text>

                        <InputComponent
                            placeholder={"Enter todo details"}
                            onChangeText={handleChange}
                            value={mode === "create" ? value : value || currentTodo} />

                        <ButtonComponent disable={value.length < 3} onPress={() => mode === "create" ? handleAdd() : handleSave()} text={mode === 'create' ? 'Add' : 'Save'} />
                    </View>



                </SlidingUpPanel>

            </View>
        </NativeBaseProvider>
    );
};

export const LandingScreen = Landing;
