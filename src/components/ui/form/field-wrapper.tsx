import { type ReactNode } from 'react';
import { type FieldError } from 'react-hook-form';

import { FormError } from './error';

export type FieldWrapperProps = {
  label?: string | undefined;
  className?: string | undefined;
  children: ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = ({ label, error, children }: FieldWrapperProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        <div className="mt-1">{children}</div>
      </label>
      <FormError errorMessage={error?.message} />
    </div>
  );
};
