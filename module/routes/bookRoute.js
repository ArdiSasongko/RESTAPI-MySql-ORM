const express = require("express")
const routes = new express.Router()
const book = require("../controller/bookController")

routes.post("/", book.addBook)
routes.get("/", book.getBooks)
routes.get("/:id", book.getBook)
routes.put("/:id", book.updateBook)
routes.delete("/:id", book.deleteBook)

module.exports = routes