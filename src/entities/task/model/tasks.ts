import { combine, createEffect, createEvent, createStore } from "effector";
import { typicodeApi } from "shared/api";
import type {Task} from 'shared/api'
import { useStore } from "effector-react";
import { normalize, schema } from 'normalizr'

const getTasksListFx = createEffect((params?: typicodeApi.tasks.GetTasksListParams) => {
    return typicodeApi.tasks.getTasksList(params)
})

export const taskSchema = new schema.Entity('tasks')
export const normalizeTask = (data: Task) => normalize(data, taskSchema)
export const normalizeTasks = (data: Task[]) => normalize(data, [taskSchema])

export type QueryConfig = {
    completed?: boolean,
    userId?: number
}

const setQueryConfig = createEvent<QueryConfig>()
const toggleTask = createEvent<number>()

export const tasksInitialState: Record<number, Task> = {}
export const $tasks = createStore(tasksInitialState)
    .on(getTasksListFx.doneData, (_, payload) => normalizeTasks(payload.data).entities.tasks)
    .on(toggleTask, (state, taskId) => {
        const task = state[taskId]
        return {
            ...state,
            [task.id]: {
                ...task,
                completed: !task.completed
            }
        }
    });

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks))

export const $queryConfig = createStore<QueryConfig>({})
    .on(setQueryConfig, (_, payload) => payload)

export const $tasksListLoading = getTasksListFx.pending
export const $tasksListEmpty = $tasksList.map((tasks) => tasks.length === 0)

export const $tasksFiltered = combine(
    $tasksList,
    $queryConfig,
    (tasksList, config) => {
        return tasksList.filter(task => (
            config.completed === undefined ||
            task.completed === config.completed
        ))
    }
)


const useTask = (taskId: number): import("shared/api").Task | undefined => {
    return useStore($tasks)[taskId]
}

export const events = {
    setQueryConfig,
    toggleTask
}

export const effects = {
    getTasksListFx
}

export const selectors = {
    useTask
}