
import React from 'react';

interface TextFieldProps {
    label: string;
    placeholder?: string;
    onChange: (value: string) => void;
    value: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, placeholder, onChange, value }) => {
    return (
        <div className="mb-4">
            <label
                className="mb-3 block text-base font-medium text-[#07074D]"
            >
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-56 rounded-md border border-[#e0e0e0] bg-white py-2 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
        </div>
    );
};

export default TextField;
