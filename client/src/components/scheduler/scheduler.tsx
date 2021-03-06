import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'moment/locale/bg';
import 'moment-timezone';
import {
    EventInterface, DraggedTaskInterface, formatName, uuidv2,
    minTime, maxTime
} from './scheduler-helpers';
import { SelectedUserMapped } from './users-scheduler'

moment.tz.setDefault('Europe/Sofia')
const DnDCalendar = withDragAndDrop(Calendar)

interface IProps {
    currentTaskTeam: null | string[]
    selectedResourceId: null | string;
    eventsState: EventInterface[]
    setEventsState: Dispatch<SetStateAction<EventInterface[]>>;
    initResources: [] | SelectedUserMapped[]
    draggedEvent: DraggedTaskInterface | any;
    setDraggedEvent: Dispatch<SetStateAction<DraggedTaskInterface>>;
    backgroundForOutsideResource: string;
    calendarDisabled: boolean
    currentProjectName: string;
    draggedTaskId: string | null
    taskDuration: null | number;
    newEvent: (event: EventInterface) => void;
    setIdForTaskDetailsModal: Dispatch<SetStateAction<null | string>>;
    setactiveTask: Dispatch<SetStateAction<null | string>>;
    setActionDialogOpen: Dispatch<SetStateAction<boolean>>;
    setSelectableUsers: Dispatch<SetStateAction<null | { name: string | null, id: string }[]>>;
    setStateUpdated: Dispatch<SetStateAction<boolean>>;
}

const SchedulerComponent = ({ currentTaskTeam, selectedResourceId, eventsState,
    setEventsState, initResources, draggedEvent, setDraggedEvent, backgroundForOutsideResource,
    calendarDisabled, currentProjectName, draggedTaskId, taskDuration, newEvent, setIdForTaskDetailsModal,
    setactiveTask, setActionDialogOpen, setSelectableUsers, setStateUpdated }: IProps) => {

    const localizer = momentLocalizer(moment);   

    const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

    const eventPropGetter = useCallback(
        (event: EventInterface) => ({
            ...(event.backgroundColorClass
                ? { style: { backgroundColor: event.backgroundColorClass, color: 'black' } }
                : { style: { color: 'black' } }),
        }),
        []
    )

    const dayPropGetter = useCallback(
        (date: Date) => {
            if (date.toString().startsWith('Sun') || date.toString().startsWith('Sat'))
                return {
                    style: {
                        backgroundColor: '#e6e6e6',
                        opacity: 0.9,
                    },
                }
            else return {}
        },
        []
    )

    const moveEvent = useCallback(
        ({ event, start, end, isAllDay: droppedOnAllDaySlot = false, resourceId }:
            { event: EventInterface, start: Date | string, end: Date | string, isAllDay: boolean, resourceId?: string | null }) => {
            if (calendarDisabled) {
                return
            }
            const { allDay } = event
            if (!allDay && droppedOnAllDaySlot) {
                event.allDay = true
            }
            setEventsState((prev: EventInterface[]) => {
                const existing = prev.find((ev: EventInterface) => ev.id === event.id) ?? {}
                const filtered = prev.filter((ev: EventInterface) => ev.id !== event.id)
                return [...filtered, { ...existing, start, end, allDay, resourceId: resourceId || selectedResourceId }]
            })
            setStateUpdated(true)
        },
        [setEventsState, calendarDisabled, selectedResourceId]
    )

     const resizeEvent = useCallback(
          ({ event, start, end }) => {
              if (calendarDisabled) {
                  return
              }
              setEventsState((prev) => {
                  const existing = prev.find((ev) => ev.id === event.id) ?? {}
                  const filtered = prev.filter((ev) => ev.id !== event.id)
                  return [...filtered, { ...existing, start, end }]
              })
              setStateUpdated(true)
          },
          [setEventsState, calendarDisabled]
      )

    const onDropFromOutside = useCallback(
        ({ start, end, allDay }: DraggedTaskInterface) => {
            if (calendarDisabled) {
                return;
            }
            if (currentTaskTeam) {
                const userInTeam = currentTaskTeam.find(x => x === selectedResourceId)
                if (!userInTeam) {
                    /*return notification error*/
                    return;
                }
            }

            const droppedEventEnd = new Date(start)
            if (taskDuration) {
                droppedEventEnd.setHours(droppedEventEnd.getHours() + taskDuration)
            }

            const { name } = draggedEvent as DraggedTaskInterface
            const event: EventInterface = {
                title: formatName(name ? name : '', currentProjectName),
                start,
                end: taskDuration ? droppedEventEnd : end,
                allDay,
                resourceId: selectedResourceId,
                backgroundColorClass: backgroundForOutsideResource,
                id: draggedTaskId || uuidv2(),
                isNew: true,
            }
            
            setDraggedEvent({ start: new Date, end: new Date })
            setStateUpdated(true)
            newEvent(event)
        },
        [draggedEvent, setDraggedEvent, newEvent, calendarDisabled, selectedResourceId, backgroundForOutsideResource,
            currentProjectName, draggedTaskId, taskDuration]
    )

    const openProcedureActions = useCallback(
         (event) => {
             if (typeof event.id === 'string') {
                 const splittedId = event.id.split('-')
                 setIdForTaskDetailsModal(splittedId[0])
             }
             setactiveTask(event.id)
             findUsersInTeam()
             setActionDialogOpen(true)
         },
         []
     )

    const findUsersInTeam = () => {
         const currArr: { name: string | null, id: string }[] | null = []
         const allWithClass = Array.from(
             document.getElementsByClassName('scheduler-tasks-eng-team-card--user-in-team')
         );
         allWithClass.forEach(x => {
             const name = x.getAttribute('name')
             const dataKey = x.getAttribute('data-key')
             currArr.push({ name, id: dataKey ? dataKey : '' })
         })
         setSelectableUsers(currArr)
    }


    return (
        <DnDCalendar
            localizer={localizer}
            events={eventsState.filter(x => !x.toBeDeleted)}
            startAccessor="start"
            endAccessor="end"
            draggableAccessor={(event) => true}
            dayPropGetter={dayPropGetter}
            eventPropGetter={eventPropGetter}
            dragFromOutsideItem={dragFromOutsideItem}
            onDropFromOutside={onDropFromOutside}
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            onDoubleClickEvent={openProcedureActions}
            resizable
            selectable
            defaultView="week"
            min={minTime}
            max={maxTime}
            resourceIdAccessor="resourceId"
            resources={initResources}
            resourceTitleAccessor="name"
        />
    )
}

export default SchedulerComponent