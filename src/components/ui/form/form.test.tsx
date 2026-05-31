import { type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

import { Form } from './form';
import { Input } from './input';

import { Button } from '@/components/ui/button/button';
import { render, screen, userEvent, waitFor } from '@/testing/test-utils';

const schema = z.object({
  title: z.string().min(1, 'Required'),
});

const testData = { title: 'Hello World' };

test('submits a valid form', async () => {
  const handleSubmit = vi.fn() as SubmitHandler<z.infer<typeof schema>>;

  render(
    <Form onSubmit={handleSubmit} schema={schema} id="my-form">
      {({ register, formState }) => (
        <>
          <Input
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <Button name="submit" type="submit">
            Submit
          </Button>
        </>
      )}
    </Form>,
  );

  await userEvent.type(screen.getByLabelText(/title/i), testData.title);
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything()),
  );
});

test('blocks submission when validation fails', async () => {
  const handleSubmit = vi.fn() as SubmitHandler<z.infer<typeof schema>>;

  render(
    <Form onSubmit={handleSubmit} schema={schema} id="my-form">
      {({ register, formState }) => (
        <>
          <Input
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <Button name="submit" type="submit">
            Submit
          </Button>
        </>
      )}
    </Form>,
  );

  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await screen.findByRole('alert', { name: /required/i });

  expect(handleSubmit).not.toHaveBeenCalled();
});
