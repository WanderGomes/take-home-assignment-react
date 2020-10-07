import * as React from 'react';

import './datepicker.scss';

interface Props {

  label: string;

  minDate: Date;

  onChangeDate: (date: Date) => any;
}

interface State {

  selectedDate?: Date;

  selectedMonth?: string;

  selectedYear?: string;
}

class Datepicker extends React.Component<Props> {

  readonly tabIndex = 1;

  state: State = {
    selectedDate: new Date()
  };

  inputDateElement: HTMLDivElement;

  leftArrowElement: HTMLButtonElement;

  rightArrowElement: HTMLButtonElement;

  constructor(props: Props) {
    super(props);
  }

  init = (): void => {
    if (!this.props.minDate) {
      this.resetDate();
    } else {
      this.setState({
        selectedDate: new Date(this.props.minDate.valueOf())
      }, () => {
        this.setSelectedInfo();
      });
    }
  };

  handleKeyPress = (event: any): void => {
    const LEFT_ARROW_KEY = [37, 'ArrowLeft'];
    const RIGHT_ARROW_KEY = [39, 'ArrowRight'];
    const UP_ARROW_KEY = [38, 'ArrowUp'];
    const DOWN_ARROW_KEY = [40, 'ArrowDown'];

    const allowedKeys = [
      ...LEFT_ARROW_KEY,
      ...RIGHT_ARROW_KEY,
      ...UP_ARROW_KEY,
      ...DOWN_ARROW_KEY
    ];

    const key: string | number = event.key || event.keyCode;

    if (allowedKeys.includes(key)) {
      if (LEFT_ARROW_KEY.includes(key)) {
        this.focusLeftArrow();
        this.previousMonth();
      }

      if (RIGHT_ARROW_KEY.includes(key)) {
        this.focusRightArrow();
        this.nextMonth();
      }

      if (UP_ARROW_KEY.includes(key)) {
        this.cleanArrowsFocus();
        this.nextYear();
      }

      if (DOWN_ARROW_KEY.includes(key)) {
        this.cleanArrowsFocus();
        this.previousYear();
      }
    }
  };

  nextMonth = (): void => {
    const date: Date = this.state.selectedDate;
    const newDate = new Date(date.setMonth(date.getMonth() + 1));

    this.change(newDate);
  };

  previousMonth = (): void => {
    const date: Date = this.state.selectedDate;
    const newDate = new Date(date.setMonth(date.getMonth() - 1));

    this.change(newDate);
  };

  nextYear = (): void => {
    const date: Date = this.state.selectedDate;
    const newDate = new Date(date.setFullYear(date.getFullYear() + 1));

    this.change(newDate);
  };

  previousYear = (): void => {
    const date: Date = this.state.selectedDate;
    const newDate = new Date(date.setFullYear(date.getFullYear() - 1));

    this.change(newDate);
  };

  focusInputDate = (): void => {
    this.inputDateElement.focus();
  };

  focusLeftArrow = (): void => {
    this.cleanArrowsFocus();
    this.leftArrowElement.focus();
    this.cleanFocusAfterAction();
  };

  focusRightArrow = (): void => {
    this.cleanArrowsFocus();
    this.rightArrowElement.focus();
    this.cleanFocusAfterAction();
  };

  cleanArrowsFocus = (): void => {
    this.focusInputDate();
    this.leftArrowElement.blur();
    this.rightArrowElement.blur();
  };

  cleanFocusAfterAction = (): void => {
    setTimeout(() => {
      this.cleanArrowsFocus();
    }, 75);
  };

  setSelectedInfo = (): void => {
    const locateString: string = this.state.selectedDate.toLocaleString(
      'en-US',
      { month: 'long' }
    );

    this.setState({
      selectedMonth: locateString,
      selectedYear: this.state.selectedDate.getFullYear().toString()
    },() => {
      this.props.onChangeDate(this.state.selectedDate);
    });
  };

  change = (date: Date): void => {
    if (this.canChangeDate(date)) {
      this.setState({
        selectedDate: date
      },() => {
        this.setSelectedInfo();
      });
    } else {
      this.resetDate();
    }
  };

  canChangeDate = (newDate: Date): boolean => {
    return newDate > this.props.minDate;
  };

  resetDate = (): void => {
    if (!this.props.minDate) {
      const date: Date = new Date();

      this.setState({
        minDate: new Date(date.setMonth(date.getMonth() + 1))
      });
    }

    this.setState({
      selectedDate: new Date(this.props.minDate.valueOf())
    },() => {
      this.setSelectedInfo();
    });
  };

  componentDidMount = (): void => {
    this.init();
  };

  render = () => {
    return (
      <div className="tk-datepicker" onKeyDown={this.handleKeyPress}>
        <label onClick={() => this.focusInputDate()}>{this.props.label}</label>
        <div
          id="tk-datepicker__input-group"
          className="tk-datepicker__input-group"
          tabIndex={this.tabIndex}
          ref={elem => (this.inputDateElement = elem)}
        >
          <button
            type="button"
            id="tk-tk-datepicker__preview"
            className="tk-datepicker__preview"
            onClick={() => this.previousMonth()}
            ref={elem => (this.leftArrowElement = elem)}
          >
            <i className="tk-icon tk-arrow-left" />
          </button>
          <div className="tk-datepicker__input">
            <div className="tk-datepicker__month">
              {this.state.selectedMonth}
            </div>
            <div className="tk-datepicker__year">{this.state.selectedYear}</div>
          </div>
          <button
            type="button"
            id="tk-datepicker__next"
            className="tk-datepicker__next"
            onClick={() => this.nextMonth()}
            ref={elem => (this.rightArrowElement = elem)}
          >
            <i className="tk-icon tk-arrow-right" />
          </button>
        </div>
      </div>
    );
  };
}

export default Datepicker;
