import React from 'react';

import Input from '../Input';
import Button from '../Button';

import { input_data, login_button } from '../../data/data';

export default function Login(props) {
  const { form_data, set_page, handle_change, handle_res } = props;

  function submit(e) {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${process.env.REACT_APP_HTTPS_domain}/api/auth/login`);
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.onload = function () {
      handle_res(JSON.parse(this.responseText), this.status);
    };

    xhr.send(JSON.stringify(form_data.login));
  }

  return (
    <>
      <form onSubmit={submit}>
        {input_data.login.map(i => (
          <Input
            key={i.name}
            {...i}
            value={form_data.login[i.name]}
            handle_change={handle_change}
          />
        ))}
        <div className="button-container">
          <Button
            {...login_button}
            activity={!Object.values(form_data.login).some(val => val === '')}
          />
        </div>
      </form>
      <p className="anchor" onClick={() => set_page('signup')}>
        Don't have an account? Signup instead
      </p>
    </>
  );
}
