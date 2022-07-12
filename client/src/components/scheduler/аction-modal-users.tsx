import React, { Dispatch, SetStateAction } from 'react';
import {
    Card, CardBody, CardGroup, CardText
} from 'reactstrap';
import { EventInterface } from './scheduler-helpers';

interface IProps {
    selectedResourceId: null | string;
    selectableUsers: null | { name: string | null, id: string }[];
    setHighlightedModalUser: Dispatch<SetStateAction<null | string>>;
    highlightedModalUser: null | string;
    setTaskForTransfer: Dispatch<SetStateAction<null | { userIdToTransfer: string, eventIdForTransfer: string | null }>>;
    activeTask: string | null;
    disableButtonForTransfer: (selectableUsers: {name: string | null; id: string}[] | null) => void;
}


const ActionModalUsers = ({ selectedResourceId, selectableUsers, highlightedModalUser,
    setHighlightedModalUser, setTaskForTransfer, activeTask, disableButtonForTransfer } : IProps) => {

    const usersToRender = selectableUsers && selectableUsers.filter(y => y.id !== selectedResourceId)
    usersToRender && disableButtonForTransfer(usersToRender)

    const isUserSelected = (userId: string) => {
        if (userId === highlightedModalUser) {
            return 'user-highlithed'
        }
        return ''
    }

    return (
        <>
            {
                usersToRender && usersToRender.length > 0 ?
                    <Card className='card-modal-users'>
                        <CardGroup>
                            {
                                usersToRender
                                    .map((x) => {
                                        return (
                                            <>
                                                <CardBody
                                                    className={
                                                        `card-body-modal-users`
                                                    }
                                                    onClick={() => {
                                                        setHighlightedModalUser(x.id)
                                                        setTaskForTransfer({ userIdToTransfer: x.id, eventIdForTransfer: activeTask })
                                                    }}
                                                >
                                                    <CardText
                                                        className={
                                                            `${isUserSelected(x.id)}`
                                                        }
                                                    >
                                                        <p className='card-users-text'>{x.name}</p>
                                                    </CardText>
                                                </CardBody>
                                            </>
                                        )
                                    })
                            }
                        </CardGroup>
                    </Card>
                    : ''
            }
        </>
    )
}

export default ActionModalUsers