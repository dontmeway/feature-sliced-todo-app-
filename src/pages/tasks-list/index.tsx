import { Col, Empty, Layout, Row, Spin, Typography } from "antd";
import { useStore } from "effector-react";
import { taskModel, TaskRow } from "entities/task";
import { useEffect } from "react";

import styles from "./styles.module.scss";

const TasksListPage = () => {
  const tasks = useStore(taskModel.$tasksList);
  const isLoading = useStore(taskModel.$tasksListLoading);
  const isEmpty = useStore(taskModel.$tasksListEmpty);

  useEffect(() => {
    taskModel.effects.getTasksListFx();
  }, []);

  return (
    <Layout className={styles.root}>
      <Layout.Header className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        {/* TODO: TasksFilters */}
      </Layout.Header>
      <Layout.Content className={styles.content}>
        <Row justify="center" gutter={[0, 20]}>
          {isLoading && <Spin size="large" />}
          {!isLoading &&
            tasks.map((task) => (
              <Col key={task.id} span={24}>
                <TaskRow titleHref={`/${task.id}`} data={task} />
              </Col>
            ))}
          {!isLoading && isEmpty && <Empty description="No tasks found" />}
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default TasksListPage;
