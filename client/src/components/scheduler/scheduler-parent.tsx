import React, { useState, useEffect, useCallback } from 'react';
import ProjectResourcesComponent from './project-resources';
import SchedulerComponent from './scheduler';
import {
    Card, UncontrolledTooltip, Collapse, CardGroup, CardBody,
    CardText
} from 'reactstrap';
import {
    projectsList, formatName, usersForScheduler, myEventsList, EventInterface,
    DraggedTaskInterface, uuidv2
} from './scheduler-helpers';
import { Icon } from '@iconify/react';
import { CurrentTasks } from './project-resources'
import SchedulerUsers from './users-scheduler'
import { SelectedUserMapped } from './users-scheduler'
import ActionModal from './action-modal';

const SchedulerParent = () => {

    const [selectedResourceId, setSelectedResourceId] = useState<null | number>(null);
    const [eventsState, setEventsState] = useState<EventInterface[]>(myEventsList);
    const [initResources, setInitResources] = useState<[] | SelectedUserMapped[]>([]);
    const [draggedEvent, setDraggedEvent] = useState<DraggedTaskInterface>({ start: new Date, end: new Date });
    const [backgroundForOutsideResource, setBackgroundForOutsideResource] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [calendarDisabled, setCalendarDisabled] = useState(true);
    const [selectedProject, setSelectedProject] = useState<null | string>(null);
    const [currentProjectName, setCurrProjectName] = useState('');
    const [highlightedModalUser, setHighlightedModalUser] = useState<null | number>(null);
    const [taskForTransfer, setTaskForTransfer] = useState< null | { userIdToTransfer: number, eventIdForTransfer: string | null }>(null);
    const [selectableUsers, setSelectableUsers] = useState<null | { name: string | null, id: number }[]>(null);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [activeTask, setActiveTask] = useState<null | string>(null);
    const [idForTaskDetailsModal, setIdForTaskDetailsModal] = useState<null | string>(null);
    const [currentTaks, setCurrentTasks] = useState<null | CurrentTasks[]>(null)
    const [currentTeam, setCurrentTeam] = useState<null | number[]>(null)
    const [draggedTaskId, setDraggedTaskId] = useState<null | string>(null);
    const [taskDuration, setTaskDuration] = useState<null | number>(null);
    const [openModal, setOpenModal] = useState(false);

    console.log(activeTask)
    const handleDragStart = useCallback((event: DraggedTaskInterface) => setDraggedEvent(event), [])

    const newEvent = useCallback(
        (event: EventInterface) => {
            if (calendarDisabled) {
                return
            }
            setEventsState((prev) => {
                const idList = prev.map((item) => item.id)
                const duplicatedIds = idList.filter(x => x === event.id)
                if (duplicatedIds.includes(event.id)) {
                    event.id = event.id + `-${uuidv2()}`
                }
                return [...prev, { ...event }]
            })
        },
        [setEventsState, calendarDisabled]
    )

    const collapseProcedures = (
        <>
            {
                isCollapsed
                    ? <Icon icon="mdi:arrow-down" onClick={() => setIsCollapsed(!isCollapsed)} id="collapse-form-button" className='icon-size cursor-pointer' />
                    : <Icon icon="mdi:arrow-up" onClick={() => setIsCollapsed(!isCollapsed)} id="collapse-form-button" className='icon-size cursor-pointer' />
            }
            <i
                id="collapse-form-button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={`collapse-icon zmdi zmdi-chevron-${isCollapsed ? 'down' : 'up'} float-left zmdi-hc-2x cursor-pointer`}
            />
            <UncontrolledTooltip placement="bottom" target="collapse-form-button">
                {/* <Translate id={!isCollapsed ? "pages.engagements.turnover.collapse.calendar.close.tooltip" : "pages.engagements.turnover.collapse.calendar.open.tooltip"} /> */}
            </UncontrolledTooltip>
        </>
    );

    console.log(eventsState)

    return (
        <>
            <div className='scheduler-main-container'>
                <div className='content-wrapper'>
                    <div className='content-wrapper--engagements'>
                        <ProjectResourcesComponent
                            selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject}
                            setBackgroundForOutsideResource={setBackgroundForOutsideResource}
                            setCurrProjectName={setCurrProjectName}
                            setCurrentTasks={setCurrentTasks}
                            setCurrentTeam={setCurrentTeam}
                        />
                    </div>
                    <div className='content-wrapper--calendar'>
                        <Card className="plain-card scheduler-collapsed-card">
                            <span className='float-left task-form-collapse mr-1 mt-1'>{collapseProcedures}</span>
                            <h3 className="float-left header-title mb-1 mt-1 ml-1 mr-1">
                                {/* <Translate id="pages.engagements.structure.procedures.title" /> */}
                                Задачи
                            </h3>
                        </Card>
                        <Collapse isOpen={!isCollapsed}>
                            {
                                !currentTaks
                                    ?
                                    <Card className="plain-card scheduler-tasks-container-card pt-1 pb-1 pl-1 pr-1">
                                        <span className={`not-selected mt-1 ml-1`}>
                                            {/* <Translate id="pages.scheduler.select.engegement.procedures.error" /> */}
                                            Няма налични задачи.
                                        </span>
                                    </Card>
                                    :
                                    <Card className="plain-card scheduler-tasks-container-card">
                                        <h3 className="header-title mb-0 mt-1 ml-1 mr-1">
                                            {/* <Translate id={item.headerTranslation} /> */}
                                        </h3>
                                        <CardGroup>
                                            {
                                                currentTaks.map((x) => {
                                                    return (
                                                        <>
                                                            <CardBody
                                                                className={`scheduler-tasks-single-card`}
                                                                style={{ backgroundColor: backgroundForOutsideResource }}
                                                                draggable="true"
                                                                key={x.id}
                                                                onDragStart={() => {
                                                                    setTaskDuration(x.procedureDuration ? x.procedureDuration : null)
                                                                    setDraggedTaskId(x.id)
                                                                    handleDragStart(
                                                                        {
                                                                            title: formatName(x.name, x.id),
                                                                            name: x.name,
                                                                            start: new Date(),
                                                                            end: new Date(),
                                                                        }//, backgroundForOutsideResource
                                                                    )
                                                                }}
                                                            >
                                                                <CardText>
                                                                    {x.name}
                                                                </CardText>
                                                            </CardBody>
                                                        </>
                                                    )
                                                })
                                            }
                                        </CardGroup>
                                    </Card>
                            }
                        </Collapse>
                        <SchedulerUsers
                            setSelectedResourceId={setSelectedResourceId}
                            selectedResourceId={selectedResourceId}
                            users={usersForScheduler}
                            currentTaskTeam={currentTeam}
                            setCalendarDisabled={setCalendarDisabled}
                            setInitResources={setInitResources}
                            selectedProject={selectedProject}
                        />
                        <Card className={`plain-card-calendar ${calendarDisabled ? 'scheduler-disabled' : ''}`}>
                            <SchedulerComponent
                                currentTaskTeam={currentTeam}
                                setSelectedResourceId={setSelectedResourceId}
                                selectedResourceId={selectedResourceId}
                                eventsState={eventsState}
                                setEventsState={setEventsState}
                                initResources={initResources}
                                setInitResources={setInitResources}
                                draggedEvent={draggedEvent}
                                setDraggedEvent={setDraggedEvent}
                                backgroundForOutsideResource={backgroundForOutsideResource}
                                calendarDisabled={calendarDisabled}
                                currentProjectName={currentProjectName}
                                setActionDialogOpen={setActionDialogOpen}
                                setactiveTask={setActiveTask}
                                setSelectableUsers={setSelectableUsers}
                                setIdForTaskDetailsModal={setIdForTaskDetailsModal}
                                draggedTaskId={draggedTaskId}
                                taskDuration={taskDuration}
                                newEvent={(event) => newEvent(event)}
                            />
                        </Card>
                    </div>
                </div>
            </div>
            <ActionModal
                setActionDialogOpen={setActionDialogOpen}
                actionDialogOpen={actionDialogOpen}
                eventsState={eventsState}
                newEvent={(event) => newEvent(event)}
                activeTask={activeTask}
                setEventsState={setEventsState}
                setActiveTask={setActiveTask}
                selectedResourceId={selectedResourceId}
                selectableUsers={selectableUsers}
                highlightedModalUser={highlightedModalUser}
                setHighlightedModalUser={setHighlightedModalUser}
                setTaskForTransfer={setTaskForTransfer}
                taskForTransfer={taskForTransfer}
                setOpenModal={setOpenModal}
            />
        </>
    )
}

export default SchedulerParent