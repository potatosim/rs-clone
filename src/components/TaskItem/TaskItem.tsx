import {
  Card,
  Skeleton,
  CardContent,
  TextareaAutosize,
  Box,
  Avatar,
  SelectChangeEvent,
  Tabs,
  Tab,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { ModalWrapper } from 'components/common/ModalWrapper';
import { Queries } from 'enum/Queries';
import { useTask } from 'hooks/taskHooks/useTask';
import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import TaskHeader from 'components/TaskHeader';
import Selector, { OptionItem } from 'components/common/CustomSelect';
import CustomSelect from 'components/common/CustomSelect';
import { IColumnItem } from 'types/Column';
import { ITaskItem } from 'types/Task';
import PrioritySelect from 'components/PrioritySelect';
import SizeSelect from 'components/SizeSelect';
import History from 'components/History';
import TabPanel from 'components/TabPanel/TabPanel';
import { TaskTabs } from 'enum/TaskTabs';

interface TaskItemProps {
  taskId: string;
  isTaskOpen: boolean;
  columns: IColumnItem[];
}

const StyledCard = styled(Card)`
  width: 60%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const StyledCardContent = styled(CardContent)`
  grid-area: 2 / 1 / 7 / 4;
  border-right: 2px double black;
`;

const StyledCardContentOptions = styled(CardContent)`
  display: flex;
  row-gap: 1rem;
  flex-direction: column;
  grid-area: 2 / 4 / 7 / 5;
`;

const getCurrentColumnOption = (columns: IColumnItem[], task: ITaskItem): OptionItem => {
  const currentColumn = columns.filter((column) => column.id === task.columnId)[0];

  return {
    value: currentColumn.id,
    title: currentColumn.title,
  };
};

const getColumnsOptions = (columns: IColumnItem[]): OptionItem[] =>
  columns.map((column) => ({ title: column.title, value: column.id }));

const TaskItem: FC<TaskItemProps> = (props) => {
  if (!props.isTaskOpen) {
    return null;
  }

  return <Task {...props} />;
};

const Task: FC<TaskItemProps> = ({ taskId, isTaskOpen, columns }) => {
  const [query, setQuery] = useSearchParams();
  const {
    task,
    loading,
    handleUpdateTaskTitle,
    handleChangeTaskColumn,
    handleChangePriority,
    handleChangeSize,
  } = useTask(taskId, columns);
  const [activeTab, setActiveTab] = useState<TaskTabs>(TaskTabs.History);

  const close = () => {
    query.delete(Queries.Task);
    setQuery(query);
  };

  if (!task || loading) {
    return <CircularProgress />;
  }

  const handleChangeTab = (event: React.SyntheticEvent<Element, Event>, value: TaskTabs) => {
    setActiveTab(value);
  };

  return (
    <ModalWrapper disableAutoFocus open={isTaskOpen} onClose={close}>
      <StyledCard>
        <TaskHeader
          taskId={taskId}
          handleUpdateTitle={handleUpdateTaskTitle}
          handleClose={close}
          taskTitle={task.title}
        />

        <StyledCardContent>
          <Typography fontWeight={600}>Description:</Typography>
          {/* <Typography variant="body1">{task.description}</Typography> */}
          <TextareaAutosize
            placeholder="No description provided"
            defaultValue={task.description}
            style={{ width: '80%', minHeight: 100 }}
          />
          <Tabs
            // sx={{ marginLeft: 'auto' }}
            // textColor="inherit"
            // indicatorColor="primary"
            value={activeTab}
            onChange={handleChangeTab}
          >
            <Tab value={TaskTabs.History} label={TaskTabs.History}></Tab>
            <Tab value={TaskTabs.Comments} label={TaskTabs.Comments}></Tab>
          </Tabs>
          <TabPanel value={activeTab} index={TaskTabs.History}>
            <History history={task.history} />
          </TabPanel>
          <TabPanel index={TaskTabs.Comments} value={activeTab}></TabPanel>
        </StyledCardContent>
        <StyledCardContentOptions>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
            <Typography>Assignees:</Typography>
            {}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
            <Typography>Status:</Typography>
            <CustomSelect
              currentOption={getCurrentColumnOption(columns, task)}
              onChange={(e: SelectChangeEvent) => {
                handleChangeTaskColumn(e.target.value);
              }}
              options={getColumnsOptions(columns)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
            <Typography>Priority:</Typography>
            <PrioritySelect
              currentPriority={task.priority}
              onPriorityChange={(e: SelectChangeEvent) => {
                handleChangePriority(e.target.value, task.id);
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
            <Typography>Size:</Typography>
            <SizeSelect
              currentSize={task.size}
              onSizeChange={(e: SelectChangeEvent) => {
                handleChangeSize(e.target.value, task.id);
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '1rem' }}>
            <Typography>Created by:</Typography>
            <Avatar
              alt="unknown"
              src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Funknown-person-flat-icon-vector-15222119&psig=AOvVaw3x4hkSxZMLep5UvxU9L7Jh&ust=1676220987138000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLDozPX3jf0CFQAAAAAdAAAAABAE"
            ></Avatar>
          </Box>
        </StyledCardContentOptions>
      </StyledCard>
    </ModalWrapper>
  );
};

export default TaskItem;
