import { act, renderHook } from '@testing-library/react';

import { useNotifications } from './notifications-store';

test('adds and dismisses notifications', () => {
  const { result } = renderHook(() => useNotifications());

  expect(result.current.notifications).toHaveLength(0);

  // The store assigns the `id`, so we add without one and read it back.
  act(() => {
    result.current.addNotification({
      type: 'info',
      title: 'Hello World',
      message: 'This is a notification',
    });
  });

  expect(result.current.notifications).toHaveLength(1);
  const [created] = result.current.notifications;
  expect(created).toMatchObject({
    type: 'info',
    title: 'Hello World',
    message: 'This is a notification',
  });
  expect(created.id).toBeTruthy();

  act(() => {
    result.current.dismissNotification(created.id);
  });

  expect(result.current.notifications).toHaveLength(0);
});
