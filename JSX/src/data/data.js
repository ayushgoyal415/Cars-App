export const input_data = {
  update_password: [
    {
      name: 'current_password',
      placeholder: 'Current Password',
      type: 'password'
    },
    {
      name: 'new_password',
      placeholder: 'New Password',
      type: 'password'
    }
  ],
  login: [
    {
      name: 'username',
      placeholder: 'Username',
      type: 'email'
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password'
    }
  ],
  signup: [
    {
      name: 'first_name',
      placeholder: 'First Name',
      type: 'text'
    },
    {
      name: 'last_name',
      placeholder: 'Last Name',
      type: 'text'
    },
    {
      name: 'username',
      placeholder: 'Username',
      type: 'email'
    },
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password'
    }
  ],
  delete_account: [
    {
      name: 'password',
      placeholder: 'Password',
      type: 'password'
    }
  ],
  get_api: [
    {
      name: 'car',
      placeholder: 'Car Name',
      type: 'text'
    },
    {
      name: 'prop',
      placeholder: 'Property Name',
      type: 'text'
    }
  ],
  post_car_api: [
    {
      name: 'prop',
      placeholder: 'Property Name',
      type: 'text'
    },
    {
      name: 'value',
      placeholder: 'Property Value',
      type: 'text'
    }
  ]
};

//. Extracting form_data properties from input_data
let obj = {};
for (let i in input_data) obj[i] = {};
for (let i in input_data) {
  for (let j in input_data[i]) {
    Object.assign(obj[i], { [input_data[i][j].name]: '' });
  }
}

//. Adding additional form_data properties
Object.assign(obj.post_car_api, { data: {} });
export const input_names = obj;

//. Titles
export const titles = {
  signup: 'Welcome to car show',
  login: 'Welcome to car show',
  update_password: 'Update Password',
  delete_account: 'Delete Account',
  get_api: 'Search Your Cars',
  post_car_api: 'Post Car'
};

//. Buttons
export const update_button = {
  name: 'Update',
  type: 'submit'
};
export const cancel_button = {
  name: 'Cancel',
  style: { color: 'white', backgroundColor: 'rgb(40,40,40)' },
  type: 'button'
};
export const login_button = {
  name: 'Login',
  type: 'submit'
};
export const signup_button = {
  name: 'Signup',
  type: 'submit'
};
export const delete_button = {
  name: 'Delete',
  type: 'submit'
};
export const get_button = {
  name: 'GET',
  type: 'submit'
};
export const post_button = {
  name: 'POST',
  type: 'submit'
};
export const add_button = {
  name: 'Add',
  type: 'submit'
};
