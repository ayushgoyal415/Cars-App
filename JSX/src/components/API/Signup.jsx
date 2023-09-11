import React from 'react';

import Input from '../Input';
import Button from '../Button';

import { input_data, signup_button } from '../../data/data';

export default function Signup(props) {
  const { form_data, set_page, handle_change, handle_res } = props;

  function submit(e) {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${process.env.REACT_APP_HTTPS_domain}/api/auth/signup`);
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.onload = function () {
      handle_res(JSON.parse(this.responseText), this.status);
    };

    xhr.send(JSON.stringify(form_data.signup));
  }

  return (
    <>
      <form onSubmit={submit}>
        {input_data.signup.map(i => (
          <Input
            key={i.name}
            {...i}
            value={form_data.signup[i.name]}
            handle_change={handle_change}
          />
        ))}
        <div className="button-container">
          <Button
            {...signup_button}
            activity={!Object.values(form_data.signup).some(val => val === '')}
          />
        </div>
      </form>
      <p className="anchor" onClick={() => set_page('login')}>
        Already have an account? Go to login
      </p>
    </>
  );
}
