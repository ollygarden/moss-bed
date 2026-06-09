import type { ReactElement } from 'react';
import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';

function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, options);
}

export { render };
export { screen, within, fireEvent, waitFor } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
