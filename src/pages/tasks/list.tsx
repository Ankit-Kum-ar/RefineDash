import { useList, useNavigation, useUpdate } from "@refinedev/core"
import { KanbanBoard, KanbanBoardContainer } from "./components/kanban/board"
import KanbanColumn from "./components/kanban/column"
import KanbanItem from "./components/kanban/item"
import { TASK_STAGES_QUERY, TASKS_QUERY } from "@/graphql/queries"
import React from "react"
import { TaskStage, Task } from "@/graphql/schema.types"
import { GetFieldsFromList } from "@refinedev/nestjs-query"
import { TasksQuery } from "@/graphql/types" 
import { ProjectCardMemo } from "./components/kanban/card"
import { KanbanAddCardButton } from "./components/kanban/add-card-button"
import { KanbanColumnSkeleton, ProjectCardSkeleton } from "@/components"
import { DragEndEvent } from "@dnd-kit/core"
import { UPDATE_TASK_STAGE_MUTATION } from "@/graphql/mutations"

type Props = {
  // children?: React.ReactNode,
  onDragEnd: (event: DragEndEvent) => void
}

const List = ( {children, onDragEnd}: React.PropsWithChildren<Props> ) => {

  const { replace } = useNavigation() // The replace is used to determine the navigation of the list.

  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: 'taskStages', // The resource is used to determine the resource of the stages.
    filters: [
      {
        field: 'title', // The field is used to determine the field of the filters.
        operator: 'in',
        value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE'], // Add the value property to the filter object.
      }
    ], // The filters is used to determine the filters of the stages.
    sorters: [
      {
        field: 'createdAt', // The field is used to determine the field to sort by.
        order: 'asc' // The order is used to determine the order to sort by.
      }
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY // The gqlQuery is used to determine the gql query of the stages.
    }
  }) // The data is used to determine the data of the stages. The isLoading is used to determine if the stages are loading.
  const { data: tasks, isLoading: isLoadingTasks } = useList<GetFieldsFromList<TasksQuery>>({
    resource: 'tasks',
    sorters: [{
      field: 'dueDate', // The field is used to determine the field to sort by.
      order: 'asc'  // The order is used to determine the order to sort by.
    }],
    pagination: {
      mode: 'off' // The mode is used to determine the mode of the pagination.
    },
    queryOptions: {
      enabled: !!stages, // The enabled is used to determine if the query is enabled. The !! is used to convert the value to a boolean.
    },
    meta: {
      gqlQuery: TASKS_QUERY
    }
  })

  const { mutate: updateTask } = useUpdate(); // The mutate is used to determine the mutate of the updateTask.

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: []
      }
    }

    const unassignedStage = tasks.data.filter((task) => task.stageId === null)

    const grouped = stages.data.map((stage) => ({
       ...stage,
       tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id) as Task[]
    })) as TaskStage[]

    return {
      unassignedStage,
      columns: grouped
    }
  }, [stages, tasks])

  const handleAddCard = (args: { stageId: string }) => {
    const path = args.stageId === 'unassigned' ? '/tasks/new' : `/tasks/new?stageId=${args.stageId}`
    replace(path)
  }

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null // Here we capture the stageId of the column where the card is dropped.
    const taskId = event.active.id as string // Here we capture the taskId of the card that is being dragged.
    const taskStageId = event.active.data.current?.stageId as string // Here we capture the taskStageId of the card that is being dragged.

    if (taskStageId === stageId) return // If the taskStageId is equal to the stageId, then return.
    
    if (stageId === 'unassigned') {
      stageId = null
    } // If the stageId is equal to 'unassigned', then set the stageId to null.

    updateTask({
      resource: 'tasks',
      id: taskId,
      values: {
        stageId: stageId
      },
      successNotification: false,
      mutationMode: 'optimistic',
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION // The gqlMutation is used to determine the gql mutation of the updateTask.
      }
    }) // Here we update the task with the new stageId.
  }

  const isLoading = isLoadingStages || isLoadingTasks // The isLoading is used to determine if the stages or tasks are loading.

  if (isLoading) return <PageSkeleton /> // The PageSkeleton is used to determine the skeleton of the page.

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd= {handleOnDragEnd}>
          <KanbanColumn
            id="unassigned"
            title="Unassigned"
            count={taskStages.unassignedStage.length || 0} // The count is used to determine the count of the tasks in the column.
            onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
          >
            {
              taskStages.unassignedStage.map((task) => (
                <KanbanItem key={task.id} id={task.id}
                  data={{ ...task, stageId: 'unassigned' }}
                >
                  <ProjectCardMemo
                    {...task}
                    dueDate={task.dueDate || undefined} // The dueDate is used to determine the due date of the task.
                  />
                </KanbanItem>
              ))
            }
            {
              !taskStages.unassignedStage.length && (
                <KanbanAddCardButton
                 onClick={() => handleAddCard({ stageId: 'unassigned' })}
                />
              )
            }
          </KanbanColumn>

          {
            taskStages.columns?.map((column) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                count={column.tasks.length}
                onAddClick={() => handleAddCard({ stageId: column.id })}
              >
                {
                  !isLoading && column.tasks.map((task) => (
                    <KanbanItem key={task.id} id={task.id}
                      data={task}
                    >
                      <ProjectCardMemo
                        {...task}
                        dueDate={task.dueDate || undefined}
                      />
                    </KanbanItem>
                  ))
                }
                {
                  !column.tasks.length && (
                    <KanbanAddCardButton
                      onClick={() => handleAddCard({ stageId: column.id })}
                    />
                  )
                }
              </KanbanColumn>
            ))
          }

        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  )
}

export default List

const PageSkeleton = () => {
  const columnCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      { Array.from({ length: columnCount }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          { Array.from({ length: itemCount }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  )
}