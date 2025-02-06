import React from 'react';
import { Box, Typography, List, ListItem, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Goal } from '../interfaces/goal';

interface GoalListProps {
  goals: Goal[];
}

const GoalList: React.FC<GoalListProps> = ({ goals }) => {
  const navigate = useNavigate();

  const handleGoalClick = (id: number) => {
    navigate(`/goal/${id}`);
  };

  return (
    <Box>
      {goals.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No tienes metas registradas.
        </Typography>
      ) : (
        <List>
          {goals.map((goal, index) => {
            const progress = (goal.current_amount / goal.goal_amount) * 100;

            return (
              <ListItem
                key={goal.id}
                sx={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  marginBottom: 2,
                  borderRadius: 2,
                  padding: 1.5,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#1c1c1c',
                  },
                }}
                onClick={() => handleGoalClick(goal.id)}
              >
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  {index + 1}. {goal.title}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  {goal.description}
                </Typography>

                <Box sx={{ width: '100%' }}>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    {progress.toFixed(2)}% cumplido
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 10,
                      backgroundColor: '#4E207C',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#C68FF5',
                      },
                    }}
                  />
                </Box>
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default GoalList;
