const { stdin, stdout } = process
const fs = require('fs')
const path = require('path')

const [command, title, content] = process.argv.slice(2)
const folderName = './notes',
  fileName = 'notes'

switch (command) {
  case 'create':
    create(title, content)
    break
  case 'list':
    list()
    break
  case 'remove':
    remove()
    break
  default:
    stdout.write('Valid command: create, list, remove')
}

function create(title, content) {
  if (!fs.existsSync(folderName)) {
    fs.mkdir(path.join(__dirname, 'notes'), err => {
      if (err) stdout.write('Something went wrong while creating folder...')
    })
  }

  if (!fs.existsSync(fileName)) {
    const emptyNotes = JSON.stringify([])
    fs.writeFile(path.join(__dirname, 'notes', 'notes.json'), emptyNotes, err => {
      if (err) stdout.write('Something went wrong while creating file...')
    })
  }
  fs.readFile(path.join(__dirname, 'notes', 'notes.json'), (err, data) => {
    if (err) stdout.write('Something went wrong while reading file...')
    const oldData = JSON.parse(data)
    oldData.push({ title, content })
    const updatedData = JSON.stringify(oldData)

    fs.writeFile(path.join(__dirname, 'notes', 'notes.json'), updatedData, err => {
      if (err) stdout.write('Something went wrong while writing file...')
    })
  })
}
