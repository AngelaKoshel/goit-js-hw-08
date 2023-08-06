import throttle from "lodash.throttle";

const STORAGE_KEY = 'feedback-from-state';

let formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('input', throttle(onInputTextarea, 500));
refs.form.addEventListener('submit', onFormSubmit);

initInputTextarea();

function onInputTextarea(event) {
    // якщо одне значення
    formData[event.target.name] = event.target.value.trim();
    // переводимо об'єкт в рядок
    const formDataJSON = JSON.stringify(formData);
    // зберігаємо у сховище
    localStorage.setItem(STORAGE_KEY, formDataJSON);

};

function onFormSubmit(event) {
    // зупеняємо поведінку за замовчуванням
    event.preventDefault();
    // виводимо в консоль об'єкт з полями email і messafe
    console.log(formData)
    // очищуємо форму
    event.currentTarget.reset();
    formData = {};
    // прибираємо значення зі сховище 
    localStorage.removeItem(STORAGE_KEY);
}

function initInputTextarea() {
    try {
    // отримуємо значення зі сховища 
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return;
        formData = JSON.parse(data);
    // якщо щось було вже введено, поновлюємо
        Object.entries(savedData).forEach(([name, value]) => {
            refs.form.elements[name].value = value;
        });
   
    } catch (error) {
        return;
    }

};