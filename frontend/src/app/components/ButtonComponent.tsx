import React from "react";
import { Button } from 'primereact/button';

interface ButtonProps {
  onClick?: () => void;
  title: string | React.ReactNode;
  className?: string;
}


const ButtonComponent: React.FC<ButtonProps> = ({ onClick, title }) => {
  return (
    <Button 
      outlined
      severity="secondary"
      onClick={onClick} 
      style={{
        padding: '8px 14px',
        border: '1.5px solid #131313',
        color: '#131313',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#000';
        (e.currentTarget as HTMLButtonElement).style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'white';
        (e.currentTarget as HTMLButtonElement).style.color = '#131313';
      }}
    >
      {title}
    </Button>

  );
};

export default ButtonComponent;