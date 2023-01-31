import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener('input', throttle(onFormInput, 500));

refs.form.addEventListener('submit', onFormSubmit);

initForm();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
  formData = {};
}

function initForm() {
  const initValues = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (initValues) {
    const { email, message } = refs.form.elements;
    email.value = initValues.email || '';
    message.value = initValues.message || '';
  }
}
