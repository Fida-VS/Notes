const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const { get } = require('http')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title){

 const notes = await getNotes()

    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added'))

}


async function editNote(id, title){

    const notes = await getNotes()
   
    notes.forEach((note) => {
        if(note.id === id){
            note.title = title
        }
    })
   
       await fs.writeFile(notesPath, JSON.stringify(notes))
       console.log(chalk.bgBlue('Note was edited'))
   
   }

async function removeNote(id){

    const notes = await getNotes()

    notes.forEach((note, index) => {
        if(note.id === id){
             notes.splice(index, 1)
        
        }
    })

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.bgRed('Note was removed'))
}

async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes(){
const notes = await getNotes()
console.log(chalk.bgBlue('Here is the list of notes: '))
notes.forEach(note => {
    console.log(chalk.blue(`${note.id } ${note.title}`))
});
}

module.exports = {
    addNote, printNotes, removeNote, editNote
}