import '../styles/logged.css';

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Logged(props) {
  const { res } = props;

  const [log_data, set_log_data] = React.useState({});
  const { logged_in, username, first_name } = log_data;

  //. Checking logged in status only when a new response is received
  React.useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${process.env.REACT_APP_HTTPS_domain}/api/check_logged`);
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = true;

    xhr.onload = function () {
      const response = JSON.parse(this.responseText);
      set_log_data(response);
    };

    xhr.send();
  }, [res]);

  return (
    <div
      className={`tooltip-container logged-circle ${
        logged_in ? 'enabled' : 'disabled'
      }`}
      style={{ inset: `20px 20px auto auto`, position: 'absolute' }}>
      <div className="tooltip" style={{ top: '20px' }}>
        {logged_in ? `Hello, ${first_name}` : `You are not Logged In`}
        {logged_in && (
          <div className="logged-account">
            <FontAwesomeIcon icon={faUser} />
            {username}
          </div>
        )}
      </div>
    </div>
  );
}
