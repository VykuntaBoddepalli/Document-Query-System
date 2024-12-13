// src/components/DocumentQuery.js
import React, { useState } from 'react';
import axios from 'axios';

const DocumentQuery = () => {
    const [documentId, setDocumentId] = useState('');
    const [query, setQuery] = useState('');
    const [queryResult, setQueryResult] = useState(null);

    const handleQuery = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/query', {
                document_id: documentId,
                query: query
            });
            setQueryResult(response.data);
        } catch (error) {
            console.error('Error querying document:', error);
        }
    };

    return (
        <div>
            <input type="text" value={documentId} onChange={(e) => setDocumentId(e.target.value)} placeholder="Document ID" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Query" />
            <button onClick={handleQuery}>Query</button>
            {queryResult && <pre>{JSON.stringify(queryResult, null, 2)}</pre>}
        </div>
    );
};

export default DocumentQuery;
