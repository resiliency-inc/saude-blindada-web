const button = document.querySelector('#enviar');
const API_URL = "aHR0cHM6Ly9zYXVkZS1ibGluZGFkYS1hcGkuaGVyb2t1YXBwLmNvbS8=";

button.onclick = async function () {
    const form = document.querySelector('form');
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const load = document.querySelector('#loader');

    if (form.checkValidity()) {
        try {
            load.setAttribute("class", "loader");
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
            load.removeAttribute("class", "loader");
        } catch (error) {
            load.removeAttribute("class", "loader");
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