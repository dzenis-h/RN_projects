import React from "react";
import { Platform, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colors from "../constants/Colors";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "Reactive Recipes",
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MealsNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="Categories" component={CategoriesScreen}></Stack.Screen>
    <Stack.Screen
      name="CategoryMeals"
      component={CategoryMealsScreen}
    ></Stack.Screen>
    <Stack.Screen name="MealDetail" component={MealDetailScreen}></Stack.Screen>
  </Stack.Navigator>
);

const FavNavigator = () => (
  <Stack.Navigator screenOptions={defaultStackNavOptions}>
    <Stack.Screen name="Favorites" component={FavoritesScreen}></Stack.Screen>
    <Stack.Screen name="MealDetail" component={MealDetailScreen}></Stack.Screen>
  </Stack.Navigator>
);

const MealsFavTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Meals"
      component={MealsNavigator}
      options={{
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel: () => {
          return <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>;
        },
      }}
    ></Tab.Screen>
    <Tab.Screen
      name="Favorites"
      component={FavNavigator}
      options={{
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel: () => {
          return Platform.OS === "android" ? (
            <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
          ) : (
            "Favorites"
          );
        },
      }}
    ></Tab.Screen>
  </Tab.Navigator>
);

const FiltersNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Filters" component={FiltersScreen}></Stack.Screen>
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
    }}
  >
    <Drawer.Screen
      name="MealsFavs"
      component={MealsFavTabNavigator}
      options={{
        drawerLabel: "Meals",
        drawerIcon: (props) => (
          <Ionicons name="ios-home" size={24} color="black" />
        ),
      }}
    ></Drawer.Screen>
    <Drawer.Screen
      name="Filters"
      component={FiltersNavigator}
      options={{
        drawerLabel: "Filters",
        drawerIcon: (props) => (
          <Ionicons name="ios-settings" size={24} color="black" />
        ),
      }}
    ></Drawer.Screen>
  </Drawer.Navigator>
);

export default function MyNavigator() {
  return (
    <NavigationContainer>
      <MainNavigator></MainNavigator>
    </NavigationContainer>
  );
}
