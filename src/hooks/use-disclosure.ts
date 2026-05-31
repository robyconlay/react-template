import { useCallback, useState } from 'react';

/**
 * Open/close state for modals, drawers, disclosures. Example of a shared hook —
 * shared hooks live in this folder and must not import from features or app.
 */
export const useDisclosure = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, open, close, toggle };
};
