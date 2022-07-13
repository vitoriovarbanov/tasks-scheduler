import React, { useState, useEffect, useCallback } from 'react';
import ProjectResourcesComponent from './project-resources';
import SchedulerComponent from './scheduler';
import {
    Card, UncontrolledTooltip, Collapse, CardGroup, CardBody,
    CardText, Row, Button, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import {
    projectsList, formatName, myEventsList, EventInterface,
    DraggedTaskInterface, uuidv2, UsersInterface
} from './scheduler-helpers';
import { Icon } from '@iconify/react';
import { CurrentTasks } from './project-resources'
import SchedulerUsers from './users-scheduler'
import { SelectedUserMapped } from './users-scheduler'
import ActionModal from './action-modal';
import { ProjectInterface } from './scheduler-helpers'
import { Prompt } from 'react-router-dom';

import { AxiosError, AxiosResponse } from 'axios';
const axios = require('axios').default;
import { API_URL } from '../../constants/index';


const SchedulerParent = () => {

    useEffect(() => {
        axios.get(`${API_URL}/api/users`)
            .then(function (response: AxiosResponse) {
                // handle success
                console.log(response.data)
                setUsersForScheduler(response.data)
            })
            .catch(function (error: AxiosError) {
                // handle error
                console.log(error);
            })
    }, [])

    useEffect(() => {
        axios.get(`${API_URL}/api/projects`)
            .then(function (response: AxiosResponse) {
                console.log(response.data.projects)
                setProjectsList(response.data.projects)
            })
            .catch(function (error: AxiosError) {
                console.log(error);
            })
    }, [])

    const [selectedResourceId, setSelectedResourceId] = useState<null | string>(null);
    const [eventsState, setEventsState] = useState<EventInterface[] | []>([]);
    const [initResources, setInitResources] = useState<[] | SelectedUserMapped[]>([]);
    const [draggedEvent, setDraggedEvent] = useState<DraggedTaskInterface>({ start: new Date, end: new Date });
    const [backgroundForOutsideResource, setBackgroundForOutsideResource] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [calendarDisabled, setCalendarDisabled] = useState(true);
    const [selectedProject, setSelectedProject] = useState<null | string>(null);
    const [currentProjectName, setCurrProjectName] = useState('');
    const [highlightedModalUser, setHighlightedModalUser] = useState<null | string>(null);
    const [taskForTransfer, setTaskForTransfer] = useState<null | { userIdToTransfer: string, eventIdForTransfer: string | null }>(null);
    const [selectableUsers, setSelectableUsers] = useState<null | { name: string | null, id: string }[]>(null);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [activeTask, setActiveTask] = useState<null | string>(null);
    const [idForTaskDetailsModal, setIdForTaskDetailsModal] = useState<null | string>(null);
    const [currentTaks, setCurrentTasks] = useState<null | CurrentTasks[]>(null)
    const [currentTeam, setCurrentTeam] = useState<null | string[]>(null)
    const [draggedTaskId, setDraggedTaskId] = useState<null | string>(null);
    const [taskDuration, setTaskDuration] = useState<null | number>(null);
    const [openModal, setOpenModal] = useState(false);
    const [usersForScheduler, setUsersForScheduler] = useState<null | UsersInterface[]>(null);
    const [projectsList, setProjectsList] = useState<null | ProjectInterface[]>(null);
    const [stateUpdated, setStateUpdated] = useState<boolean>(false)
    const [confirmChangesModalOpen, setConfirmChangesModalOpen] = useState<boolean>(false)
    const [tempEvents, setTempEvents] = useState<EventInterface[] | null>(null);
    const [tempInitResources, setTempInitResources] = useState<null | SelectedUserMapped>(null);

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
                            projectsList={projectsList}
                        />
                    </div>
                    <div className='content-wrapper--calendar'>
                        <Row className="mb-2 modal-row-action">
                            <div className="modal-row-action--container">
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        axios({
                                            method: 'put',
                                            url: `${API_URL}/api/users/tasks/${selectedResourceId}`,
                                            data: {
                                                userTasks: eventsState
                                            }
                                        }).then((data: AxiosResponse) => {
                                            if (data.status === 200) {
                                                const res = axios.get(`${API_URL}/api/users`)
                                                return res
                                            }
                                        }).then((response: AxiosResponse) => {
                                            setUsersForScheduler(response.data)
                                            setStateUpdated(false)
                                        }).catch((e: AxiosError) => console.log(e))
                                    }}
                                >
                                    Запази задачите
                                </Button>
                            </div>
                        </Row>
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
                            setEventsState={setEventsState}
                            stateUpdated={stateUpdated}
                            setConfirmChangesModalOpen={setConfirmChangesModalOpen}
                            setTempEvents={setTempEvents}
                            setTempInitResources={setTempInitResources}
                        />
                        <Card className={`plain-card-calendar ${calendarDisabled ? 'scheduler-disabled' : ''}`}>
                            <SchedulerComponent
                                currentTaskTeam={currentTeam}
                                selectedResourceId={selectedResourceId}
                                eventsState={eventsState}
                                setEventsState={setEventsState}
                                initResources={initResources}
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
                                setStateUpdated={setStateUpdated}
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
                setStateUpdated={setStateUpdated}
            />
            <Modal
                isOpen={confirmChangesModalOpen}
                toggle={() => setConfirmChangesModalOpen(true)}
                className="modal-dialog-centered"
                size="lg"
            >
                <ModalBody>
                    <Row className="mb-2 modal-row-action">
                        <div className="modal-row-action--container">
                            Имате незапазени промени. Желаете ли да продължите?
                        </div>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => {
                            if(tempInitResources && tempEvents){
                                setInitResources([tempInitResources])
                                setEventsState(tempEvents)
                            }                           
                        }}
                    >
                        Потвърди
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setStateUpdated(false)
                            setConfirmChangesModalOpen(false)
                        }}
                    >
                        Отказ
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default SchedulerParent