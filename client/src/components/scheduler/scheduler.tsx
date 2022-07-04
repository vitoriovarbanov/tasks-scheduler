import React from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import 'moment/locale/bg';
import 'moment-timezone';

moment.tz.setDefault('Europe/Sofia')
const DnDCalendar = withDragAndDrop(Calendar)

const SchedulerComponent = () => {

    const localizer = momentLocalizer(moment);


    return (
        <DnDCalendar
            localizer={localizer}
            resizable
            selectable
            defaultView="week"
        />
    )
}

export default SchedulerComponent