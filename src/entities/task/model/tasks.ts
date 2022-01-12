import { combine, createEffect, createStore } from "effector";
import { typicodeApi } from "shared/api";
import type {Task} from 'shared/api'
import { useStore } from "effector-react";


const getTasksListFx = createEffect((params?: typicodeApi.tasks.GetTasksListParams) => {
    return typicodeApi.tasks.getTasksList(params)
})

export const tasksInitialState: Record<number, Task> = {}
export const $tasks = createStore(tasksInitialState)
    .on(getTasksListFx.doneData, (_, payload) => payload.data);

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks))
export const $tasksListLoading = getTasksListFx.pending
export const $tasksListEmpty = $tasksList.map((tasks) => tasks.length === 0)

const useTask = (taskId: number): import("shared/api").Task | undefined => {
    return useStore($tasks)[taskId]
}

export const effects = {
    getTasksListFx
}

export const selectors = {
    useTask
}