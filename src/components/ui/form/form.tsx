import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode } from 'react';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from 'react-hook-form';
import { type ZodType, type z } from 'zod';

import { cn } from '@/utils/cn';

type FormProps<
  Schema extends ZodType,
  TFormValues extends FieldValues = z.infer<Schema>,
> = {
  onSubmit: SubmitHandler<TFormValues>;
  schema: Schema;
  className?: string;
  id?: string;
  options?: UseFormProps<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
};

/**
 * Schema-first form wrapper. Pass a Zod schema; the field values type is
 * inferred from it (no separate type to keep in sync). See
 * docs/state-management.md (Form State).
 */
export const Form = <
  Schema extends ZodType,
  TFormValues extends FieldValues = z.infer<Schema>,
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<Schema, TFormValues>) => {
  const form = useForm<TFormValues>({
    ...options,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...form}>
      <form
        className={cn('space-y-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        id={id}
      >
        {children(form)}
      </form>
    </FormProvider>
  );
};
