import Input from '../Input';
import Button from '../Button';

import { input_data, get_button } from '../../data/data';

export default function GetApi(props) {
  const { form_data, handle_change, handle_res } = props;

  const { car, prop } = form_data.get_api;

  function submit(e) {
    e.preventDefault();

    if (!car && prop)
      return handle_res({ message: 'Please send a car name' }, 400);

    let params = '';
    if (car && prop) params = `${car}/${prop}`;
    if (car && !prop) params = `${car}`;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${process.env.REACT_APP_HTTPS_domain}/api/cars/${params}`);
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.onload = function () {
      handle_res(JSON.parse(this.responseText), this.status);
    };

    xhr.send();
  }

  return (
    <>
      <form onSubmit={submit}>
        {input_data.get_api.map(i => (
          <Input
            key={i.name}
            {...i}
            value={form_data.get_api[i.name]}
            handle_change={handle_change}
          />
        ))}
        <div className="button-container">
          <Button {...get_button} activity={!(!car && prop)} />
        </div>
      </form>
    </>
  );
}
