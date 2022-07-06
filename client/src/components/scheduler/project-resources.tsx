import React, { MouseEventHandler } from 'react';
import { Card, CardBody, CardGroup, CardText } from 'reactstrap';
import { projectsList } from './scheduler-helpers';
import { Icon } from '@iconify/react';
import { ProjectInterface } from './scheduler-helpers'
import { Dispatch, SetStateAction } from "react";

export type CurrentTasks = {
    name: string,
    id: string,
    procedureDuration?: number
}

interface IProps {
    selectedProject: null | string;
    setSelectedProject: Dispatch<SetStateAction<null | string>>;
    setBackgroundForOutsideResource: Dispatch<SetStateAction<string>>;
    setCurrEngName: Dispatch<SetStateAction<string>>;
    setCurrentTasks: Dispatch<SetStateAction<null | CurrentTasks[]>>
    setCurrentTeam: Dispatch<SetStateAction<null | number[]>>
}


export const generateColor = (i: number) => {
    const goldenAngle = 180 * (3 - Math.sqrt(5))

    return {
        backgroundColor: `hsl(${i * goldenAngle + 60}, 100%, 75%)`,
    }
}


const ProjectResourcesComponent = ({ selectedProject, setSelectedProject, setBackgroundForOutsideResource,
    setCurrEngName, setCurrentTasks, setCurrentTeam }
    : IProps) => {
    const getEngagementBackgroundColor = (e: React.MouseEvent<HTMLInputElement>) => {
        const el = e.target as HTMLElement
        const elParent = el.parentElement
        if (elParent) {
            if (el.className.includes('card-body')) {
                const backgroundStyle = window.getComputedStyle(el, null).getPropertyValue("background-color");
                setBackgroundForOutsideResource(backgroundStyle)
            } else {
                const backgroundStyleCurrTarget = window.getComputedStyle(elParent, null).getPropertyValue("background-color");
                setBackgroundForOutsideResource(backgroundStyleCurrTarget)
            }
        }
    }

    return (
        <Card className="plain-card scheduler-engagements--container">
            <div className='flex-center'>
                <Icon icon="mdi:clipboard-file" className='icon-size' />
                <h3 className="header-title mb-2 mt-2 ml-2 inline-block">
                    Проекти
                    {/*   <Translate id="menu.sidebar.engagements" /> */}
                </h3>
            </div>
            <CardGroup>
                {
                    projectsList.map((x, index) => {
                        return (
                            <>
                                <CardBody
                                    className={`scheduler-engagements--card ${selectedProject === x.id ? 'eng-selected' : ''}`}
                                    style={generateColor(index)}
                                    id={`card-body-${index}`}
                                    key={x.id}
                                    onClick={(event: React.MouseEvent<HTMLInputElement>): void => {
                                        getEngagementBackgroundColor(event)
                                        setSelectedProject(x.id)
                                        setCurrEngName(x.name)
                                        setCurrentTasks(x.tasks ? x.tasks : null)
                                        setCurrentTeam(x.team)
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
    )
}


export default ProjectResourcesComponent;