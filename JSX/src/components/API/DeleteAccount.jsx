import React from 'react';

import Input from '../Input';
import Button from '../Button';

import { input_data, delete_button, cancel_button } from '../../data/data';

export default function DeleteAccount(props) {
  const { form_data, set_page, handle_change, handle_res } = props;

  function submit(e) {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open(
      'DELETE',
      `${process.env.REACT_APP_HTTPS_domain}/api/account/delete_account`
    );
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.onload = function () {
      handle_res(JSON.parse(this.responseText), this.status);
    };

    xhr.send(JSON.stringify(form_data.delete_account));
  }

  return (
    <>
      <form onSubmit={submit}>
        {input_data.delete_account.map(i => (
          <Input
            key={i.name}
            {...i}
            value={form_data.delete_account[i.name]}
            handle_change={handle_change}
          />
        ))}
        <div className="button-container">
          <Button
            {...delete_button}
            activity={form_data.delete_account.password !== ''}
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
