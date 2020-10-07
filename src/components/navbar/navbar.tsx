import * as React from 'react';
import Theme from '../../services/theme';
import { ThemeEnum } from '../../enums/theme.enum';

import './navbar.scss';

interface State {

  currentTheme?: string;
}

class Navbar extends React.Component {

  readonly logoPath = require('../../assets/img/origin-logo.svg');

  theme: Theme;

  state: State = {};

  init = (): void => {
    this.theme = Theme.getInstance();
    this.registerListerners();
  };

  registerListerners = (): void => {
    this.theme.getCurrentTheme().subscribe((theme: ThemeEnum) => {
      if (theme) {
        this.setState({
          currentTheme: theme
        });
      }
    });
  };

  changeToDarkMode = (): void => {
    this.theme.changeColorSchemePref(true);
  };

  changeToLightMode = (): void => {
    this.theme.changeColorSchemePref(false);
  };

  componentDidMount = (): void => {
    this.init();
  };

  render = () => {
    return (
      <nav className="tk-nav tk-animation tk-animation--fade-in">
        <div className="tk-nav__items">
          <div className="tk-nav__left-items">
            <div className="tk-nav__item tk-nav__item--fix-top">
              <a className="tk-link tk-link--default tk-nav__logo">
                <img src={this.logoPath} alt="Origin - Logo" />
              </a>
            </div>
          </div>
          <div className="tk-nav__right-items">
            <div className="tk-nav__item">
              <a
                id="tk-nav__dark-mode"
                className={`tk-link tk-link--primary tk-link--small ${
                  this.state.currentTheme === 'DARK' ? 'tk-link--active' : ''
                }`}
                onClick={() => this.changeToDarkMode()}
              >
                Dark mode
              </a>
            </div>
            <div className="tk-nav__item">
              <a
                id="tk-nav__light-mode"
                className={`tk-link tk-link--primary tk-link--small ${
                  this.state.currentTheme === 'LIGHT' ? 'tk-link--active' : ''
                }`}
                onClick={() => this.changeToLightMode()}
              >
                Light mode
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  };
}

export default Navbar;
