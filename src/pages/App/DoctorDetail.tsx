import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { RootStackParamList } from "@/src/navigation/Screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import MenuGroup from "@/src/components/Menu/MenuGroup";
import Category from "@/src/components/Category";
import IconStethoscope from "@/src/components/Icons/IconStethoscope";
import IconHospital from "@/src/components/Icons/IconHospital";
import Header from "@/src/components/Header/Header";
import IconBackArrow from "@/src/components/Icons/IconBackArrow";
import { RouteProp, useRoute } from "@react-navigation/native";
import DoctorCard from "@/src/components/DoctorCard";
import SelectMonth from "@/src/components/Calendar/SelectMonth";
import DayButton from "@/src/components/Calendar/DayButton";
import StorageUtils from "@/src/utils/StorageUtils";
import HourGroup from "@/src/components/Calendar/HourGroup";

const windowHeight = Dimensions.get("window").height;
const navbarHeight = windowHeight - (windowHeight + Constants.statusBarHeight);

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DoctorDetail"
>;

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "DoctorDetail">;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: DetailsScreenRouteProp;
};

const fakesHours: any = [
  {
    hour: "13:00",
    avaible: false,
  },
  {
    hour: "13:30",
    avaible: true,
  },
  {
    hour: "14:00",
    avaible: true,
  },
  {
    hour: "14:30",
    avaible: false,
  },
  {
    hour: "15:00",
    avaible: false,
  },
  {
    hour: "15:30",
    avaible: false,
  },
  {
    hour: "16:00",
    avaible: false,
  },
  {
    hour: "16:30",
    avaible: false,
  },
  {
    hour: "17:00",
    avaible: false,
  },
  {
    hour: "17:30",
    avaible: false,
  },
  {
    hour: "18:00",
    avaible: false,
  },
  {
    hour: "18:30",
    avaible: false,
  },
  {
    hour: "19:00",
    avaible: false,
  },
];

export default function DoctorDetail({ navigation, route }: Props) {
  const [days, setDays] = useState([[], [], []]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);

  const { doctor }: any = route.params;

  useEffect(() => {
    const nextThreeMonths = StorageUtils.getDaysOfNextThreeMonths();

    const monthsArr: any = [];
    const daysArr: any = [];

    nextThreeMonths.map((item) => {
      monthsArr.push(item.month);
      item.days.map((day, index) => {
        day.active = index == 0 ? true : false;
      });
      daysArr.push(item.days);
    });

    setMonths(monthsArr);
    setDays(daysArr);
  }, []);

  const handleFilterList = () => {
    return days[selectedMonth];
  };

  const handleSelectMonth = (index: number) => {
    setSelectedMonth(index);
    setSelectedDay(0);
    days[selectedMonth].map((day: any, i) => {
      day.active = i == 0 ? true : false;
    });
  };

  const handleSelectDay = (index: number) => {
    setSelectedDay(index);
    days[selectedMonth].map((day: any, i) => {
      day.active = index == i ? true : false;
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <IconBackArrow />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <DoctorCard doctor={doctor} distance={false} actionButton={false} />
      </View>
      <View style={styles.calendarControllContainer}>
        <SelectMonth
          months={months}
          selectedMonth={selectedMonth}
          menuClick={handleSelectMonth}
        />
        <View style={styles.daysContainer}>
          <ScrollView
            style={styles.calendarControll}
            contentContainerStyle={{
              gap: 15,
              alignItems: "center",
              paddingHorizontal: 20,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {handleFilterList().map((day, index) => {
              return (
                <DayButton day={day} onClick={() => handleSelectDay(index)} />
              );
            })}
          </ScrollView>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          gap: 10,
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text style={styles.hourText}>Horários</Text>
        {fakesHours.map((hour: any) => {
          return <HourGroup hour={hour} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  content: {
    width: "100%",
    paddingBottom: navbarHeight + 60,
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 20,
  },
  backButton: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "flex-start",
    marginTop: Constants.statusBarHeight,
  },
  backButtonText: {
    color: "#3097E1",
    fontSize: 14,
    fontFamily: "Outfit-Regular",
  },
  hourText: {
    color: "#999",
    fontSize: 14,
    fontFamily: "Outfit-Medium",
    paddingBottom: 10,
  },
  info: {
    width: "100%",
    paddingHorizontal: 20,
  },
  calendarControllContainer: {
    gap: 15,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  calendarControll: {
    // backgroundColor: "red",
    // backgroundColor: "red",
  },
  daysContainer: {
    flexDirection: "row",
    width: "100%",
  },
});
