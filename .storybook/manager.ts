import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

// Monochrome dark chrome — shades of olly-grey only, no accent.
addons.setConfig({
  theme: {
    ...themes.dark,
    brandTitle: 'moss-bed',
    brandUrl: 'https://github.com/ollygarden/moss-bed',

    // Selected/active highlights — use the lightest grey instead of accent yellow.
    colorPrimary: '#C1C1C1',
    colorSecondary: '#ABABAB',

    // Surfaces
    appBg: '#24272a',
    appContentBg: '#29282B',
    appBorderColor: '#38373A',

    // Toolbar
    barBg: '#29282B',
    barTextColor: '#919394',
    barSelectedColor: '#C1C1C1',
    barHoverColor: '#ABABAB',

    // Text
    textColor: '#f1f5f9',
    textInverseColor: '#24272a',
    textMutedColor: '#7C7D7F',
  },
});
