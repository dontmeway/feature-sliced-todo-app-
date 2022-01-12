import { Checkbox } from "antd";
import { taskLib, taskModel } from "entities/task";
import React from "react";

export type ToggleTaskProps = {
  taskId: number;
  withStatus?: boolean;
};

export const ToggleTask = ({ taskId, withStatus = true }: ToggleTaskProps) => {
  const task = taskModel.selectors.useTask(taskId);

  if (!task) return null;

  const status = taskLib.getTaskStatus(task);

  return (
    <Checkbox
      onClick={() => taskModel.events.toggleTask(taskId)}
      checked={task.completed}
    >
      {withStatus && status}
    </Checkbox>
  );
};
