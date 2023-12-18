document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  } else if (event.target.dataset.type === 'edit') {

    const newTitle = prompt('Введите новое название', '')

    const id = event.target.dataset.id

if(newTitle === null || newTitle === ''){
 return
} else {
    edit(id, newTitle)
    .then(() => {
      event.target.closest('li').textContent = newTitle
    })
    .catch((error) => {
      console.log(error)
    })
  }


  }

})


async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, newText) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ title: newText })
  })
}