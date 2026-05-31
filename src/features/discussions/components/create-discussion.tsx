import { useState } from 'react';

import {
  createDiscussionInputSchema,
  useCreateDiscussion,
} from '../api/create-discussion';

import { Button } from '@/components/ui/button/button';
import { Form } from '@/components/ui/form/form';
import { Input } from '@/components/ui/form/input';
import { useNotifications } from '@/components/ui/notifications/notifications-store';

export const CreateDiscussion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const addNotification = useNotifications((state) => state.addNotification);

  const createDiscussionMutation = useCreateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        setIsOpen(false);
        addNotification({ type: 'success', title: 'Discussion created' });
      },
    },
  });

  if (!isOpen) {
    return <Button onClick={() => setIsOpen(true)}>Create</Button>;
  }

  return (
    <div className="bg-card text-card-foreground w-full max-w-sm rounded-md border p-4">
      <Form
        onSubmit={(values) => createDiscussionMutation.mutate({ data: values })}
        schema={createDiscussionInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="Title"
              registration={register('title')}
              error={formState.errors.title}
            />
            <Input
              label="Body"
              registration={register('body')}
              error={formState.errors.body}
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                isLoading={createDiscussionMutation.isPending}
              >
                Submit
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
