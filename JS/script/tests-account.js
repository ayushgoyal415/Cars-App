const tests = [
  //. Login and Signup Tests
  //1 -> Signup
  {
    title: 'Signing up a new account',
    value: {
      first_name: 'Abeesh',
      last_name: 'Goyal',
      username: 'goyalabeesh@yahoo.co.in',
      password: 'Hello@123'
    },
    page: 'signup'
  },
  //2 -> Login
  {
    title: 'Logging into newly created account',
    value: {
      username: 'goyalabeesh@yahoo.co.in',
      password: 'Hello@123'
    },
    page: 'login'
  },
  //3 -> Signup
  {
    title: 'Signing up a new account when already logged in',
    value: {
      first_name: 'Ayush',
      last_name: 'Goyal',
      username: 'hello@gmail.com',
      password: 'Hello@123'
    },
    page: 'signup'
  },
  //4 -> Login
  {
    title: 'Logging into another account when already logged in',
    value: {
      username: 'ayushgoyal415@gmail.com',
      password: 'Hello@123'
    },
    page: 'login'
  },
  // Logout
  {
    name: 'Logout',
    title: 'Log out from the current account',
    value: {},
    page: 'any'
  },
  //5 -> Signup
  {
    title: 'Creating a new account with same username',
    value: {
      first_name: 'Abeesh',
      last_name: 'Goyal',
      username: 'goyalabeesh@yahoo.co.in',
      password: 'Hello@123'
    },
    page: 'signup'
  },
  //6 -> Signup
  {
    title: 'Creating a new account with empty field',
    value: {
      first_name: 'Abeesh',
      last_name: '',
      username: 'goyalabeesh@yahoo.co.in',
      password: 'Hello@123'
    },
    page: 'signup'
  },
  //7 -> Login
  {
    title: 'Logging in with empty field',
    value: {
      username: 'goyalabeesh@yahoo.co.in',
      password: ''
    },
    page: 'login'
  },
  //8 -> Login
  {
    title: 'Logging in with wrong password',
    value: {
      username: 'goyalabeesh@yahoo.co.in',
      password: 'Hello'
    },
    page: 'login'
  },
  //9 -> Login
  {
    title: 'Logging in with wrong username',
    value: {
      username: 'goyal@yahoo.co.in',
      password: 'Hello@123'
    },
    page: 'login'
  },

  //. Password Update Tests
  //10 -> Login
  {
    title: 'Logging into another account',
    value: {
      username: 'anjugoyal415@gmail.com',
      password: 'Hello@123'
    },
    page: 'login'
  },
  //11 -> Update
  {
    title: 'Update account password',
    value: {
      current_password: 'Hello@123',
      new_password: 'ByeBye@123'
    },
    page: 'account'
  },
  // Logout
  {
    name: 'Logout',
    title: 'Logout to login back with new password',
    value: {},
    page: 'any'
  },
  //12 -> Login
  {
    title: 'Logging in with new password',
    value: {
      username: 'anjugoyal415@gmail.com',
      password: 'ByeBye@123'
    },
    page: 'login'
  },
  //13 -> Update
  {
    title: 'Trying to update password with an empty field',
    value: {
      current_password: '',
      new_password: 'ByeBye@123'
    },
    page: 'account'
  },
  //14 -> Update
  {
    title: 'Trying to set new password same as current password',
    value: {
      current_password: 'ByeBye@123',
      new_password: 'ByeBye@123'
    },
    page: 'account'
  },
  //15 -> Update
  {
    title: 'Sending wrong current password',
    value: {
      current_password: 'Bye-Bye@123',
      new_password: 'Hello@123'
    },
    page: 'account'
  }
];

for (let i of tests) {
  if (i.page === 'signup') i.style = 'background-color: rgb(32, 110, 31)';
  if (i.name === 'Logout') i.style = 'background-color: brown';
  if (i.page === 'account') i.style = 'background-color: rgb(237, 148, 30)';

  i.event =
    i.page !== 'any'
      ? { type: 'input', box: '.credentials' }
      : { type: 'logout' };
}

$('body').insertBefore(create_test(tests), $('.credentials'));
