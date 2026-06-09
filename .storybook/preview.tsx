import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { themes } from 'storybook/theming';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'olly-dark',
      values: [
        { name: 'olly-dark', value: '#24272a' },
        { name: 'dark', value: '#0f172a' },
        { name: 'darker', value: '#020617' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
    docs: {
      theme: {
        ...themes.dark,
        appBg: '#24272a',
        appContentBg: '#24272a',
        appBorderColor: '#38373A',
        textColor: '#f1f5f9',
        textMutedColor: '#7C7D7F',
        // Monochrome — no accent yellow in docs UI
        colorPrimary: '#C1C1C1',
        colorSecondary: '#ABABAB',
        barBg: '#29282B',
        barTextColor: '#919394',
        barSelectedColor: '#C1C1C1',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;
