import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 294px;
  height: auto;
  padding: 30px 0 20px;
  border: 1px solid #e9f1ff;
  border-radius: 16px;

  background: #ffffff;
  box-shadow: 0 4px 8px rgb(0, 0, 0, 15%);

  .rdp {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
  }

  .rdp-month {
    display: grid;
  }

  /* stylelint-disable selector-class-pattern */
  .rdp-month_caption {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 18px;
    font-weight: 600;
    font-style: normal;
    color: #40b59f;
  }

  .rdp-button_next,
  .rdp-button_previous {
    margin: 0 20px;
  }
  /* stylelint-enable selector-class-pattern */

  .rdp-chevron {
    fill: #000000;
  }
  /* stylelint-disable selector-class-pattern */
  .rdp-month_grid {
    margin-top: 25px;
  }
  /* stylelint-enable selector-class-pattern */
  .rdp-weekdays {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .rdp-weekday {
    width: 42px;

    font-size: 13px;
    font-weight: 500;
    font-style: normal;
    color: #848a94;
  }

  .rdp-weeks {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .rdp-day {
    width: 42px;
    height: 32px;
  }
  /* stylelint-disable selector-class-pattern */
  .rdp-day_button {
    width: 32px;
    height: 32px;
    margin: 0 5px;

    font-size: 13px;
    font-weight: 500;
    font-style: normal;
  }

  .rdp-range_start {
    background: linear-gradient(90deg, transparent 50%, #40b59f33 50%);
  }

  .rdp-range_end {
    background: linear-gradient(90deg, #40b59f33 50%, transparent 50%);
  }

  .rdp-range_middle {
    background: #40b59f33;
  }

  .rdp-range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button {
    border: 0;
    color: #ffffff !important;
    background: #40b59f;
  }
  /* stylelint-enable selector-class-pattern */

  .rdp-disabled,
  .rdp-outside {
    opacity: 100%;
  }
  /* stylelint-disable selector-class-pattern */
  .rdp-disabled .rdp-day_button {
    color: #848a94;
  }

  .rdp-outside .rdp-day_button {
    color: #848a94;
  }

  .rdp-today .rdp-day_button {
    color: #40b59f;
  }
  /* stylelint-enable selector-class-pattern */
`;
