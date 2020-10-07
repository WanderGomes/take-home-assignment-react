import * as React from 'react';
import DollarUtil from '../../../utils/dollar.util';
import Datepicker from '../../../components/datepicker/datepicker';

import './simulation.scss';

interface State {

  totalAmount?: string;

  monthlyAmount?: string;

  installments?: number;

  currentDate?: Date;

  minGoalDate?: Date;

  goalDate?: Date;

  goalMonth?: string;

  goalYear?: string;
}

class Simulation extends React.Component {

  readonly EMPTY_VALUE: string = '0.00';

  state: State = {
    totalAmount: '',
    installments: 1,
    currentDate: new Date()
  };

  init = (): void => {
    this.initGoalDate();
  };

  formatCurrency = (event: any): void => {
    this.setState({
      totalAmount: this.transformToDollars(event.target.value)
    }, () => {
      if (
        !this.state.totalAmount ||
        this.state.totalAmount === this.EMPTY_VALUE
      ) {
        this.setState({
          totalAmount: '',
          monthlyAmount: this.EMPTY_VALUE
        });
      } else {
        this.updateMonthlyAmount();
      }
    });
  };

  changeDate = (date: Date): void => {
    this.setState({
      goalDate: date,
      installments: this.getMonthDiff(date)
    }, () => {
      this.updateMonthlyAmount();
      this.updateGoalInfo(date);
    });
  };

  addPlanning = (): void => {
    // Form submit action
  };

  initGoalDate = (): void => {
    let date = new Date();
    date = new Date(date.setMonth(date.getMonth() + 1));

    console.log(date);

    this.setState({
      minGoalDate: date
    }, () => {
      this.updateGoalInfo(this.state.minGoalDate);
    });
  };

  updateMonthlyAmount = (): void => {
    if (this.state.totalAmount) {
      const total = parseInt(this.state.totalAmount.replace(/\D/g, ''), 10);
      const mAmount = total / this.state.installments;
      this.setState({
        monthlyAmount: this.transformToDollars(mAmount)
      });
    }
  };

  transformToDollars = (value: string | number): string => {
    return DollarUtil.convert(value);
  };

  getMonthDiff = (dateTo: Date): number => {
    return (
      dateTo.getMonth() -
      this.state.currentDate.getMonth() +
      12 * (dateTo.getFullYear() - this.state.currentDate.getFullYear())
    );
  };

  updateGoalInfo = (dateTo: Date): void => {
    this.setState({
      goalMonth: dateTo.toLocaleString('en-US', { month: 'long' }),
      goalYear: dateTo.getFullYear().toString()
    });
  };

  onChangeTotalAmount = (event: any): void => {
    this.setState({
      totalAmount: event.target.value
    });
  };

  componentDidMount = (): void => {
    this.init();
  };

  render = () => {
    return (
      <section className="tk-simulation">
        <div className="tk-simulation__header tk-text--center tk-animation tk-animation--fade-in">
          <h1>
            Let's plan your <strong>saving goal</strong>.
          </h1>
        </div>
        <div className="tk-simulation__body">
          <form
            role="form"
            className="tk-form"
            onSubmit={() => this.addPlanning()}
          >
            <div className="tk-card tk-animation tk-animation--fade-in">
              <div className="tk-card__header">
                <div className="tk-row">
                  <div className="tk-col">
                    <i className="tk-icon tk-buy-house" />
                  </div>
                </div>
                <div className="tk-row">
                  <div className="tk-col">
                    <h2>Buy a house</h2>
                  </div>
                </div>
                <div className="tk-row">
                  <div className="tk-col">
                    <h3>Saving goal</h3>
                  </div>
                </div>
              </div>
              <div className="tk-card__body">
                <div className="tk-row">
                  <div className="tk-col">
                    <div className="tk-form__group">
                      <label>Total amount</label>
                      <div className="tk-form__input-group">
                        <div className="tk-form__input-prepend">$</div>
                        <input
                          type="text"
                          id="total-amount"
                          name="total-amount"
                          className="tk-form__input"
                          placeholder="0.00"
                          value={this.state.totalAmount}
                          onChange={this.onChangeTotalAmount}
                          onKeyUp={this.formatCurrency}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tk-col">
                    {this.state.minGoalDate ? <Datepicker label="Reach goal by" minDate={this.state.minGoalDate} onChangeDate={this.changeDate} /> : ''}
                  </div>
                </div>
                <div className="tk-row">
                  <div className="tk-col">
                    <div className="tk-simulation__result">
                      <div className="tk-card tk-card--small tk-mt--28">
                        <div className="tk-card__body tk-flex tk-justify-content--space-between tk-align-items--center">
                          <span className="tk-simulation__result-label">
                            Monthly <span className="tk-hide--xs">amount</span>
                          </span>
                          <span className="tk-simulation__result-value">
                            <span>
                              {this.state.monthlyAmount
                                ? this.state.monthlyAmount
                                : DollarUtil.convert('0')}
                            </span>
                          </span>
                        </div>
                        <div className="tk-card__footer">
                          <span className="tk-simulation__result-text">
                            You're planning{' '}
                            <strong>
                              {this.state.installments} monthly deposits
                            </strong>{' '}
                            to reach your{' '}
                            {this.state.monthlyAmount
                              ? this.state.monthlyAmount
                              : DollarUtil.convert('0')}{' '}
                            goal by{' '}
                            <strong>
                              {this.state.goalMonth} {this.state.goalYear}
                            </strong>
                            .
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tk-card__footer tk-card__footer--transparent tk-flex tk-justify-content--center">
                <button
                  type="submit"
                  id="tk-simulation__submit"
                  className="tk-button tk-button--rounded tk-button--blue"
                  disabled={!this.state.totalAmount}
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  };
}

export default Simulation;
