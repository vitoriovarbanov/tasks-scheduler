const str = '2022-06-21T15:00:00+00:00';
const str2 = '2022-06-21T18:00:00+00:00';
const str3 = '2022-06-22T12:00:00+00:00';
const str4 = '2022-06-22T14:00:00+00:00';
const str5 = '2022-06-20T14:00:00+00:00';
const str6 = '2022-06-20T17:30:00+00:00';
const str7 = '2022-06-22T16:00:00+00:00';
const str8 = '2022-06-22T17:00:00+00:00';

export const myEventsList = [
    {
        id: 0,
        title: 'My Test Event',
        start: new Date(str),
        end: new Date(str2),
        resourceId: 31,
        backgroundColorClass: "rgb(255, 255, 128)"
        //allDay: true
        //resource: any,
    },
    {
        id: 1,
        title: 'Event 2',
        start: new Date(str3),
        end: new Date(str4),
        resourceId: 31,
        backgroundColorClass: "rgb(143, 255, 128)"
        //allDay: true
        //resource: any,
    },
    {
        id: 3,
        title: 'Event 3',
        start: new Date(str5),
        end: new Date(str6),
        resourceId: 31,
        backgroundColorClass: "rgb(128, 185, 255)"
        //allDay: true
        //resource: any,
    },
    {
        id: 4,
        title: 'Event 4',
        start: new Date(str7),
        end: new Date(str8),
        resourceId: 31,
        backgroundColorClass: "rgb(222, 255, 128)"
        //allDay: true
        //resource: any,
    }
]
