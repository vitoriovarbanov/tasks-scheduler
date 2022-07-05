import React from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'moment/locale/bg';
import 'moment-timezone';

import { myEventsList } from './scheduler-helpers';

moment.tz.setDefault('Europe/Sofia')
const DnDCalendar = withDragAndDrop(Calendar)

const SchedulerComponent = () => {

    const localizer = momentLocalizer(moment);


    return (
        <div className='scheduler-main-container'>
            <div style={{ height: '800px' }}>
                <DnDCalendar
                    localizer={localizer}
                    events={myEventsList}
                    resizable
                    selectable
                    defaultView="week"
                />
            </div>
        </div>
    )
}

export default SchedulerComponent