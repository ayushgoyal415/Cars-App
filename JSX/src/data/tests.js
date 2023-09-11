const tests = {
  basic: {
    signup: [
      {
        title: 'Signing up a new account',
        value: {
          first_name: 'Abeesh',
          last_name: 'Goyal',
          username: 'goyalabeesh@yahoo.co.in',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'right'
      },
      {
        title: 'Trying to create a new account with same username',
        value: {
          first_name: 'Abeesh',
          last_name: 'Goyal',
          username: 'goyalabeesh@yahoo.co.in',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        name: 'Login',
        title:
          'Verifying the signup by logging into the recently created account',
        value: {
          username: 'goyalabeesh@yahoo.co.in',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'Trying to signup a new account when logged in',
        value: {
          first_name: 'Random',
          last_name: 'Random',
          username: 'random@gmail.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        name: 'Logout',
        title: 'Logging out before testing another API',
        value: {},
        page: 'logout',
        setup: 'support'
      }
    ],
    login: [
      {
        title: 'Logging in to test the Login API',
        value: {
          username: 'chamanlal@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'right'
      },
      {
        title: 'Trying to login when already logged in',
        value: {
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'wrong'
      },
      {
        name: 'Logout',
        title: 'Logging out to test other login API cases',
        value: {},
        page: 'logout',
        setup: 'support'
      },
      {
        title: 'Trying to login in with wrong password',
        value: {
          username: 'chamanlal@gmail.com',
          password: 'Hello'
        },
        page: 'login',
        setup: 'wrong'
      },
      {
        title: 'Trying to login in with wrong username',
        value: {
          username: 'chaman@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'wrong'
      }
    ],
    update_password: [
      {
        name: 'Login',
        title: 'Login is required before testing Update Password API',
        value: {
          username: 'anjugoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'Updating account password',
        value: {
          current_password: 'Hello@123',
          new_password: 'ByeBye@123'
        },
        page: 'update_password',
        setup: 'right'
      },
      {
        name: 'Logout',
        title: 'Logging out to verify password update',
        value: {},
        page: 'logout',
        setup: 'support'
      },
      {
        name: 'Login',
        title: 'Logging in with the new password',
        value: {
          username: 'anjugoyal415@gmail.com',
          password: 'ByeBye@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'Trying to update password by sending wrong current password',
        value: {
          current_password: 'Bye-Bye@123',
          new_password: 'Hello@123'
        },
        page: 'update_password',
        setup: 'wrong'
      },
      {
        name: 'Logout',
        title: 'Logging out before testing another API',
        value: {},
        page: 'logout',
        setup: 'support'
      }
    ],
    delete_account: [
      {
        name: 'Login',
        title: 'Logging is required before testing Delete Account API',
        value: {
          username: 'pushpinderbobby98@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'Trying to delete account by sending wrong password',
        value: {
          password: 'Bye@123'
        },
        page: 'delete_account',
        setup: 'wrong'
      },
      {
        title: 'Deleting account',
        value: {
          password: 'Hello@123'
        },
        page: 'delete_account',
        setup: 'right'
      },
      {
        name: 'Login',
        title:
          'Verifying account delete success by trying to login into the deleted account',
        value: {
          username: 'pushpinderbobby98@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      }
    ],
    get_api: [
      {
        name: 'Signup',
        title: 'Signup and login are required before accessing the Get API',
        value: {
          first_name: 'GetAPI',
          last_name: 'Car',
          username: 'getapi@cars.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'support'
      },
      {
        name: 'Login',
        title: 'Login is required before testing Get API',
        value: {
          username: 'getapi@cars.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'Trying to get cars before posting any car',
        value: {
          car: '',
          prop: ''
        },
        page: 'get_api',
        setup: 'wrong'
      },
      {
        name: 'Logout',
        title: 'Logging out to sign in with another account that has cars',
        value: {},
        page: 'logout',
        setup: 'support'
      },
      {
        name: 'Login',
        title: 'Logging into an account that has cars',
        value: {
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'Getting all cars',
        value: {
          car: '',
          prop: ''
        },
        page: 'get_api',
        setup: 'right'
      },
      {
        title: 'Getting a single car',
        value: {
          car: 'zen',
          prop: ''
        },
        page: 'get_api',
        setup: 'right'
      },
      {
        title: 'Trying to get a car that does not exist',
        value: {
          car: 'verna',
          prop: ''
        },
        page: 'get_api',
        setup: 'wrong'
      },
      {
        title: 'Getting a multi-word property of a multi-word car',
        value: {
          car: 'maruti baleno',
          prop: 'major contributions'
        },
        page: 'get_api',
        setup: 'right'
      },
      {
        title: 'Trying to get property of a car when car itself does not exist',
        value: {
          car: 'verna',
          prop: 'speed'
        },
        page: 'get_api',
        setup: 'wrong'
      },
      {
        title: 'Trying to get a property which the car does not have',
        value: {
          car: 'zen',
          prop: 'price'
        },
        page: 'get_api',
        setup: 'wrong'
      }
    ],
    post_car_api: [
      {
        name: 'Login',
        title: 'Login is required before testing Post Car API',
        value: {
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title:
          'Posting a new car (Multi-word car name and multi-word property name is allowed)',
        value: {
          data: {
            name: 'hyundai verna',
            speed: '140',
            'main features': 'comfort, speedy'
          }
        },
        page: 'post_car_api',
        setup: 'right'
      },
      {
        title: 'Getting the car recently created',
        value: {
          car: 'hyundai verna',
          prop: ''
        },
        page: 'get_api',
        setup: 'support'
      },
      {
        title: 'Trying to post a car name with leading or trailing whitespace',
        value: {
          data: {
            name: 'thar ',
            speed: '120',
            average: '10'
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      },
      {
        title:
          'Trying to post a property name with leading or trailing whitespace',
        value: {
          data: {
            name: 'thar',
            'speed ': '120',
            ' average': '10'
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      },
      {
        title:
          'Trying to post a property value with leading or trailing whitespace',
        value: {
          data: {
            name: 'thar',
            speed: ' 120',
            average: '10 '
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      },
      {
        title: 'Trying to post a car which already exists',
        value: {
          data: {
            name: 'zen',
            speed: '140',
            average: '17'
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      },
      {
        title: 'Trying to post a car without a name',
        value: {
          data: {
            name: '',
            speed: '140',
            average: '17'
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      },
      {
        title: 'Trying to post a property with no name',
        value: {
          data: {
            name: 'bmw',
            '': '140',
            average: '17'
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      },
      {
        title: 'Trying to post a property with empty property value',
        value: {
          data: {
            name: 'bmw',
            speed: '',
            average: '17'
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      },
      {
        title:
          'Trying to post a basic property, other than name (car_id, posted_by, created_on)',
        value: {
          data: {
            name: 'bmw',
            car_id: 3
          }
        },
        page: 'post_car_api',
        setup: 'wrong'
      }
    ]
  },

  joi: {
    signup: [
      {
        title: 'No field can be empty',
        value: {
          first_name: 'Ayush',
          last_name: '',
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'No field (except for password) can exceed 50 characters',
        value: {
          first_name: 'AyushAyushAyushAyushAyushAyushAyushAyushAyushAyushAyush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'First Name and Last Name must be at least 3 characters long',
        value: {
          first_name: 'Ayush',
          last_name: 'Do',
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Password must be at least 8 characters long',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'Bye@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title:
          'First Name and Last Name cannot have a leading or trailing whitespace',
        value: {
          first_name: 'Ayush ',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Username must contain 2 domain segments',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@facebook',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Top Level Domain(TLD) must be valid',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.bye',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Password must contain at least 1 numeric',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello@Bye'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Password must contain at least 1 special character',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Password must contain at least 1 lowercase character',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'HELLO@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Password must contain at least 1 uppercase character',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'hello@123'
        },
        page: 'signup',
        setup: 'wrong'
      },
      {
        title: 'Password must not contain whitespace',
        value: {
          first_name: 'Ayush',
          last_name: 'Goyal',
          username: 'ayushgoyal415@gmail.com',
          password: 'Hello @123'
        },
        page: 'signup',
        setup: 'wrong'
      }
    ],
    login: [
      {
        title: 'No field can be empty',
        value: {
          username: 'chamanlal@gmail.com',
          password: ''
        },
        page: 'login',
        setup: 'wrong'
      }
    ],
    update_password: [
      {
        name: 'SignUp',
        title:
          'Signup and login is required before testing Update Password API',
        value: {
          first_name: 'Update',
          last_name: 'Test',
          username: 'updatetest@joi.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'support'
      },
      {
        name: 'Login',
        title: 'Login is required before testing Update Password API',
        value: {
          username: 'updatetest@joi.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'No field can be empty',
        value: {
          current_password: '',
          new_password: 'ByeBye@123'
        },
        page: 'update_password',
        setup: 'wrong'
      },
      {
        title: 'New password must not be same as current password',
        value: {
          current_password: 'ByeBye@123',
          new_password: 'ByeBye@123'
        },
        page: 'update_password',
        setup: 'wrong'
      },
      {
        title: 'All other password validation applies',
        value: {
          current_password: 'Hello@123',
          new_password: 'Bye@123'
        },
        page: 'update_password',
        setup: 'wrong'
      },
      {
        name: 'Logout',
        title: 'Logging out before testing another API',
        value: {},
        page: 'logout',
        setup: 'support'
      }
    ],
    delete_account: [
      {
        name: 'SignUp',
        title: 'Signup and login is required before testing Delete Account API',
        value: {
          first_name: 'Delete',
          last_name: 'Test',
          username: 'deletetest@joi.com',
          password: 'Hello@123'
        },
        page: 'signup',
        setup: 'support'
      },
      {
        name: 'Login',
        title: 'Login is required before testing Delete Account API',
        value: {
          username: 'deletetest@joi.com',
          password: 'Hello@123'
        },
        page: 'login',
        setup: 'support'
      },
      {
        title: 'Password is required',
        value: {
          password: ''
        },
        page: 'delete_account',
        setup: 'wrong'
      },
      {
        name: 'Logout',
        title: 'Logging out before testing another API',
        value: {},
        page: 'logout',
        setup: 'support'
      }
    ],
    get_api: [
      {
        title: 'Trying to get property by not sending a car name',
        value: {
          car: '',
          prop: 'speed'
        },
        page: 'get_api',
        setup: 'wrong'
      },
      {
        title:
          'Trying to get a property by sending a leading or trailing whitespace',
        value: {
          car: 'zen',
          prop: ' price'
        },
        page: 'get_api',
        setup: 'wrong'
      },
      {
        title: 'Trying to get basic properties (car_id, posted_by, created_on)',
        value: {
          car: 'zen',
          prop: 'car_id'
        },
        page: 'get_api',
        setup: 'wrong'
      }
    ],
    post_car_api: []
  }
};

for (let i in tests)
  for (let j in tests[i])
    for (let k of tests[i][j]) {
      if (k.setup === 'wrong') {
        k.btn_style = { backgroundColor: 'rgb(212, 20, 52)' };
        k.span_style = { color: 'rgb(255, 99, 107)', fontWeight: 800 };
      }
      if (k.setup === 'right') {
        k.btn_style = { backgroundColor: 'rgb(255, 149, 0)', color: 'black' };
        k.span_style = { color: 'yellow' };
      }
      if (k.setup === 'support') {
        k.btn_style = { backgroundColor: 'black' };
        k.span_style = { color: 'yellow' };
      }
    }

export default tests;

export const select_options = Object.keys(tests.basic);
