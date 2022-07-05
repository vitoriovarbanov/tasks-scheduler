import React, { useState, useEffect, useCallback } from 'react';
import ProjectResourcesComponent from './project-resources';
import SchedulerComponent from './scheduler';
import {
    Card, UncontrolledTooltip, Collapse, CardGroup, CardBody,
    CardText
} from 'reactstrap';
import { projectsList, formatName } from './scheduler-helpers';
import { Icon } from '@iconify/react';
import { CurrentTasks } from './project-resources'


interface TaskEvent {
    title: string,
    name: string,
    start: Date,
    end: Date,
}


const SchedulerParent = () => {

    const [selectedProject, setSelectedProject] = useState<null | string>(null);
    const [backgroundForOutsideResource, setBackgroundForOutsideResource] = useState('');
    const [currentEngName, setCurrEngName] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [taskDuration, setTaskDuration] = useState<null | number>(null);
    const [draggedTaskId, setDraggedTaskId] = useState<null | string>(null);
    const [draggedEvent, setDraggedEvent] = useState<TaskEvent>();
    const [currentTaks, setCurrentTasks] = useState<null | CurrentTasks[]>(null)


    const handleDragStart = useCallback((event: TaskEvent) => setDraggedEvent(event), [])

    const collapseProcedures = (
        <>
            {
                isCollapsed
                    ? <Icon icon="mdi:arrow-down" onClick={() => setIsCollapsed(!isCollapsed)} id="collapse-form-button" />
                    : <Icon icon="mdi:arrow-up" onClick={() => setIsCollapsed(!isCollapsed)} id="collapse-form-button" />
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

    return (
        <div className='scheduler-main-container'>
            <div className='content-wrapper'>
                <div className='content-wrapper--engagements'>
                    <ProjectResourcesComponent
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        setBackgroundForOutsideResource={setBackgroundForOutsideResource}
                        setCurrEngName={setCurrEngName}
                        setCurrentTasks={setCurrentTasks}
                    />
                </div>
                <div className='content-wrapper--calendar'>
                    <Card className="plain-card scheduler-collapsed-card">
                        <span className='float-left task-form-collapse mr-1 mt-1'>{collapseProcedures}</span>
                        <h3 className="header-title mb-1 mt-1 ml-1 mr-1">
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
                                            currentTaks.map((x, index) => {
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
                    <Card>
                        <SchedulerComponent
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SchedulerParent