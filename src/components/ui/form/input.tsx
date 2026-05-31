import type * as React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import {
  FieldWrapper,
  type FieldWrapperPassThroughProps,
} from './field-wrapper';

import { cn } from '@/utils/cn';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name'
> &
  FieldWrapperPassThroughProps & {
    className?: string;
    registration: Partial<UseFormRegisterReturn>;
  };

export const Input = ({
  className,
  type = 'text',
  label,
  error,
  registration,
  ...props
}: InputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={cn(
          'focus:border-ring focus:ring-ring border-input block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-1 focus:outline-none',
          className,
        )}
        {...registration}
        {...props}
      />
    </FieldWrapper>
  );
};
