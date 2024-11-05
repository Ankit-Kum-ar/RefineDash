import { DragOverlay, useDraggable, UseDraggableArguments } from '@dnd-kit/core'
import React from 'react'

interface Props {
    id: string
    data?: UseDraggableArguments['data'] // The data is used to determine the data of the draggable element 
}

const KanbanItem = ({ children, id, data } : React.PropsWithChildren<Props>) => {
    const { attributes, listeners, setNodeRef, active } = useDraggable({
        id,
        data
    }) // The attributes is used to set the attributes of the draggable element. The listeners is used to set the listeners of the draggable element. The setNodeRef is used to set the ref of the draggable element. The active is used to determine if the draggable element is active.
    return (
        <div
            style={{
                position: 'relative', // The position is used to determine the position of the draggable element
            }}
        >
            <div
                ref={setNodeRef} // This is used to set the ref of the draggable element
                {...attributes} // This is used to set the attributes of the draggable element
                {...listeners} // This is used to set the listeners of the draggable element
                style={{ 
                    opacity: active ? ( active.id === id ? 1 : 0.5 ) : 1, // The opacity is used to determine the opacity of the draggable element
                    borderRadius: '8px',
                    position: 'relative', // The position is used to determine the position of the draggable element
                    cursor: 'grab' // The cursor is used to determine the cursor of the draggable element
                }}
            >
                {
                    active?.id === id && (
                        <DragOverlay zIndex={1000}>
                            <div
                                style={{
                                    borderRadius: '8px',
                                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                                    cursor: 'grabbing',
                                }}
                            >
                                {children}
                            </div>
                        </DragOverlay>
                    )
                }
                {children}
            </div>
        </div>
    )
}

export default KanbanItem
