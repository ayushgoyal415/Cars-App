// Login
$('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = $('#email-input').value;
  const password = $('#password-input').value;

  const msg = $('#msg');
  msg.style.color = 'red';

  if (username === '') return (msg.innerHTML = '* username is required');
  if (password === '') return (msg.innerHTML = '* password is required');

  const data = JSON.stringify({ username, password });

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${HTTPS_domain}/api/auth/login`);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
    const { message } = JSON.parse(this.responseText);
    if (this.status !== 200) return (msg.innerHTML = '* ' + message);

    msg.style.color = 'green';
    msg.innerHTML = message;
  };

  xhr.send(data);
});

// View Password
for (let i of ['keydown', 'keyup', 'mousedown', 'mouseup']) {
  $('.credentials').addEventListener(i, function (e) {
    const ele = e.target;
    if (
      (ele.id === 'eye' && e.type.indexOf('mouse') !== -1) ||
      e.key === 'Control'
    ) {
      $('#eye').classList.toggle('fa-eye-slash');
      const input = $('#password-input');
      const get = input.getAttribute('type');
      const set = get === 'text' ? 'password' : 'text';
      input.setAttribute('type', set);
    }
  });
}

// Toggle Login button
$('.credentials').addEventListener('input', function (e) {
  const login = $('#login-button');
  $('#password-input').value !== '' && $('#email-input').value !== ''
    ? login.classList.replace('disabled-login-button', 'enabled-login-button')
    : login.classList.replace('enabled-login-button', 'disabled-login-button');
});
