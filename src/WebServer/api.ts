import express from 'express'
import helmet from 'helmet'

import { PrismaClient } from '@prisma/client'

import Config from '../Config'

import PrismaMongoBookRepository from '../BookRental/Book/PrismaMongoBookRepository'
import PrismaMongoUserRepository from '../BookRental/User/PrismaMongoUserRepository'
import PrismaMongoRentalRepository from '../BookRental/Rental/PrismaMongoRentalRepository'

import Gate from '../BookRental/Auth/Gate'

import Validator from './Core/Validator'

import SignInSchema from './Modules/Auth/SignInSchema'
import SignInUseCase from '../BookRental/UseCases/SignInUseCase'
import SignInController from './Modules/Auth/SignInController'

import AuthenticateUseCase from '../BookRental/UseCases/AuthenticateUseCase'
import AuthenticateController from './Modules/Auth/AuthenticateController'

import CreateBookSchema from './Modules/Books/CreateBookSchema'
import CreateBookUseCase from '../BookRental/UseCases/CreateBookUseCase'
import CreateBookController from './Modules/Books/CreateBookController'

import ListBooksSchema from './Modules/Books/ListBooksSchema'
import ListBooksUseCase from '../BookRental/UseCases/ListBooksUseCase'
import ListBooksController from './Modules/Books/ListBooksController'

import ShowBookSchema from './Modules/Books/ShowBookSchema'
import ShowBookUseCase from '../BookRental/UseCases/ShowBookUseCase'
import ShowBookController from './Modules/Books/ShowBookController'

import UpdateBookSchema from './Modules/Books/UpdateBookSchema'
import UpdateBookUseCase from '../BookRental/UseCases/UpdateBookUseCase'
import UpdateBookController from './Modules/Books/UpdateBookController'

import DeleteBookSchema from './Modules/Books/DeleteBookSchema'
import DeleteBookUseCase from '../BookRental/UseCases/DeleteBookUseCase'
import DeleteBookController from './Modules/Books/DeleteBookController'

import RentBookSchema from './Modules/Books/RentBookSchema'
import RentBookUseCase from '../BookRental/UseCases/RentBookUseCase'
import RentBookController from './Modules/Books/RentBookController'

import CatchErrorController from './Modules/ErrorHandler/CatchErrorController'
import LogErrorController from './Modules/ErrorHandler/LogErrorController'
import NotFoundController from './Modules/ErrorHandler/NotFoundController'

const prisma = new PrismaClient()

const userRepository = new PrismaMongoUserRepository(prisma)
const bookRepository = new PrismaMongoBookRepository(prisma)
const rentalRepository = new PrismaMongoRentalRepository(prisma)

const api = express()

api.use(helmet())
api.use(express.json())
api.use(express.urlencoded({ extended: true }))

const authenticationGate = new Gate(Config.JWTScret)

const signInValidator = new Validator(SignInSchema)
const signInUseCase = new SignInUseCase(authenticationGate, userRepository)
const signInController = new SignInController(signInUseCase)

const authenticateUseCase = new AuthenticateUseCase(authenticationGate, userRepository)
const authenticateController = new AuthenticateController(authenticateUseCase)

const createBookValidator = new Validator(CreateBookSchema)
const createBookUseCase = new CreateBookUseCase(bookRepository)
const createBookController = new CreateBookController(createBookUseCase)

const listBooksValidator = new Validator(ListBooksSchema)
const listBooksUseCase = new ListBooksUseCase(bookRepository)
const listBooksController = new ListBooksController(listBooksUseCase)

const showBookValidator = new Validator(ShowBookSchema)
const showBookUseCase = new ShowBookUseCase(bookRepository)
const showBookController = new ShowBookController(showBookUseCase)

const updateBookValidator = new Validator(UpdateBookSchema)
const updateBookUseCase = new UpdateBookUseCase(bookRepository, rentalRepository)
const updateBookController = new UpdateBookController(updateBookUseCase)

const deleteBookValidator = new Validator(DeleteBookSchema)
const deleteBookUseCase = new DeleteBookUseCase(bookRepository, rentalRepository)
const deleteBookController = new DeleteBookController(deleteBookUseCase)

const rentBookValidator = new Validator(RentBookSchema)
const rentBookUseCase = new RentBookUseCase({ bookRepository, rentalRepository })
const rentBookController = new RentBookController(rentBookUseCase)

const booksRouter = express.Router()

booksRouter.post('/', createBookValidator.getHandler(), createBookController.getHandler())
booksRouter.get('/', listBooksValidator.getHandler(), listBooksController.getHandler())
booksRouter.get('/:id', showBookValidator.getHandler(), showBookController.getHandler())
booksRouter.put('/:id', updateBookValidator.getHandler(), updateBookController.getHandler())
booksRouter.delete('/:id', deleteBookValidator.getHandler(), deleteBookController.getHandler())
booksRouter.post('/:id/rent', rentBookValidator.getHandler(), rentBookController.getHandler())

api.post('/signin', signInValidator.getHandler(), signInController.getHandler())
api.use('/books', authenticateController.getHandler(), booksRouter)
api.use((new NotFoundController()).getHandler())
api.use((new LogErrorController()).getHandler())
api.use((new CatchErrorController()).getHandler())

export default api
