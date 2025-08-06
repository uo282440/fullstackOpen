const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://pabli:${password}@cluster0.2lxxktx.mongodb.net/agendaApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)



const userSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const User = mongoose.model('User', userSchema)

async function main() {
    try{

        await mongoose.connect(url)

        if (newName) {

            const newUser = new User({
                name: newName,
                number: newNumber,
            })

            const result = await newUser.save()
            console.log(`added ${newName}, number: ${newNumber} to the phonebook!`)
            

        } else {
            
            const result = await User.find({})
            console.log('Phonebook:')
            result.forEach(user => {
                console.log(`User: ${user.name}, number: ${user.number}`)
            })

        }

    } catch (error) {
        console.log(error)
    } finally {
        await mongoose.connection.close()
        console.log('Connection closed')
    }
}

main()


