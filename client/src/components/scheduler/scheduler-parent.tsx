import React, { useState, useEffect, useCallback } from 'react';
import ProjectResourcesComponent from './project-resources';
import SchedulerComponent from './scheduler';
import { Card } from 'reactstrap';

const SchedulerParent = () => {

    const [selectedProject, setSelectedProject] = useState<null | string>(null);
    const [backgroundForOutsideResource, setBackgroundForOutsideResource] = useState('');
    const [currentEngName, setCurrEngName] = useState('');


    return (
        <div className='scheduler-main-container'>
            <div className='content-wrapper'>
                    <div className='content-wrapper--engagements'>
                        <ProjectResourcesComponent
                            selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject}
                            setBackgroundForOutsideResource={setBackgroundForOutsideResource}
                            setCurrEngName={setCurrEngName}
                        />
                    </div>
                    <div className='content-wrapper--calendar'>
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