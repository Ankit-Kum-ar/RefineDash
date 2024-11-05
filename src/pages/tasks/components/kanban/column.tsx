import { Text } from '@/components/text'
import { PlusOutlined } from '@ant-design/icons'
import { useDroppable, UseDroppableArguments } from '@dnd-kit/core'
import { Badge, Button, Space } from 'antd'
import React from 'react'

type Props = {
  id: string,
  title: string,
  description?: React.ReactNode,
  count: number,
  data?: UseDroppableArguments['data'],
  onAddClick? : (args: { id: string }) => void, // The onAddClick is used to determine the onAddClick event of the column
}

const KanbanColumn = ({ children, id, title, description, count, data, onAddClick }: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data
  }) // The isOver is used to determine if the column is being hovered over by a draggable element. The setNodeRef is used to set the ref of the column element. The active is used to determine if the column is active.

  // const count = 2 // The count is used to determine if there are any tasks in the

  const onAddClickHandler = () => {
    onAddClick?.({id}) // This line means that if the onAddClick is defined, then call the onAddClick function with the id as the argument
  } // The onAddClickHandler is used to handle the click event of the button

  // const title = 'TITLE' // The title is used to determine the title of the column
  // const description = 'DESCRIPTION' // The description is used to determine the description of the column

  return (
    <div
      ref={setNodeRef} // This is used to set the ref of the column element
      style={{
        display: 'flex', 
        flexDirection: 'column',
        padding: '0 16px',
      }}
    >
      <div style={{ padding: '12px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Text 
              ellipsis={{ tooltip: title }} // The tooltip is used to show the full text when the text is truncated
              size='xs'
              style={{
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            > 
              {title}
            </Text>
            { !!count && <Badge count={count} color='cyan' />} {/* The count is used to determine if there are any tasks in the column.*/} 
          </Space>
          <Button
            shape='circle' // The shape is used to determine the shape of the button
            icon={<PlusOutlined />} // The icon is used to determine the icon of the button
            onClick={onAddClickHandler} // The onAddClickHandler is used to handle the click event of the button
          />
        </Space>
          {description}
      </div>
      <div
        style={{
          flex: 1, // The flex is used to determine the flex value of the column
          overflowY: active ? 'unset' : 'auto', // The overflowY is used to determine the overflow value of the column
          border: '2px dashed transparent', // The border is used to determine the border value of the column
          borderColor: isOver ? '#000040' : 'transparent', // The borderColor is used to determine the border color value of the column
          borderRadius: '4px', // The borderRadius is used to determine the border radius value of the column
        }}
      >
        <div
          style={{
            marginTop: '12px', // The marginTop is used to determine the margin top value of the column
            display: 'flex', // The display is used to determine the display value of the column
            flexDirection: 'column', // The flexDirection is used to determine the flex direction value of the column
            gap: '8px', // The gap is used to determine the gap value of the column
          }}
        >
          {/* The children of the column */}
          { children }
        </div>

      </div>
    </div>
  )
}

export default KanbanColumn
