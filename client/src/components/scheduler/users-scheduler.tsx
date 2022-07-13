import React, { useState, Dispatch, SetStateAction } from 'react';
import { Card, CardBody, CardGroup, CardText, Collapse, UncontrolledTooltip } from 'reactstrap';
import { UsersInterface, EventInterface } from './scheduler-helpers'
import { Icon } from '@iconify/react';

export type SelectedUserMapped = {
    name: string,
    id: string,
    role: string,
    resourceId: string
}

interface IProps {
    setSelectedResourceId: Dispatch<SetStateAction<null | string>>;
    selectedResourceId: null | string;
    users: UsersInterface[] | null;
    setCalendarDisabled: Dispatch<SetStateAction<boolean>>;
    currentTaskTeam: null | string[]
    setInitResources: Dispatch<SetStateAction<[] | SelectedUserMapped[]>>;
    selectedProject: null | string;
    setEventsState: Dispatch<SetStateAction<EventInterface[] | []>>;
    stateUpdated: boolean;
    setConfirmChangesModalOpen: Dispatch<SetStateAction<boolean>>;
    setTempInitResources: Dispatch<SetStateAction<null | SelectedUserMapped>>;
    setTempEvents: Dispatch<SetStateAction<EventInterface[] | null>>;
}


const SchedulerUsers = ({ setSelectedResourceId, selectedResourceId, users, setCalendarDisabled,
    currentTaskTeam, setInitResources, selectedProject, setEventsState, setConfirmChangesModalOpen, stateUpdated,
    setTempEvents, setTempInitResources }: IProps) => {
    const [usersCardCollapsed, setUsersCardCollapsed] = useState(true);

    const usersResourceMap = users && users.map(x => {
        return { ...x, resourceId: x.id }
    })

    const collapseUsers = (
        <>
            {
                usersCardCollapsed
                    ? <Icon icon="mdi:arrow-down" onClick={() => setUsersCardCollapsed(!usersCardCollapsed)} id="collapse-form-button" className='icon-size cursor-pointer' />
                    : <Icon icon="mdi:arrow-up" onClick={() => setUsersCardCollapsed(!usersCardCollapsed)} id="collapse-form-button" className='icon-size cursor-pointer' />
            }
            <i
                id="collapse-form-button"
                onClick={() => setUsersCardCollapsed(!usersCardCollapsed)}
                className={`collapse-icon zmdi zmdi-chevron-${usersCardCollapsed ? 'down' : 'up'} float-left zmdi-hc-2x cursor-pointer`}
            />
            <UncontrolledTooltip placement="bottom" target="collapse-form-button">

            </UncontrolledTooltip>
        </>
    )

    const isUserInTeam = (userId: string) => {
        if (currentTaskTeam && currentTaskTeam.length > 0) {
            const userInTeam = currentTaskTeam.find(x => x === userId)
            if (userInTeam) {
                return 'user-in-team'
            }
        }
        return ''
    }

    const displayUserRole = (userRole: string) => {
        return (
            <>
                {userRole}
            </>
        )
    }

    return (
        <>
            <Card className="plain-card scheduler-collapsed-card mt-1">
                <span className='float-left task-form-collapse mr-1 mt-1'>{collapseUsers}</span>
                <h3 className="float-left header-title mb-1 mt-1 ml-1 mr-1">
                    Екип
                </h3>
            </Card>
            <Collapse isOpen={!usersCardCollapsed}>
                <Card className='card-wrapper-users'>
                    <CardGroup>
                        {
                            !selectedProject
                                ?
                                <span className={`${selectedResourceId ? 'error-hidden' : 'not-selected'} mt-1 ml-1`}>
                                    Изберете проект
                                </span>
                                :
                                users && users
                                    .map((x) => {
                                        return (
                                            <>
                                                <CardBody
                                                    className={
                                                        `scheduler-tasks-eng-team-card scheduler-tasks-eng-team-card--${isUserInTeam(x.id)}`
                                                    }
                                                    onClick={() => {
                                                        setSelectedResourceId(x.id)
                                                        setCalendarDisabled(false)
                                                        const mappedEvents = x.userTasks.map(x => {
                                                            return { ...x, start: x.start ? new Date(x.start) : '', end: x.end ? new Date(x.end) : '', allDay: false }
                                                        })
                                                        const selectedResource = usersResourceMap && usersResourceMap.find(y => y.resourceId === x.id)
                                                        if (stateUpdated) {
                                                            setTempEvents(mappedEvents)
                                                            if (selectedResource) {
                                                                setTempInitResources(selectedResource)
                                                            }
                                                            setConfirmChangesModalOpen(true)
                                                        } else {
                                                            if (selectedResource) {
                                                                setInitResources([selectedResource])
                                                            }
                                                            setEventsState(mappedEvents)
                                                        }

                                                    }}
                                                    key={x.id}
                                                    data-key={x.id}
                                                    name={x.name}
                                                >
                                                    <CardText>
                                                        <p className='p-bold'>{x.name}</p>
                                                        <span>{displayUserRole(x.role)}</span>
                                                    </CardText>
                                                </CardBody>
                                            </>
                                        )
                                    })
                        }
                    </CardGroup>
                </Card>
            </Collapse>
        </>
    )
}


export default SchedulerUsers;