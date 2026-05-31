export type FormErrorProps = {
  errorMessage?: string | undefined;
};

export const FormError = ({ errorMessage }: FormErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="text-destructive text-sm"
    >
      {errorMessage}
    </div>
  );
};
