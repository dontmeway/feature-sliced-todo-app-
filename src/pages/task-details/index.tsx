import { reflect } from "@effector/reflect";
import { Button, Layout, Result } from "antd";
import { TaskCard, taskModel } from "entities/task";
import { ToggleTask } from "features/toggle-task";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

type Props = {
  isLoading: boolean;
};

const View = ({ isLoading }: Props) => {
  const taskId = Number(useParams().taskId);
  const task = taskModel.selectors.useTask(taskId);

  useEffect(() => {
    taskModel.effects.getTaskByIdFx({ taskId });
  }, [taskId]);

  if (!task && !isLoading) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Task was not found"
        extra={
          <Link to="/">
            <Button type="primary">Back to tasks list {taskId}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Layout className={styles.root}>
      <Layout.Content className={styles.content}>
        <TaskCard
          data={task}
          size="default"
          loading={isLoading}
          className={styles.card}
          bodyStyle={{ height: 400 }}
          extra={<Link to="/">Back to TasksList</Link>}
          actions={[<ToggleTask key="toggle" taskId={taskId} />]}
        />
      </Layout.Content>
    </Layout>
  );
};

const TaskDetailsPage = reflect({
  view: View,
  bind: {
    isLoading: taskModel.$taskDetailsLoading,
  },
});

export default TaskDetailsPage;
