// src/components/JSONEditor.tsx
import React from 'react';

interface JSONEditorProps {
  jsonSchema: string;
  setJsonSchema: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ jsonSchema, setJsonSchema }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonSchema(e.target.value);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <textarea
        value={jsonSchema}
        onChange={handleInputChange}
        placeholder="Enter your JSON schema here..."
        className="w-5/6 h-5/6 p-4 text-sm font-mono border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>
  );
};

export default JSONEditor;
