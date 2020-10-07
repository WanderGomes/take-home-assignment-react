import { ThemeEnum } from '../enums/theme.enum';
import { BehaviorSubject } from 'rxjs';

class Theme {

  static myInstance: Theme = null;

  private currentTheme: BehaviorSubject<ThemeEnum> = new BehaviorSubject<
    ThemeEnum
  >(null);

  static getInstance() {
    if (Theme.myInstance == null) {
      Theme.myInstance = new Theme();
    }

    return this.myInstance;
  }

  init = (): void => {
    this.registerColorSchemeListerner();
  };

  setCurrentTheme = (theme: ThemeEnum): void => {
    this.currentTheme.next(theme);
  };

  getCurrentTheme = (): BehaviorSubject<ThemeEnum> => {
    return this.currentTheme;
  };

  changeColorSchemePref = (isDark: boolean): void => {
    if (isDark) {
      document.documentElement.classList.add('tk-theme--dark');
      this.setCurrentTheme(ThemeEnum.DARK);
    } else {
      document.documentElement.classList.remove('tk-theme--dark');
      this.setCurrentTheme(ThemeEnum.LIGHT);
    }
  };

  registerColorSchemeListerner = () => {
    const colorSchemePrefs = window.matchMedia('(prefers-color-scheme: dark)');

    this.changeColorSchemePref(colorSchemePrefs.matches);

    colorSchemePrefs.addEventListener('change', e => {
      this.changeColorSchemePref(e.matches);
    });
  };
}

Theme.getInstance().init();

export default Theme;
