

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  validation?: {
    pattern: string;
    message: string;
  };
  options?: { value: string; label: string }[];
}

interface JSONSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

interface FormGeneratorProps {
  jsonSchema: string;
}

interface IFormData {
  [key: string]: string | number | boolean; // Or more specific types depending on your fields
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ jsonSchema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>();
  const [copySuccess, setCopySuccess] = useState<string | null>(null); // State for success message
  let parsedSchema: JSONSchema | null = null;

  try {
    parsedSchema = JSON.parse(jsonSchema);
  } catch (err) {
    return <p className="text-red-500">Invalid JSON Schema</p>;
  }

  const onSubmit: SubmitHandler<any> = data => {
    console.log('Form Data:', data);
    toast.success("Form Submitted Successfully");
  };

  const handleCopyJson = () => {
    if (!parsedSchema) return;
    // Copy the JSON schema to the clipboard
    navigator.clipboard.writeText(JSON.stringify(parsedSchema, null, 2))
      .then(() => {
        setCopySuccess('JSON copied to clipboard!');
        // Reset success message after 3 seconds
        setTimeout(() => setCopySuccess(null), 3000);
      })
      .catch((err) => {
        console.log(err)
        setCopySuccess('Failed to copy JSON');
        setTimeout(() => setCopySuccess(null), 3000);
      });
  };

  if (!parsedSchema) return <p className="text-red-500">No valid schema provided</p>;

  return (
    <div>
      <h1 className="text-xl sticky font-bold text-gray-800">{parsedSchema.formTitle}</h1>
      <p className="text-gray-600 mb-4 sticky">{parsedSchema.formDescription}</p>
      
      {/* Copy JSON Button */}
      <button
        onClick={handleCopyJson}
        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4"
      >
        Copy JSON
      </button>
      
      {/* Success or Error Message */}
      {copySuccess && (
        <p className={`text-sm ${copySuccess.startsWith('Failed') ? 'text-red-500' : 'text-green-500'}`}>
          {copySuccess}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {parsedSchema.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
              {field.label}{field.required && <span className="text-red-500">*</span>}
            </label>

            {/* Input Field Types */}
            {field.type === 'text' && (
              <input
                id={field.id}
                type="text"
                {...register(field.id, { required: field.required })}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            )}

            {field.type === 'email' && (
              <input
                id={field.id}
                type="email"
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern
                    ? {
                        value: new RegExp(field.validation.pattern),
                        message: field.validation.message,
                      }
                    : undefined,
                })}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            )}

            {field.type === 'textarea' && (
              <textarea
                id={field.id}
                {...register(field.id, { required: field.required })}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            )}

            {field.type === 'select' && (
              <select
                id={field.id}
                {...register(field.id, { required: field.required })}
                className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'radio' && (
              <div className="space-y-1">
                {field.options?.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={option.value}
                      {...register(field.id, { required: field.required })}
                      className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Validation Error Messages */}
            {errors[field.id] && (
              <p className="text-red-500 text-sm">
                {errors[field.id]?.message || 'This field is required'}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormGenerator;
