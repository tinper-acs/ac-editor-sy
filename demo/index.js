
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader' // eslint-disable-line

import DemoGroup from './index.jsx';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector("#root")
  )
}

render(DemoGroup)

if (module.hot) {
  module.hot.accept('./index.jsx', () => {
    const NextApp = require('./index.jsx').default // eslint-disable-line
    render(NextApp)
  })
}
