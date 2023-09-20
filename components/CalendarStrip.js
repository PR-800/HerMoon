import React, { useState, useRef } from 'react'

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
                    fontSize: 50,
                    color: 'white',
                }}
                iconLeftStyle={{ position: "absolute", top: -200 }}
                iconRightStyle={{ position: "absolute", top: -200 }}
                style={{ height: 150, paddingTop: 10, paddingBottom: 10 }}
                startDate={moment(date)}
                highlightDateContainerStyle={{
                    backgroundColor: '#F77D80',
                    paddingVertical: 10,
                    height: 'auto',
                    color: 'black',
                }}
                dayContainerStyle={{ paddingVertical: 10 }}
                highlightDateNumberStyle={{
                    color: 'gray',
                    fontSize: 14,
                }}
                highlightDateNameStyle={{
                    color: 'white',
                    fontSize: 12,
                    marginHorizontal: 1.5,
                    padding: 5.5,
                    borderTopEndRadius: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
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