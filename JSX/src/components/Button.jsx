import '../styles/button.css';

export default function Button(props) {
  const { name, activity, style, type, handle_click } = props;
  return (
    <button
      key={name}
      className={`button ${activity ? 'enabled' : 'disabled'}`}
      style={style}
      type={type}
      onClick={handle_click}>
      {name}
    </button>
  );
}
