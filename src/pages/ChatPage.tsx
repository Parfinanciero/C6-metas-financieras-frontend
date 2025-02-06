import React, { useState } from 'react';
import { Typography, Button, TextField, Box, Paper } from '@mui/material';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, inputMessage]);
      setInputMessage('');
    }
  };

  return (
    <div>
      <Typography variant="h4" color="textPrimary" gutterBottom>
        Chat en Vivo
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Aquí puedes chatear en tiempo real con otros usuarios.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '400px',
          overflowY: 'auto',
          marginBottom: '16px',
        }}
      >
        {messages.map((message, index) => (
          <Paper key={index} sx={{ padding: '8px', marginBottom: '8px' }}>
            <Typography variant="body2">{message}</Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: '8px' }}>
        <TextField
          fullWidth
          label="Escribe tu mensaje"
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};

export default ChatPage;
