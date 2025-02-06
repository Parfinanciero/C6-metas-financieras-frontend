import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Typography } from '@mui/material';
import { Goal, GoalStatus } from '../interfaces/goal';
import { statusTranslations, statusReverseTranslations } from '../utils/translations';
import { updateGoal } from '../api/goalsApi'; // Asegúrate de que la importación sea correcta

interface GoalEditFormProps {
  goalId: number; // Necesitamos el ID de la meta para actualizarla
  initialValues: Pick<Goal, 'date_end' | 'current_amount' | 'status' | 'title' | 'description' | 'date_start' | 'goal_amount'>;
}

const GoalEditForm: React.FC<GoalEditFormProps> = ({ goalId, initialValues }) => {
  const [formValues, setFormValues] = useState({
    date_end: new Date(initialValues.date_end).toISOString().split('T')[0], // Asegura formato YYYY-MM-DD
    current_amount: initialValues.current_amount,
    status: initialValues.status, // Usamos el valor del status directamente
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'current_amount' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Traducimos el estado al formato requerido por el backend
    const translatedStatus = statusReverseTranslations[formValues.status as unknown as keyof typeof statusReverseTranslations];

    const translatedValues = {
      ...formValues,
      status: translatedStatus as GoalStatus, // Aseguramos que sea GoalStatus
    };

    try {
      await updateGoal(goalId, translatedValues); // Llamamos a updateGoal con el ID y los datos
      alert("Meta actualizada con éxito.");
    } catch (error) {
      alert("Error al actualizar la meta.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Editar Meta Financiera
          </Typography>
        </Grid>

        {/* Título (solo lectura) */}
        <Grid item xs={12}>
          <TextField fullWidth label="Título" value={initialValues.title} InputProps={{ readOnly: true }} />
        </Grid>

        {/* Descripción (solo lectura) */}
        <Grid item xs={12}>
          <TextField fullWidth label="Descripción" value={initialValues.description} InputProps={{ readOnly: true }} multiline rows={3} />
        </Grid>

        {/* Fecha de inicio (solo lectura) */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Fecha de inicio" value={new Date(initialValues.date_start).toLocaleDateString()} InputProps={{ readOnly: true }} />
        </Grid>

        {/* Monto objetivo (solo lectura) */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Meta financiera (COP)" value={initialValues.goal_amount.toLocaleString()} InputProps={{ readOnly: true }} />
        </Grid>

        {/* Fecha de fin (editable) */}
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

        {/* Cantidad actual (editable) */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Cantidad actual (COP)" name="current_amount" value={formValues.current_amount} onChange={handleChange} type="number" required />
        </Grid>

        {/* Estado (editable) */}
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

        {/* Botón de enviar */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Guardar Cambios
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GoalEditForm;
