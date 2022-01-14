import { reflect } from "@effector/reflect";
import { Radio } from "antd";
import { taskModel } from "entities/task";
import { DEFAULT_FILTER, filtersList, getFilterById } from "./config";

type Props = {
  loading: boolean;
  onFilterClick: (p: taskModel.QueryConfig) => void;
};

const View = ({ loading, onFilterClick }: Props) => {
  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id }) => (
        <Radio.Button
          key={id}
          value={id}
          disabled={loading}
          onClick={() => onFilterClick(getFilterById(id).config)}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

export const TasksFilter = reflect({
  view: View,
  bind: {
    loading: taskModel.$tasksListLoading,
    onFilterClick: taskModel.events.setQueryConfig,
  },
});
