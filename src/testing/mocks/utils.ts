/**
 * Simulated latency so loading states are visible in development. Disabled in
 * tests so they run fast.
 */
export const networkDelay = () => {
  const delay = import.meta.env.MODE === 'test' ? 0 : 200;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
