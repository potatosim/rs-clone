import { Card, CardContent, Box, SelectChangeEvent, Tabs, Tab, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { ModalWrapper } from 'components/common/ModalWrapper';
import { Queries } from 'enum/Queries';
import { useTask } from 'hooks/taskHooks/useTask';
import { FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import TaskHeader from 'components/TaskHeader';
import { OptionItem } from 'components/common/CustomSelect';
import CustomSelect from 'components/common/CustomSelect';
import { IColumnItem } from 'types/Column';
import { ITaskItem } from 'types/Task';
import PrioritySelect from 'components/PrioritySelect';
import SizeSelect from 'components/SizeSelect';
import History from 'components/History';
import TabPanel from 'components/TabPanel/TabPanel';
import { TaskTabs } from 'enum/TaskTabs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CommentsTab from 'components/CommentsTab';
import AssigneeSelect from 'components/AssigneeSelect';
import DescriptionField from 'components/DescriptionField';
import Divider from '@mui/material/Divider';

interface TaskItemProps {
  taskId: string;
  isTaskOpen: boolean;
  columns: IColumnItem[];
  boardId: string;
}

const StyledCard = styled(Card)`
  width: 70%;
  height: 650px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

const StyledCardContent = styled(CardContent)`
  grid-area: 2 / 1 / 7 / 4;
  border-right: 2px double lightgrey;
`;

const StyledCardContentOptions = styled(CardContent)`
  display: flex;
  padding: 2rem;
  row-gap: 2rem;
  flex-direction: column;
`;

const StyledBox = styled(Box)`
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

const Task: FC<TaskItemProps> = ({ taskId, isTaskOpen, columns, boardId }) => {
  const [query, setQuery] = useSearchParams();
  const {
    task,
    loading,
    handleUpdateTaskTitle,
    handleUpdateDescription,
    handleChangeTaskColumn,
    handleChangePriority,
    handleChangeSize,
    handleDeleteTask,
    handleAddComment,
  } = useTask(taskId, columns);
  const [activeTab, setActiveTab] = useState<TaskTabs>(TaskTabs.History);

  const close = () => {
    query.delete(Queries.Task);
    setQuery(query);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!task) {
    close();
    return null;
  }

  const handleChangeTab = (event: React.SyntheticEvent<Element, Event>, value: TaskTabs) => {
    setActiveTab(value);
  };

  const handleDelete = async () => {
    close();
    await handleDeleteTask();
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

          <DescriptionField
            taskDescription={task.description}
            onSubmit={(e) => {
              handleUpdateDescription(e);
            }}
          />
          <Divider />

          <Tabs value={activeTab} onChange={handleChangeTab}>
            <Tab value={TaskTabs.History} label={TaskTabs.History}></Tab>
            <Tab value={TaskTabs.Comments} label={TaskTabs.Comments}></Tab>
          </Tabs>
          <TabPanel value={activeTab} index={TaskTabs.History}>
            <History history={task.history} />
          </TabPanel>
          <TabPanel index={TaskTabs.Comments} value={activeTab}>
            <CommentsTab comments={task.comments} handleAddComment={handleAddComment} />
          </TabPanel>
        </StyledCardContent>
        <StyledBox>
          <StyledCardContentOptions>
            <AssigneeSelect taskId={task.id} currentUser={task.assignee} boardId={boardId} />

            <CustomSelect
              currentOption={getCurrentColumnOption(columns, task)}
              onChange={(e: SelectChangeEvent) => {
                handleChangeTaskColumn(e.target.value);
              }}
              options={getColumnsOptions(columns)}
            />

            <PrioritySelect
              currentPriority={task.priority}
              onPriorityChange={(e: SelectChangeEvent) => {
                handleChangePriority(e.target.value as ITaskItem['priority'], task.id);
              }}
            />

            <SizeSelect
              currentSize={task.size}
              onSizeChange={(e: SelectChangeEvent) => {
                handleChangeSize(e.target.value as ITaskItem['size'], task.id);
              }}
            />
            <Button
              color="secondary"
              onClick={handleDelete}
              variant="contained"
              startIcon={<DeleteForeverIcon />}
            >
              Delete this task
            </Button>
          </StyledCardContentOptions>
        </StyledBox>
      </StyledCard>
    </ModalWrapper>
  );
};

export default TaskItem;
