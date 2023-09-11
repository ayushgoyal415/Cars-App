import '../styles/test.css';

import React from 'react';
import tests, { select_options } from '../data/tests';

export default function Test(props) {
  const { page, set_page, handle_res, set_form_data } = props;

  const [test, set_test] = React.useState({ api: '', joi: false });
  const { api, joi } = test;

  function handle_test_btn(value, test_page) {
    if (test_page === 'logout') {
      const xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        `${process.env.REACT_APP_HTTPS_domain}/api/account/logout`
      );
      xhr.setRequestHeader('Accept', '*/*');
      xhr.withCredentials = true;

      xhr.onload = function () {
        handle_res(JSON.parse(this.responseText), this.status);
      };

      xhr.send();
      return;
    }

    if (page !== test_page) set_page(test_page);

    if (test_page === 'post_car_api') {
      set_form_data(curr => {
        const obj = { ...curr };
        obj.post_car_api.data = value.data;
        return obj;
      });
      return;
    }

    set_form_data(curr => {
      const obj = { ...curr };
      obj[test_page] = value;
      return obj;
    });
  }

  function handle_test(e) {
    const { name, value } = e.target;
    if (name === 'api') {
      set_test(v => ({ ...v, api: value }));
      if (page !== value) set_page(value || 'signup');
    } else {
      set_test(v => ({ ...v, joi: !v.joi }));
      if (page !== api) set_page(api || 'signup');
    }
  }

  return (
    <div className="test-div">
      <div className="test-select-div">
        <select
          className="select-drop"
          name="api"
          value={api}
          onChange={handle_test}>
          <option value="" className="select-option">
            -- Choose API --
          </option>
          {select_options.map(function (option) {
            return (
              <option value={option} key={option} className="select-option">
                {option}
              </option>
            );
          })}
        </select>

        <label className="checkbox-label tooltip-container">
          <input
            type="checkbox"
            name="joi"
            checked={joi}
            onChange={handle_test}
          />
          <div className="checkbox-box"></div>
          <div className="tooltip">{`${
            test.joi ? 'Disable' : 'Enable'
          } Joi Tests`}</div>
        </label>
      </div>

      {api !== '' && (
        <div className="test-btn-div">
          {tests[joi ? 'joi' : 'basic'][api].map(
            function (i, idx) {
              let { name, title, value, page, span_style, btn_style } = i;
              return (
                <div key={idx} className="tooltip-container">
                  <button
                    style={btn_style}
                    onClick={() => handle_test_btn(value, page)}>
                    {name || `Test ${this.count++}`}
                  </button>
                  <span
                    className="tooltip"
                    style={{ top: '50px' }}>
                    <span style={span_style}>{title}</span>
                    <br />
                    <pre>{JSON.stringify(value, null, 4)}</pre>
                  </span>
                </div>
              );
            },
            { count: 1 }
          )}
        </div>
      )}
    </div>
  );
}
