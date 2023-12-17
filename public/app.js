document.addEventListener('click', event => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }

  if (event.target.dataset.type === 'edit') {

    const newTitle = prompt('Введите новое название', '')

    const id = event.target.dataset.id

    edit(id, newTitle).then(() => {
      event.target.closest('li').textContent = newTitle
    })
  }

})


async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, newText) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newText })
  })
}