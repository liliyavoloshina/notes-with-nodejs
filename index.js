const { stdout } = process
const fs = require('fs')
const path = require('path')

const [command, title, content] = process.argv.slice(2)
const folderName = './notes',
  fileName = 'notes'

  class NoteBook {
    constructor() {
      this.init()
    }
  
    init() {
      if (!fs.existsSync(folderName)) {
        fs.mkdir(path.join(__dirname, 'notes'), e => {
          if (e) stdout.write('Something went wrong while creating folder...')
        })
      }
  
      if (!fs.existsSync(fileName)) {
        const emptyNotes = JSON.stringify([])
        fs.writeFile(path.join(__dirname, 'notes', 'notes.json'), emptyNotes, e => {
          if (e) stdout.write('Something went wrong while creating file...')
        })
      }
    }
  
    create(title, content) {
      fs.readFile(path.join(__dirname, 'notes', 'notes.json'), (e, data) => {
        if (e) stdout.write('Something went wrong while reading file...')
        const oldData = JSON.parse(data)
        oldData.push({ title, content })
        const updatedData = JSON.stringify(oldData)
  
        fs.writeFile(path.join(__dirname, 'notes', 'notes.json'), updatedData, e => {
          if (e) stdout.write('Something went wrong while writing file...')
        })
      })
    }
  
    list() {
      fs.readFile(path.join(__dirname, 'notes', 'notes.json'), (e, data) => {
        if (e) stdout.write('Something went wrong while reading file...')
        const arr = JSON.parse(data)
        arr.forEach((note, idx) => {
          console.log(`Note ${idx + 1}: ${note.title}`)
        })
      })
    }
  
    view(title) {
      fs.readFile(path.join(__dirname, 'notes', 'notes.json'), (e, data) => {
        if (e) stdout.write('Something went wrong while reading file...')
        const arr = JSON.parse(data)
        const foundNote = arr.find(note => note.title === title)
  
        if (!foundNote) {
          stdout.write('There is no note with this title...')
        } else {
          stdout.write(`${foundNote.content}`)
        }
      })
    }
  
    remove(title) {
      fs.readFile(path.join(__dirname, 'notes', 'notes.json'), (e, data) => {
        if (e) stdout.write('Something went wrong while reading file...')
        const arr = JSON.parse(data)
        const filteredData = arr.filter(note => note.title !== title)
        const dataToUpdate = JSON.stringify(filteredData)
  
        fs.writeFile(path.join(__dirname, 'notes', 'notes.json'), dataToUpdate, e => {
          if (e) stdout.write('Something went wrong while writing file...')
        })
      })
    }
  }

const noteBook = new NoteBook()

switch (command) {
  case 'create':
    noteBook.create(title, content)
    break
  case 'list':
    noteBook.list()
    break
  case 'remove':
    noteBook.remove(title)
    break
  case 'view':
    noteBook.view(title)
    break
  default:
    stdout.write('Valid command: create, list, remove')
}
