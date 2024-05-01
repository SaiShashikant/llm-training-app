import React, {useState} from 'react';
import {base_url} from "../models/APIManager";

const BulkRemoveText = () => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Question');
    const [isQuestion, setIsQuestion] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    console.log("================================")
    const processCleanText = () => {
        const post_body = JSON.stringify({
            'wrong_string': text,
            'isQuestion': isQuestion,
        });

        fetch(base_url + '/api/clean_items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: post_body,
        })
            .then(response => response.json())
            .then(data => {
                setStatusMessage(`${data.message}\nCleaned ${data.total_items}. Found text in ${data.items_with_text} items.`);
                //refresh the list
                window.location.reload();
            })
            .catch(error => {
                console.error('Error cleaning text:', error);
            });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
        setIsQuestion(e.target.value.includes('Question'));
    };

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
            <label htmlFor="bulk-remove-text">Text to Remove:</label>
            <textarea id="bulk-remove-text" value={text} onChange={(e) => setText(e.target.value)}></textarea>

            <label htmlFor="category">Category:</label>
            <select id="category" value={category} onChange={handleCategoryChange}>
                <option value="Question">Question</option>
                <option value="Answer">Answer</option>
            </select>

            <button onClick={processCleanText}>Clean Text</button>

            <div id="bulk-remove-text-status">{statusMessage}</div>
        </div>
    );
};

export default BulkRemoveText;
