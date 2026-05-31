import { cn } from './cn';

test('merges class names', () => {
  expect(cn('text-sm', 'font-bold')).toBe('text-sm font-bold');
});

test('resolves conflicting tailwind utilities (last wins)', () => {
  expect(cn('px-2', 'px-4')).toBe('px-4');
});

test('drops falsy values', () => {
  expect(cn('text-sm', false, undefined, 'font-bold')).toBe(
    'text-sm font-bold',
  );
});
