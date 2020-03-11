import { API_URL } from "./variables.mjs";

const button = document.querySelector('#enviar');

button.onclick = async function () {
    const form = document.querySelector('form');
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;

    if (form.checkValidity()) {
        try {
            const res = await fetch(`${window.atob(API_URL)}clients/create`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, phone })
            });

            if (res.status === 201) {
                const data = await res.json();
                const alert = document.querySelector(".alert");
                alert.innerHTML = data;
                alert.setAttribute("class", "alert alert-success");
                form.reset();
            } else if (res.status === 400) {
                const data = await res.json();
                const alert = document.querySelector(".alert");
                alert.innerHTML = data;
                alert.setAttribute("class", "alert alert-danger");
            }
        } catch (error) {
            const alert = document.querySelector(".alert");
            alert.innerHTML = error.error || "Ocorreu um erro";
            alert.setAttribute("class", "alert alert-danger");
        }
    } else {
        form.querySelectorAll('input')
            .forEach(el => {
                const idError = `#${el.id}-error`;
                if (el.validity.valid) {
                    document.querySelector(`#${el.id}`).setAttribute("class", "form-control is-valid");
                    document.querySelector(idError).setAttribute("style", "display: none");
                } else {
                    document.querySelector(`#${el.id}`).setAttribute("class", "form-control is-invalid");
                    document.querySelector(idError).setAttribute("style", "display: block");
                }
            })
    }
}