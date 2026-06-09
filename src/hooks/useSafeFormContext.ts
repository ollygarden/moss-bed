import { useFormContext } from 'react-hook-form';

/**
 * Safely attempts to get form context without violating Rules of Hooks.
 * Returns null if not within a FormProvider.
 *
 * This hook always calls useFormContext unconditionally, catching the error
 * if no FormProvider is present, which is the correct React pattern.
 */
export function useSafeFormContext(): ReturnType<typeof useFormContext> | null {
  try {
    return useFormContext();
  } catch {
    return null;
  }
}
