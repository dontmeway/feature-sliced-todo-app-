import React, { lazy } from "react";
import { Route, Routes } from "react-router";

const TasksListPage = lazy(() => import("./tasks-list"));
const TaskDetailsPage = lazy(() => import("./task-details"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksListPage />} />
      <Route path="/:taskId" element={<TaskDetailsPage />} />
    </Routes>
  );
};
