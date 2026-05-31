import { act, renderHook } from '@testing-library/react';

import { useDisclosure } from './use-disclosure';

test('is closed by default', () => {
  const { result } = renderHook(() => useDisclosure());

  expect(result.current.isOpen).toBe(false);
});

test('opens the state', () => {
  const { result } = renderHook(() => useDisclosure());

  act(() => {
    result.current.open();
  });

  expect(result.current.isOpen).toBe(true);
});

test('closes the state', () => {
  const { result } = renderHook(() => useDisclosure(true));

  act(() => {
    result.current.close();
  });

  expect(result.current.isOpen).toBe(false);
});

test('toggles the state', () => {
  const { result } = renderHook(() => useDisclosure());

  act(() => {
    result.current.toggle();
  });
  expect(result.current.isOpen).toBe(true);

  act(() => {
    result.current.toggle();
  });
  expect(result.current.isOpen).toBe(false);
});

test('honours the initial state', () => {
  const { result } = renderHook(() => useDisclosure(true));

  expect(result.current.isOpen).toBe(true);
});
