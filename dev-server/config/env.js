import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

const env = dotenv.config()
// console.log(process.env)

export function setEnvironment(app) {
    if(process.env.NODE_ENV !== 'production') {
        setDevEnv(app)
    }else {
        setProdEnv(app)
    }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development'
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cors())
}

function setProdEnv(app) {
    process.env.NODE_ENV = 'production'
    app.use(bodyParser.json())
    app.use(express.static(__dirname + '/../dist'))
}