import React, {useState} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {addNewQAPair} from "../models/APIManager";

interface AddQAPopupProps {
    onClose: () => void;
}

const AddQAPopup: React.FC<AddQAPopupProps> = ({onClose}) => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');

    const handleSubmit = () => {
        // Dispatch updateQAPair action with item ID, new question, and new answer

        // setNewQuestion(document.getElementById("new_question").innerHTML)
        console.log('NewQuestion: ' + newQuestion, 'NewAnswer: ' + newAnswer);
        addNewQAPair(newQuestion, newAnswer)
            .then(data => {
                console.log('Response body data:', data);
            })
            .catch(error => {
                console.error('Error fetching QA data:', error);
            });
        onClose(); // Close the popup
    };

    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 z-50">
            <button className="absolute top-0 right-0 px-3 py-1 text-gray-600 hover:text-gray-800"
                    onClick={onClose}>
                &times;
            </button>
            <h2 className="text-xl font-semibold mb-2">Add New QA Pair</h2>
            <label className="block mb-4">
                Question:
                <input id="new_question" type="text" className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                       value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}/>
            </label>
            <CKEditor
                id="new_answer"
                editor={ClassicEditor}
                data={newAnswer}
                config={{
                    // Your CKEditor configuration options
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(data);
                    setNewAnswer(data);
                }
                }
            />
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-blue-900 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default AddQAPopup;
