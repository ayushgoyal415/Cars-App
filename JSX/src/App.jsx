import React from 'react';

import Signup from './components/API/Signup';
import Login from './components/API/Login';
import UpdatePassword from './components/API/UpdatePassword';
import DeleteAccount from './components/API/DeleteAccount';

import GetApi from './components/API/GetApi';
import PostCarApi from './components/API/PostCarApi';

import Logged from './components/Logged';
import Test from './components/Test';
import Response from './components/Response';

import { input_names, titles } from './data/data';

export default function App() {
  console.log('App rendered');

  const [form_data, set_form_data] = React.useState(input_names);
  const [page, set_page] = React.useState('signup');
  const [res, set_res] = React.useState([]);
  const [msg, set_msg] = React.useState('');
  const [msg_color, set_msg_color] = React.useState('red');

  //. Clearing the message on form_data or page change
  React.useEffect(() => set_msg(''), [form_data, page]);

  //. Updating form_data on input change
  function handle_change(e) {
    let { name, value } = e.target;

    set_form_data(curr => {
      const obj = { ...curr };
      obj[page][name] = value;
      return obj;
    });
  }

  //. Things to do when a new response is received
  function handle_res(response, status) {
    set_res(curr => [...curr, JSON.stringify(response, null, 4)]);

    const { message } = response;
    const success = status === 200 || status === 201;
    const audio = new Audio(
      require(`./resources/sounds/new-message-${
        success ? 'success.wav' : 'error.mp3'
      }`)
    );
    audio.volume = 0.1;
    audio.play();

    set_msg_color(success ? 'rgb(73, 252, 3)' : 'red');
    set_msg(success ? message || `Status : ${status}` : `* ${message}`);
  }

  const props = { form_data, set_page, handle_change, handle_res };

  return (
    <div style={{ position: 'relative' }}>
      <Test
        set_page={set_page}
        handle_res={handle_res}
        set_form_data={set_form_data}
        page={page}
      />
      <div className="credentials">
        <Logged res={res} />
        {res.length > 0 && <Response res={res} />}
        <h3>{titles[page]}</h3>
        <div className="msg" style={{ color: msg_color }}>
          {msg}
        </div>
        {page === 'signup' && <Signup {...props} />}
        {page === 'login' && <Login {...props} />}
        {page === 'update_password' && <UpdatePassword {...props} />}
        {page === 'delete_account' && <DeleteAccount {...props} />}
        {page === 'get_api' && <GetApi {...props} />}
        {page === 'post_car_api' && (
          <PostCarApi {...props} set_form_data={set_form_data} />
        )}
      </div>
    </div>
  );
}
