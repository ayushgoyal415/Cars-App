// Update Password
$('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const current_password = $('#current-password-input').value;
  const new_password = $('#new-password-input').value;

  const msg = $('#msg');
  msg.style.color = 'red';

  if (current_password === '')
    return (msg.innerHTML = `* Current Password is required`);
  if (new_password === '')
    return (msg.innerHTML = `* New Password is required`);
  if (current_password === new_password)
    return (msg.innerHTML =
      '* New password cannot be same as current password');

  const xhr = new XMLHttpRequest();
  xhr.open('PUT', `${HTTPS_domain}/api/account/update_password`);
  xhr.setRequestHeader('Accept', '*/*');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.withCredentials = true;

  xhr.onload = function () {
    const { message } = JSON.parse(this.responseText);
    if (this.status !== 200) return (msg.innerHTML = '* ' + message);

    msg.style.color = 'green';
    msg.innerHTML = message;
  };

  xhr.send(JSON.stringify({ current_password, new_password }));
});

// Cancel Password Update
$('#cancel-button').addEventListener('click', function (e) {
  e.preventDefault();
  window.location.replace(`${LS_domain}/login.html`);
});

// View password
for (let i of ['keydown', 'keyup', 'mousedown', 'mouseup']) {
  $('.credentials').addEventListener(i, function (e) {
    const ele = e.target;
    if (
      (ele.id.indexOf('eye') !== -1 && e.type.indexOf('mouse') !== -1) ||
      e.key === 'Control'
    ) {
      const eye = ele.parentElement.children[1];
      eye.classList.toggle('fa-eye-slash');

      const input = ele.parentElement.children[0];
      const get = input.getAttribute('type');
      const set = get === 'text' ? 'password' : 'text';
      input.setAttribute('type', set);
    }
  });
}

// Toggle update button
$('.credentials').addEventListener('input', function (e) {
  const update = $('#update-button');
  $('#current-password-input').value !== '' &&
  $('#new-password-input').value !== ''
    ? update.classList.replace(
        'disabled-update-button',
        'enabled-update-button'
      )
    : update.classList.replace(
        'enabled-update-button',
        'disabled-update-button'
      );
});
