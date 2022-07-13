const str = '2022-07-06T15:00:00+00:00';
const str2 = '2022-07-06T18:00:00+00:00';
const str3 = '2022-07-07T12:00:00+00:00';
const str4 = '2022-07-07T14:00:00+00:00';
const str5 = '2022-07-07T14:00:00+00:00';
const str6 = '2022-07-07T17:30:00+00:00';
const str7 = '2022-07-07T16:00:00+00:00';
const str8 = '2022-07-07T17:00:00+00:00';


export interface EventInterface {
    id?: string | null,
    originalTaskId?: string,
    title?: string,
    start?: string | Date,
    end?: string | Date,
    allDay?: boolean,
    isAllDay?: boolean,
    resourceId?: string | null,
    backgroundColorClass?: string,
    isNew?: boolean,
    toBeDeleted?: boolean,
}

export const myEventsList: EventInterface[] = [
    {
        id: '0',
        title: 'My Test Event',
        start: new Date(str),
        end: new Date(str2),
        resourceId: '62cd330ab29604a9091c79c3',
        backgroundColorClass: "rgb(255, 255, 128)"
        //allDay: true
        //resource: any,
    },
    {
        id: '1',
        title: 'Event 2',
        start: new Date(str3),
        end: new Date(str4),
        resourceId: '62cd330ab29604a9091c79c3',
        backgroundColorClass: "rgb(143, 255, 128)"
        //allDay: true
        //resource: any,
    },
    {
        id: '3',
        title: 'Event 3',
        start: new Date(str5),
        end: new Date(str6),
        resourceId: '62cd339681eeed1fd03c116a',
        backgroundColorClass: "rgb(128, 185, 255)"
        //allDay: true
        //resource: any,
    },
    {
        id: '4',
        title: 'Event 4',
        start: new Date(str7),
        end: new Date(str8),
        resourceId: '62cd339681eeed1fd03c116a',
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
    team: string[]
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
        team: ["62c8287a9a3e065179bf4d1c", "62c82d83d65b568c004b98cd"]
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
        team: ["62c82d83d65b568c004b98cd","62c82dd2d65b568c004b98d1","62c82e03d65b568c004b98d3"]
    },
/*     {
        name: 'Gamma',
        id: 'xfsd2-sdsa12',
        team: ["62c82e03d65b568c004b98d3"]
    },
    {
        name: 'Project Delta',
        id: 'bfdyh12-sdsa12',
        team: ["62c82d83d65b568c004b98cd","62c82dd2d65b568c004b98d1","62c82e03d65b568c004b98d3"]
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
    }, */
]

/************************************************** */
export interface UsersInterface {
    name: string,
    id: string,
    role: string,
    email?: string,
    userTasks: EventInterface[]
}

/* export const usersForScheduler: UsersInterface[] = [
    {
        name: 'Alexander Emilov',
        id: '62cd330ab29604a9091c79c3',
        role: 'Developer'
    },
    {
        name: 'Ivelin Dimitrov',
        id: '62cd339681eeed1fd03c116a',
        role: 'QA'
    },
    {
        name: 'Mariya Ilieva',
        id: '62cd33c1985867eb3432ea22',
        role: 'Project Manager'
    },
    {
        name: 'John Doe',
        id: '62cd33d8985867eb3432ea24',
        role: 'Senior Dev'
    },
    {
        name: 'Ronnie J',
        id: '62cd33eb985867eb3432ea26',
        role: 'PR'
    },
] */


/************************************************** */
export const formatName = (procedureName: string, engName: string) => `${procedureName} - ${engName}`;

export const uuidv2 = () => {
    return replaceSymbols('2xxx-yxxx')
}

const replaceSymbols = (arg: string) => {
    return arg.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line no-bitwise
        const r = Math.random() * 16 | 0; const
            // eslint-disable-next-line no-bitwise
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const minTime = new Date();
minTime.setHours(7, 0, 0);
export const maxTime = new Date();
maxTime.setHours(20, 0, 0);

/******************************************* */
export interface DraggedTaskInterface {
    title?: string,
    name?: string,
    start: string | Date,
    end: string | Date,
    allDay?: boolean,
}