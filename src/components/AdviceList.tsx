import React, { useEffect, useState } from 'react';
import { getAdvicesByGoal } from '../api/suggestionsApi';
import { Suggestion } from '../interfaces/suggestion';
import { CircularProgress, Typography, List, ListItem, ListItemText } from '@mui/material';

interface AdviceListProps {
  goalId: number;
}

const AdviceList: React.FC<AdviceListProps> = ({ goalId }) => {
  const [advices, setAdvices] = useState<Suggestion[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvices = async () => {
      try {
        const response = await getAdvicesByGoal(goalId);
        setAdvices(response.data);
      } catch (err) {
        setError('Error al cargar las sugerencias');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvices();
  }, [goalId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Sugerencias para tu meta
      </Typography>
      <List>
        {advices?.map((advice) => (
          <ListItem key={advice.id}>
            <ListItemText primary={`Consejo ${advice.id}: ${advice.content}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AdviceList;
