import React from 'react';

import Input from '../Input';
import Button from '../Button';
import Preview from '../Preview';

import { input_data, post_button, add_button } from '../../data/data';

export default function PostCarApi(props) {
  const { form_data, set_form_data, handle_change, handle_res } = props;

  const { prop, value, data } = form_data.post_car_api;

  const preview_data = [];
  for (let i in data) preview_data.push({ name: i, value: data[i] });

  function add_prop(e) {
    e.preventDefault();
    set_form_data(function (curr) {
      const obj = { ...curr };
      Object.assign(obj.post_car_api.data, { [prop]: value });
      obj.post_car_api.prop = '';
      obj.post_car_api.value = '';

      return obj;
    });
  }

  function remove_prop(name) {
    set_form_data(curr => {
      const obj = { ...curr };
      delete obj.post_car_api.data[name];
      return obj;
    });
  }

  function submit(e) {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${process.env.REACT_APP_HTTPS_domain}/api/cars`);
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.onload = function () {
      handle_res(JSON.parse(this.responseText), this.status);
    };

    xhr.send(JSON.stringify(data));

    set_form_data(function (curr) {
      const obj = { ...curr };
      obj.post_car_api.data = {};
      return obj;
    });
  }

  return (
    <>
      <form onSubmit={add_prop}>
        {input_data.post_car_api.map(i => (
          <Input
            key={i.name}
            {...i}
            value={form_data.post_car_api[i.name]}
            handle_change={handle_change}
          />
        ))}
        <div className="button-container">
          <Button {...add_button} activity={prop && value} />
        </div>
      </form>

      {Object.keys(data).length !== 0 && (
        <form style={{ marginTop: '40px' }} onSubmit={submit}>
          {preview_data.map((i, idx) => (
            <Preview
              key={idx}
              name={i.name}
              value={i.value}
              remove_prop={() => remove_prop(i.name)}
            />
          ))}
          <div className="button-container">
            <Button {...post_button} activity={true} />
          </div>
        </form>
      )}
    </>
  );
}
