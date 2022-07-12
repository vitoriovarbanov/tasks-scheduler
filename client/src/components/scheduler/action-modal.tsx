import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row } from 'reactstrap';
import { EventInterface } from './scheduler-helpers';
import ActionModalUsers from './аction-modal-users'

interface IProps {
    setActionDialogOpen: Dispatch<SetStateAction<boolean>>;
    actionDialogOpen: boolean;
    selectedResourceId: null | string;
    activeTask: string | null;
    eventsState: EventInterface[]
    setEventsState: Dispatch<SetStateAction<EventInterface[]>>;
    newEvent: (event: EventInterface) => void;
    setActiveTask: Dispatch<SetStateAction<null | string>>;
    selectableUsers: null | { name: string | null, id: number }[];
    setHighlightedModalUser: Dispatch<SetStateAction<null | number>>;
    highlightedModalUser: null | number;
    setTaskForTransfer: Dispatch<SetStateAction<null | { userIdToTransfer: number, eventIdForTransfer: string | null }>>;
    taskForTransfer: null | { userIdToTransfer: number, eventIdForTransfer: string | null }
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ActionModal = ({ setActionDialogOpen, actionDialogOpen, eventsState, newEvent, activeTask,
    setEventsState, setActiveTask, selectedResourceId, selectableUsers, highlightedModalUser,
    setHighlightedModalUser, setTaskForTransfer, taskForTransfer, setOpenModal
}: IProps) => {
    const [disableButton, setDisableButton] = useState(false)

    const copyProcedure = useCallback(
        (id: string | null) => {
            const eventToBeCopied = eventsState.find(x => x.id === id)
            if (eventToBeCopied) {
                const newEventStart = new Date(eventToBeCopied.start ? eventToBeCopied.start : '')
                const newEventEnd = new Date(eventToBeCopied.end ? eventToBeCopied.end : '')
                if(newEventEnd && newEventStart){
                    newEventStart.setDate(newEventStart.getDate() + 1)
                    newEventEnd.setDate(newEventEnd.getDate() + 1)
                    const newCopiedEvent = {
                        title: eventToBeCopied.title,
                        start: newEventStart,
                        end: newEventEnd,
                        isAllDay: false,
                        resourceId: eventToBeCopied.resourceId,
                        backgroundColorClass: eventToBeCopied.backgroundColorClass,
                        id
                    }
                    newEvent(newCopiedEvent)
                }                
            }

        },
        [eventsState, newEvent]
    )

    const transferProcedureToNewUser = useCallback(
        (resourceId, eventId) => {
            setEventsState((prev) => {
                const existing = prev.find((ev) => ev.id === eventId) ?? {}
                const filtered = prev.filter((ev) => ev.id !== eventId)
                return [...filtered, { ...existing, resourceId }]
            })
        },
        [setEventsState]
    )

    const disableButtonForTransfer = (arr: null | { name: string | null; id: number }[]) => {
        if (arr && arr.length === 0) {
            setDisableButton(true)
        } else {
            setDisableButton(false)
        }
    }

    return (
        <>
            <Modal
                isOpen={actionDialogOpen}
                toggle={() => setActionDialogOpen(true)}
                className="modal-dialog-centered"
                size="lg"
            >
                <ModalHeader>
                    Изберете действие
                </ModalHeader>
                <ModalBody>
                    <Row className="mb-2 modal-row-action">
                        <div className="modal-row-action--container">
                            Копирай
                            <Button
                                color="primary"
                                onClick={() => {
                                    copyProcedure(activeTask)
                                    setActionDialogOpen(false)
                                }}
                            >
                                Потвърди
                            </Button>
                        </div>
                    </Row>
                    <Row className="mb-2 modal-row-action">
                        <div className="modal-row-action--container">
                            Изтрий
                            <Button
                                color="primary"
                                onClick={() => {
                                    setEventsState(eventsState.filter(x => x.id !== activeTask))
                                    setActiveTask(null)
                                    setActionDialogOpen(false)
                                }}
                            >
                                Потвърди
                            </Button>
                        </div>
                    </Row>
                    <Row className="mb-2 modal-row-action">
                        <div className="modal-row-action--container">
                            Прехвърли задачата
                            <ActionModalUsers
                                selectedResourceId={selectedResourceId}
                                selectableUsers={selectableUsers}
                                highlightedModalUser={highlightedModalUser}
                                setHighlightedModalUser={setHighlightedModalUser}
                                setTaskForTransfer={setTaskForTransfer}
                                activeTask={activeTask}
                                disableButtonForTransfer={disableButtonForTransfer}
                            />
                            <Button
                                color="primary"
                                disabled={disableButton}
                                onClick={() => {
                                    if (taskForTransfer) {
                                        const { userIdToTransfer, eventIdForTransfer } = taskForTransfer
                                        transferProcedureToNewUser(userIdToTransfer, eventIdForTransfer)
                                        setHighlightedModalUser(null)
                                        setActionDialogOpen(false)
                                    }
                                }}
                            >
                                Копирай
                            </Button>
                        </div>
                    </Row>
                    <Row className="mb-2 modal-row-action">
                        <div className="modal-row-action--container">
                            <Button
                                color="primary"
                                onClick={() => {
                                    setOpenModal(true)
                                }}
                            >
                                Отвори детайли
                            </Button>
                        </div>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setActionDialogOpen(false)
                        }}
                    >
                        Отказ
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ActionModal