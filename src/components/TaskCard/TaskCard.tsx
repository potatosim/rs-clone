import { Box, Chip, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconWrapper from 'components/common/IconWrapper';
import { priorityItems } from 'components/PrioritySelect/PrioritySelect';
import { sizeItems } from 'components/SizeSelect/SizeSelect';
import { Queries } from 'enum/Queries';
import { InputsTranslationKeys, TranslationNameSpaces } from 'enum/Translations';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ITaskItem } from 'types/Task';

interface TaskCardProps {
  task: ITaskItem;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const [query, setQuery] = useSearchParams();

  const { t: translate } = useTranslation([
    TranslationNameSpaces.Inputs,
    TranslationNameSpaces.Typography,
  ]);

  const handleSetQuery = () => {
    query.set(Queries.Task, task.id);
    setQuery(query);
  };

  const currentPriority = priorityItems.find((item) => item.priority === task.priority);

  const currentSize = sizeItems.find((item) => item.size === task.size);

  return (
    <Draggable draggableId={task.id} index={task.order}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <Paper
          onClick={handleSetQuery}
          sx={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', rowGap: '1rem' }}
          elevation={8}
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
        >
          <Typography fontWeight={600}>{task.title}</Typography>
          <Box display="flex" columnGap="5px">
            {currentPriority && (
              <Tooltip
                title={translate(InputsTranslationKeys.Priority, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              >
                <Chip
                  variant="outlined"
                  icon={<IconWrapper children={currentPriority.symbol} />}
                  label={translate(currentPriority.priority.toLowerCase(), {
                    ns: TranslationNameSpaces.Typography,
                  })}
                  sx={{ paddingLeft: '0.5rem', cursor: 'pointer' }}
                />
              </Tooltip>
            )}
            {currentSize && (
              <Tooltip
                title={translate(InputsTranslationKeys.Size, {
                  ns: TranslationNameSpaces.Inputs,
                })}
              >
                <Chip
                  variant="outlined"
                  icon={<IconWrapper children={currentSize.symbol} />}
                  label={translate(currentSize.size.toLowerCase(), {
                    ns: TranslationNameSpaces.Typography,
                  })}
                  sx={{ paddingLeft: '0.5rem', cursor: 'pointer' }}
                />
              </Tooltip>
            )}
          </Box>
        </Paper>
      )}
    </Draggable>
  );
};

export default React.memo(TaskCard);
