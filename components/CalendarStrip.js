import React, { useState, useRef } from 'react'

import { useFonts } from 'expo-font';

import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';

const CalendarStripC = () => {
    const [newdate, setDate] = useState(new Date());
    const calenderRef = useRef();

    const date = new Date();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedDay, setSelectedDay] = useState(Date);
    const datesWhitelist = [
        {
            start: startDate,
            end: moment(endDate),
        },
    ];

    const [loaded] = useFonts({
        MitrMedium: require('../assets/fonts/Mitr-Medium.ttf'),
        MitrRegular: require('../assets/fonts/Mitr-Regular.ttf'),
    });

    if (!loaded) {
        return null;
    }
    
    return (
            <CalendarStrip
                selectedDay={selectedDay}
                ref={calenderRef}
                selectedDate={newdate}
                onDateSelected={value => {
                    setDate(moment(value).format('YYYY-MM-DD'));
                }}
                daySelectionAnimation={{
                    type: 'border',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: 'white',
                }}
                calendarHeaderStyle={{
                    fontSize: 55,
                    color: 'transparent',
                    fontFamily: 'MitrRegular',
                }}
                iconLeftStyle={{ position: "absolute", top: -200 }}
                iconRightStyle={{ position: "absolute", top: -200 }}
                style={{ height: 150, top: 25}}
                startDate={moment(date)}
                highlightDateContainerStyle={{
                    backgroundColor: '#F77D80',
                    paddingVertical: 5,
                    height: 'auto',
                    color: 'black',
                    fontFamily: 'MitrRegular',
                }}
                dayContainerStyle={{ paddingVertical: 10 }}
                highlightDateNumberStyle={{
                    color: 'gray',
                    fontSize: 14,
                    fontFamily: 'MitrRegular',
                }}
                highlightDateNameStyle={{
                    color: 'white',
                    fontSize: 12,
                    marginHorizontal: 1.5,
                    padding: 5.5,
                    borderTopEndRadius: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    fontFamily: 'MitrRegular',
                }}
                dateNameStyle={{
                    fontFamily: 'MitrRegular',
                }}
                dateNumberStyle={{
                    fontFamily: 'MitrRegular',
                }}
                highlightDateNumberContainerStyle={{
                    backgroundColor: '#FFEAEA',
                    borderRadius: 40,
                    padding: 4,
                    marginHorizontal: 10,
                    minWidth: 30,
                    minHeight: 30,
                }}
                datesWhitelist={datesWhitelist}
                useNativeDriver={false}
            />
    );
};

export default CalendarStripC;