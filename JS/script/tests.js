function create_test(tests) {
  const div = document.createElement('div');
  div.id = 'test-div';

  let count = 1;
  for (let i in tests) {
    let { name = `Test ${count++}`, title, value, style } = tests[i];
    let s = '';
    for (let j in value) s += `<br> ${j} : ${value[j]}`;
    div.innerHTML += `<div><button id="$$-${i}" style="${style}">${name}</button>
      <span>
        <span>
          ${title}
        </span>
        <br>
        ${s}
      </span>
    </div>`;
  }
  div.innerHTML += /*HTML*/ `
<style>
  #test-div{
    display: flex;
    flex-wrap : wrap;
    align-items: center;
    justify-content: left;
    width: 600px;
    margin : auto;
    margin-bottom : 50px;
    background-color: lightGray;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
  }
  #test-div button{
    width: 100px;
    padding : 10px 15px;
    font-size: 15px;
    color: white;
    border: 1px solid rgba(50, 50, 50, 0.5);
    background-color : black;
    transition: opacity 0.15s;
    cursor: pointer;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
  }
  #test-div button:hover {
    opacity: 0.5;
  }
  #test-div button:active {
    opacity: 1;
    box-shadow : none;
  }
  #test-div > div{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  #test-div > div > span{
    z-index: 100;
    position: absolute;
    background-color: rgb(50, 50, 50);
    color: white;
    padding: 20px;
    border-radius: 4px;
    font-size: 15px;
    top: 50px;
    display: none;
    transition: opacity 0.15s;
    pointer-events: none;
    white-space: nowrap;
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.3);
    opacity : 0.95;
  }
  #test-div > div > span > span{
    color: yellow;
  }
  #test-div > div:hover > span{
    display: block;
  }
</style>
  `;
  div.addEventListener('click', function (e) {
    const test = tests[e.target.id.slice(3)];
    const page = `${LS_domain}/${test.page}.html`;

    if (test.page !== 'any' && page !== document.URL) {
      return window.location.replace(page);
    }

    if (test.event.type === 'input') {
      /** @type {HTMLElement} box */
      const box = $(test.event.box);
      const form = box.querySelector(`form`);
      const inputs = form.querySelectorAll(`input`);

      const values = Object.values(test.value);
      let equal = true;
      inputs.forEach((e, i) => {
        if (e.value !== values[i]) equal = false;
      });
      if (equal) return form.dispatchEvent(new Event('submit'));

      inputs.forEach((e, i) => e.setAttribute('value', values[i]));
      box.dispatchEvent(new Event('input'));
    }

    if (test.event.type === 'logout') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${HTTPS_domain}/api/account/logout`);
      xhr.setRequestHeader('Accept', '*/*');
      xhr.withCredentials = true;

      xhr.onload = function () {
        const msg = $('#msg');
        msg.style.color = 'red';

        const { message } = JSON.parse(this.responseText);
        if (this.status !== 200) return (msg.innerHTML = message);

        msg.style.color = 'green';
        msg.innerHTML = message;
      };

      xhr.send();
    }
  });

  return div;
}
