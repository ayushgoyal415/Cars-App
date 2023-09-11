import '../styles/preview.css';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Preview(props) {
  const { name, value, remove_prop } = props;

  return (
    <div className="preview-container">
      <p>{`"${name}" = "${value}"`}</p>
      <FontAwesomeIcon
        className="trash-icon"
        icon={faTrash}
        onClick={remove_prop}
      />
    </div>
  );
}
