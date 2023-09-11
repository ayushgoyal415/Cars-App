import '../styles/response.css';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faGreaterThan,
  faLessThan,
  faMessage
} from '@fortawesome/free-solid-svg-icons';

export default function Response(props) {
  const { res } = props;
  const [idx, set_idx] = React.useState(res.length - 1);

  function increase() {
    set_idx(curr_idx => (curr_idx + 1 === res.length ? 0 : curr_idx + 1));
  }

  function decrease() {
    set_idx(curr_idx => (curr_idx === 0 ? res.length - 1 : curr_idx - 1));
  }

  function copy() {
    navigator.clipboard.writeText(res[idx]);
  }

  React.useEffect(() => set_idx(res.length - 1), [res.length]);

  return (
    <div
      className="tooltip-container"
      style={{ position: 'absolute', inset: '40px auto auto 30px'}}>
      <FontAwesomeIcon icon={faMessage} color="white" />
      <div className="badge">{res.length}</div>
      <pre
        className="tooltip"
        style={{ pointerEvents: 'all', inset: '-10px auto auto 5px'
        , whiteSpace: 'pre' }}>
        <div className="response-nav">
          <button onClick={decrease}>
            <FontAwesomeIcon icon={faLessThan} />
          </button>
          <button onClick={increase}>
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
          <button onClick={copy} style={{ fontSize: '20px' }}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
        <span style={{ color: 'yellow' }}>
          {`Result ${idx + 1} of ${res.length}`} :{' '}
        </span>
        {res[idx]}
      </pre>
    </div>
  );
}
