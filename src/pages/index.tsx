import React, { lazy } from "react";
import { Route, Routes } from "react-router";

const TasksListPage = lazy(() => import("./tasks-list"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksListPage />} />
      <Route path="/*" element={<div>lorem</div>} />
    </Routes>
  );
};
