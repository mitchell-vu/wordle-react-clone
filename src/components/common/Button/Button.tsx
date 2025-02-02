import { cn } from '@/utils/classnames';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'md' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, size = 'md', startIcon, endIcon, ...others }) => {
  return (
    <button
      {...others}
      className={cn(
        'flex shrink-0 flex-row items-center justify-center gap-2',
        'rounded-full bg-green-500 font-bold dark:bg-green-600',
        'cursor-pointer',
        {
          'h-9 min-w-36 md:min-w-40': size === 'md',
          'h-12 min-w-40 md:min-w-44': size === 'lg',
        },
        className,
      )}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default Button;
