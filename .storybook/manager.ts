import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'moss-bed',
    brandUrl: 'https://github.com/ollygarden/moss-bed',
    colorPrimary: '#e2e735',
    colorSecondary: '#e2e735',
    appBg: '#24272a',
    appContentBg: '#1a1d20',
    appBorderColor: '#2d3033',
    barBg: '#1a1d20',
    barTextColor: '#a1a3a6',
    barSelectedColor: '#e2e735',
    textColor: '#f1f5f9',
    textInverseColor: '#24272a',
  },
});
