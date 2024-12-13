import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, Box, Paper, Grid, Divider } from '@mui/material';

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [messages, setMessages] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(res.data.message);
    } catch (error) {
      alert('Error uploading file');
    }
  };

  const handleQuery = async () => {
    try {
      const res = await axios.post('http://localhost:5000/query', { query });
      setMessages([{ query, response: res.data.response }, ...messages]);
      setQuery('');
    } catch (error) {
      alert('Error querying document');
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Document Query App
        </Typography>
        <Box mb={3} display="flex" justifyContent="center">
          <input
            accept="*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload Document
            </Button>
          </label>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleUpload}
            disabled={!file}
            style={{ marginLeft: '10px' }}
          >
            Submit Document
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ padding: '20px', height: 'calc(100vh - 200px)', position: 'relative', display: 'flex' }}>
              <Divider orientation="vertical" flexItem style={{ position: 'absolute', left: '50%', top: 0, height: '100%', backgroundColor: 'gray' }} />
              <Box flex={1} pr={2} style={{ overflowY: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                  Document Preview
                </Typography>
                {previewUrl && (
                  <iframe
                    src={previewUrl}
                    title="Document Preview"
                    style={{ width: '100%', height: 'calc(100% - 60px)', border: 'none' }}
                    frameBorder="0"
                  ></iframe>
                )}
              </Box>
              <Box flex={1} pl={2} style={{ overflowY: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                  Chatbot Queries
                </Typography>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    label="Enter your query"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </Box>
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={handleQuery}>
                    Query
                  </Button>
                </Box>
                <Box mt={3}>
                  <Typography variant="h5">Messages:</Typography>
                  {messages.map((msg, index) => (
                    <Paper key={index} style={{ padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
                      <Typography variant="body1"><strong>Query:</strong> {msg.query}</Typography>
                      <Typography variant="body1"><strong>Response:</strong> {msg.response}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default App;
