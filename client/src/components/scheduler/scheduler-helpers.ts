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

/************************************************* */
export interface ProjectInterface {
    name: string,
    id: string,
    tasks?: {
        name: string,
        id: string,
        procedureDuration?: number
    }[],
    team: number[]
}

export const projectsList: ProjectInterface[] = [
    {
        name: 'Apollo Project',
        id: 'xs12-sdsa12',
        tasks: [
            {
                name: 'Task 1',
                id: '1sfasf'
            },
            {
                name: 'Task 2',
                id: 'gdsgsda'
            },
            {
                name: 'Task 3',
                id: 'xcx234'
            },
            {
                name: 'Task 4',
                id: 'nvnbe513'
            },
            {
                name: 'Task 5',
                id: 'nbfdh32512'
            },
            {
                name: 'Task 6',
                id: 'ygdhbds312'
            }
        ],
        team: [1,2,5]
    },
    {
        name: 'Beta Project',
        id: 'xs12-sds512',
        tasks: [
            {
                name: 'Meeting 1',
                id: 'vccv2'
            },
            {
                name: 'Presentation FE',
                id: 'nf22'
            },
            {
                name: 'Meet up with CEO',
                id: 'hds112'
            },
            {
                name: 'Prepare for interview',
                id: 'hfb22'
            },
            {
                name: 'Select a new trainee',
                id: 'ngfh33'
            },
        ],
        team: []
    },
    {
        name: 'Gamma',
        id: 'xfsd2-sdsa12',
        team: [3,4]
    },
    {
        name: 'Project Delta',
        id: 'bfdyh12-sdsa12',
        team: [1,2,3,4,5]
    },
    {
        name: 'Epsilon',
        id: '6325sa-sdsa12',
        team: []
    },
    {
        name: 'Zeta',
        id: '76231-sdsa12',
        team: []
    },
    {
        name: 'Eta Project Ultimate',
        id: '8437-4234',
        team: []
    },
    {
        name: 'Theta Gatherings',
        id: '762321-zzz222',
        team: []
    },
    {
        name: 'Iota Update',
        id: '8623ss-ss',
        team: []
    },
]

/************************************************** */
export interface UsersInterface {
    name: string,
    id: number,
    role: string,
}

export const usersForScheduler: UsersInterface[] = [
    {
        name: 'Alexander Emilov',
        id: 1,
        role: 'Developer'
    },
    {
        name: 'Ivelin Dimitrov',
        id: 2,
        role: 'QA'
    },
    {
        name: 'Mariya Ilieva',
        id: 3,
        role: 'Project Manager'
    },
    {
        name: 'John Doe',
        id: 4,
        role: 'Senior Dev'
    },
    {
        name: 'Ronnie J',
        id: 5,
        role: 'PR'
    },
]


/************************************************** */
export const formatName = (procedureName: string, engName: string) => `${procedureName} - ${engName}`;