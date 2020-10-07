import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**********
 * Themes styles
 ***********/
import 'take-home-assignment-design-system/dist/themes/dark/theme.css';
import 'take-home-assignment-design-system/dist/themes/light/theme.css';

/**********
 * Design system styles
 ***********/
import 'take-home-assignment-design-system/dist/design-system/design-system.css';

/**********
 * General styles
 ***********/

import './styles.scss';

/************/

import App from './app';

ReactDOM.render(<App />, document.getElementById('tk-root'));
