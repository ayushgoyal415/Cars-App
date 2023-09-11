// Signup
$('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const data = {
    'First Name': $('#first-name-input').value,
    'Last Name': $('#last-name-input').value,
    username: $('#email-input').value,
    password: $('#password-input').value
  };

  const msg = $('#msg');
  msg.style.color = 'red';

  for (let i in data)
    if (data[i] === '') return (msg.innerHTML = `* ${i} is required`);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${HTTPS_domain}/api/auth/signup`);
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.withCredentials = true;

  xhr.onload = function () {
    const { message } = JSON.parse(this.responseText);
    if (this.status !== 200) return (msg.innerHTML = '* ' + message);

    msg.style.color = 'green';
    msg.innerHTML = message;
  };

  xhr.send(JSON.stringify(data));
});

// View password
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

// Toggle signup button
$('.credentials').addEventListener('input', function (e) {
  const btn = $('#signup-button');
  const values = [];
  document.querySelectorAll('input').forEach(v => values.push(v.value));

  values.some(v => v === '')
    ? btn.classList.replace('enabled-signup-button', 'disabled-signup-button')
    : btn.classList.replace('disabled-signup-button', 'enabled-signup-button');
});
