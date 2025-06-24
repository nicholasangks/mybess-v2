'use client';

import { useState } from 'react';

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function Switch({ checked = false, onChange, className = '' }: SwitchProps) {
  const [isOn, setIsOn] = useState(checked);

  const toggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      onClick={toggle}
      className={`w-[3rem] h-[1.5rem] p-[2px] rounded-full cursor-pointer transition-all
        ${isOn ? 'bg-primary' : 'bg-muted dark:bg-muted-d'} ${className}`}
    >
      <div
        className={`h-full aspect-square rounded-full bg-white shadow-sm transition-all
          ${isOn ? 'translate-x-[1.5rem]' : 'translate-x-0'}`}
      />
    </div>
  );
}
