import { list, variant } from "@effector/reflect";
import { Col, Empty, Layout, Row, Spin, Typography } from "antd";
import { combine } from "effector";
import { taskModel, TaskRow } from "entities/task";
import { TasksFilter } from "features/tasks-filter";
import { ToggleTask } from "features/toggle-task";

import styles from "./styles.module.scss";

const TasksListPage = () => {
  return (
    <Layout className={styles.root}>
      <Layout.Header className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        <Row justify="center">
          <TasksFilter />
        </Row>
      </Layout.Header>
      <Layout.Content className={styles.content}>
        <Row justify="center" gutter={[0, 20]}>
          <PageContent />
        </Row>
      </Layout.Content>
    </Layout>
  );
};

const ListItemView: React.FC<{ task: import("shared/api").Task }> = ({
  task,
}) => {
  return (
    <Col key={task.id} span={24}>
      <TaskRow
        titleHref={`/${task.id}`}
        data={task}
        before={<ToggleTask taskId={task.id} withStatus={false} />}
      />
    </Col>
  );
};

const TasksList = list({
  view: ListItemView,
  source: taskModel.$tasksFiltered,
  mapItem: {
    task: (task) => task,
  },
});

const PageContent = variant({
  source: combine(
    {
      isLoading: taskModel.$tasksListLoading,
      isEmpty: taskModel.$tasksListEmpty,
    },
    ({ isEmpty, isLoading }) => {
      if (isLoading) return "loading";
      if (isEmpty) return "empty";
      return "ready";
    }
  ),
  cases: {
    loading: () => <Spin size="large" />,
    empty: () => <Empty description="No tasks found" />,
    ready: TasksList,
  },
  hooks: {
    mounted: taskModel.effects.getTasksListFx.prepend(() => {}),
  },
});

export default TasksListPage;
