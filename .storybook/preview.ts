import type { Preview } from '@storybook/react'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../src/app/styles/index.scss'
import { withRouter } from 'storybook-addon-react-router-v6'

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'black',
      values: [
        {
          name: 'black',
          value: '#000000FF',
        },
        {
          name: 'white',
          value: '#fff',
        },
      ],
    },
  },
}

export default preview
