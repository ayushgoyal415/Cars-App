import '../styles/input.css';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Input(props) {
  const { name, placeholder, handle_change, type, value } = props;

  const [is_focused, set_is_focused] = React.useState(false);
  function toggle_focus() {
    set_is_focused(curr => !curr);
  }

  const [view, set_view] = React.useState(false);
  function toggle_view(e) {
    if (e.key === 'Control' || e.type.indexOf('mouse') !== -1)
      set_view(curr_view => !curr_view);
  }

  if (type === 'password') {
    return (
      <fieldset className={is_focused ? 'focused' : 'blurred'}>
        <legend>{placeholder}</legend>
        <input
          type={view ? 'text' : 'password'}
          name={name}
          value={value}
          className="password-input"
          onKeyDown={toggle_view}
          onKeyUp={toggle_view}
          onChange={handle_change}
          onFocus={toggle_focus}
          onBlur={toggle_focus}
        />
        <div
          className="fa-icon tooltip-container"
          onMouseDown={toggle_view}
          style={{ position: 'absolute', inset: `12% 4% auto auto` }}
          onMouseUp={toggle_view}>
          <FontAwesomeIcon icon={view ? faEyeSlash : faEye} />
          <div className="tooltip">
            {view
              ? `Release to Hide Password`
              : `Press and Hold to View Password`}
          </div>
        </div>
      </fieldset>
    );
  } else {
    return (
      <fieldset className={is_focused ? 'focused' : 'blurred'}>
        <legend>{placeholder}</legend>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handle_change}
          onFocus={toggle_focus}
          onBlur={toggle_focus}
        />
      </fieldset>
    );
  }
}
