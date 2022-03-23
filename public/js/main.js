const input = document.querySelector(".input");
const btnSubmit = document.querySelector(".btn-submit");
const form = document.querySelector("form");
const content = document.querySelector("#content");

const spinner = `
    <div class="loader-conainer container-fluid d-flex justify-content-center align-items-center mt-5 mb-5">
        <div class="loader spinner-border text-success"></div>
    </div>
`;

const isEmpty = (str) => {
    str = str.trim();
    return str.length === 0;
}

form.addEventListener("submit", (event) => {
    if(isEmpty(input.value)){
        event.preventDefault();
        return false;
    }
    content.innerHTML = spinner;
})