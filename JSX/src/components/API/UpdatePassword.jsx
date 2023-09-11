import React from 'react';

import Input from '../Input';
import Button from '../Button';

import { input_data, update_button, cancel_button } from '../../data/data';

export default function UpdatePassword(props) {
  const { form_data, set_page, handle_change, handle_res } = props;

  function submit(e) {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open(
      'PUT',
      `${process.env.REACT_APP_HTTPS_domain}/api/account/update_password`
    );
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.onload = function () {
      handle_res(JSON.parse(this.responseText), this.status);
    };

    xhr.send(JSON.stringify(form_data.update_password));
  }

  return (
    <>
      <form onSubmit={submit}>
        {input_data.update_password.map(i => (
          <Input
            key={i.name}
            {...i}
            value={form_data.update_password[i.name]}
            handle_change={handle_change}
          />
        ))}
        <div className="button-container">
          <Button
            {...update_button}
            activity={
              !Object.values(form_data.update_password).some(val => val === '')
            }
          />
          <Button
            {...cancel_button}
            activity={true}
            handle_click={() => set_page('login')}
          />
        </div>
      </form>
    </>
  );
}
