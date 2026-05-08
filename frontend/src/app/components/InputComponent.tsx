import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

interface InputComponentProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  textError?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({ id, name, value, onChange, invalid, textError }) => {
  return (
    <div className="flex flex-wrap align-items-center mb-3 gap-2">
        <InputText
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full ${invalid ? 'p-invalid' : ''}`}
            onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#c2c2c2';
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = '#c2c2c2';
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = '#c2c2c2';
            }}
        />
        { invalid && <Message severity="error" text={textError || "Campo obrigatório!"} />}
    </div>
  );
};

export default InputComponent;
