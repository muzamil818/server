const connectToDb = require('./config/db')

require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const connectToDb = require('./config/db')

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes')

const app = express()

app.use(express.json())

app.use(cors({origin: process.env.CLIENT_URI  || '*'}))

connectToDb()

app.get("/", (req, res)=>{
        res.send("api is running")
})


app.use('/api/auth', authRoutes)
app.use('/api/note', noteRoutes)

app.use((err, req, res, next)=>{
    console.error(err.stack)

    res.send(err.status || 500).json({message: err.message } || 'server error') 
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})