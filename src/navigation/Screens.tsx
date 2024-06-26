import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import {
  Home,
  Login,
  Register,
  SchedulingClinics,
  Scheduling,
  SchedulingDoctors,
  DoctorDetail,
} from "../pages";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  App: undefined;
  Home: undefined;
  Scheduling: undefined;
  SchedulingDoctors: undefined;
  SchedulingClinics: undefined;
  DoctorDetail: undefined;
  Profile: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Scheduling" component={Scheduling} />
      <Stack.Screen name="SchedulingDoctors" component={SchedulingDoctors} />
      <Stack.Screen name="SchedulingClinics" component={SchedulingClinics} />
      <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
    </Stack.Navigator>
  );
}

export default function Screens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="App" component={App} />
    </Stack.Navigator>
  );
}
