import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import React from 'react'

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
        style={{
          width: 'calc(100% + 64px)', // 64px is the width of the scrollbar
          height: 'calc(100vh - 64px)', // 64px is the height of the header
          display: 'flex',
          justifyContent: 'column', // This should be 'column' but it's not a valid value
          margin: '-32px', 
        }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '32px',
          overflow: 'scroll'
        }}
      >
        {children}
      </div>
    </div>
  )
}

type Props = {
  onDragEnd: (event: DragEndEvent) => void
}

export const KanbanBoard = ({ children, onDragEnd } : React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { // The activationConstraint is used to determine the activation constraint of the sensor.
      distance: 5
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { // The activationConstraint is used to determine the activation constraint of the sensor.
      distance: 5
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor) // The sensors is used to determine the sensors of the board.

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
        {children}
    </DndContext>
  )
}