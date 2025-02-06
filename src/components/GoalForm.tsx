import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Typography } from '@mui/material';
import { Goal, GoalStatus } from '../interfaces/goal';
import { statusTranslations, statusReverseTranslations } from '../utils/translations';
import apiGoal from '../api/goalsApi';  // Asegúrate de importar correctamente la función createGoal

interface FormValues extends Omit<Goal, 'id' | 'user_id'> {}

interface GoalFormProps {
  onSubmit: (data: Omit<Goal, 'id' | 'user_id'>) => void;
  initialValues?: FormValues;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, initialValues }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    date_start: initialValues?.date_start ? new Date(initialValues.date_start).toISOString().split('T')[0] : '',
    date_end: initialValues?.date_end ? new Date(initialValues.date_end).toISOString().split('T')[0] : '',
    status: initialValues?.status || GoalStatus.CREATED,
    goal_amount: initialValues?.goal_amount || 0,
    current_amount: initialValues?.current_amount || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'goal_amount' || name === 'current_amount' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Traducimos el estado al formato requerido por el backend
    const translatedStatus = statusReverseTranslations[formValues.status as unknown as keyof typeof statusReverseTranslations];
    const translatedValues: Omit<Goal, 'id' | 'user_id'> = {
      ...formValues,
      status: translatedStatus as GoalStatus, // Aseguramos que el estado esté tipado correctamente
    };

    try {
      await apiGoal.createGoal(translatedValues);  // Llamada a la API para crear la meta
      onSubmit(translatedValues);  // Llamamos al onSubmit si la creación fue exitosa
    } catch (error) {
      console.error('Error al crear la meta:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" gutterBottom>
            Crear Meta Financiera
          </Typography>
        </Grid>

        {/* Título */}
        <Grid item xs={12}>
          <TextField fullWidth label="Título" name="title" value={formValues.title} onChange={handleChange} required />
        </Grid>

        {/* Descripción */}
        <Grid item xs={12}>
          <TextField fullWidth label="Descripción" name="description" value={formValues.description} onChange={handleChange} multiline rows={3} required />
        </Grid>

        {/* Fecha de inicio */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de inicio"
            name="date_start"
            value={formValues.date_start}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>

        {/* Fecha de fin */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Fecha de fin"
            name="date_end"
            value={formValues.date_end}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>

        {/* Estado */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Estado"
            name="status"
            value={formValues.status}
            onChange={handleChange}
            required
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: '#000000', // Fondo negro del menú
                    color: '#FFFFFF', // Texto blanco
                  },
                },
              },
            }}
          >
            {Object.entries(statusTranslations).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Meta financiera */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Meta financiera (COP)" name="goal_amount" value={formValues.goal_amount} onChange={handleChange} type="number" required />
        </Grid>

        {/* Cantidad actual */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Cantidad actual (COP)" name="current_amount" value={formValues.current_amount} onChange={handleChange} type="number" required />
        </Grid>

        {/* Botón de enviar */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar Meta
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GoalForm;
