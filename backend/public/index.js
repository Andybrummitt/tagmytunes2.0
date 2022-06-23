let form = document.querySelector('form');

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const uuid = 3423423553465674564;

    fetch(`/`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.blob())
    .then(blob => console.log(blob))
  };

form.onsubmit = handleSubmit;

let btn = document.querySelector('button');

btn.onclick = handleClick;

function handleClick() {
    fetch('/yo',
    {
        method: 'POST'
    })
        .then(res => console.log(res))
}