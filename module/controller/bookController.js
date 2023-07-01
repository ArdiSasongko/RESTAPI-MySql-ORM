const book = require("../model/bookModel")
const Response = require("../model/Response")
const httpStatus = require("http-status")
const bookValidator = require("../utils/bookValidator")

const addBook = async (req,res) =>{
    try{
        const data = await bookValidator.validateAsync(req.body)
        const result = await book.create(data)

        if(!result){
            const response = new Response.Error(true, "Failed Add Data")
            return res.status(httpStatus.BAD_REQUEST).json(response)
        }

        const response = new Response.Success(false, "Success Add Data", result)
        return res.status(httpStatus.OK).json(response)
    }catch(error){
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
}

const getBooks = async (req, res) => {
    try {
      const books = await book.findAll();
  
      if (!books || books.length === 0) {
        const response = new Response.Error(true, "No data found");
        return res.status(httpStatus.NOT_FOUND).json(response);
      }
  
      const dataBooks = books.map((book) => {
        const { title, description, price } = book;
        return { title, description, price };
      });
  
      const response = new Response.Success(false, "Data found", dataBooks);
      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      const response = new Response.Error(true, error.message);
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }
  };
  
  const getBook = async (req,res) =>{
    try {
        const { id } = req.params
        const databook = await book.findOne({where:{id_book : id}})

        if(!databook){
            const response = new Response.Error(true, "Cant Find Book")
            return res.status(httpStatus.NOT_FOUND).json(response)
        }

        const response = new Response.Success(false, "Find Data", databook)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        const response = new Response.Error(true, error.message)
        return res.status(httpStatus.BAD_REQUEST).json(response)
    }
  }

  const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price } = req.body;
  
      const [rowsUpdated] = await book.update(
        { title, description, price },
        { where: { id_book: id } }
      );
  
      if (rowsUpdated === 0) {
        const response = new Response.Error(true, "Failed to update data");
        return res.status(httpStatus.BAD_REQUEST).json(response);
      }
  
      const updatedBook = await book.findOne({ where: { id_book: id } });
  
      const response = new Response.Success(false, "Successfully updated data", updatedBook);
      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      const response = new Response.Error(true, error.message);
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }
  };
  
  const deleteBook = async (req,res) =>{
    try {
        const { id } = req.params
        const dataBook = await book.destroy({where :{id_book:id}})

        if(!dataBook || dataBook === 0){
            const response = new Response.Error(true, "Failed to Delete data");
            return res.status(httpStatus.BAD_REQUEST).json(response);
        }

        const response = new Response.Success(false, "Successfully delete data");
        return res.status(httpStatus.OK).json(response);
    } catch (error) {
        const response = new Response.Error(true, error.message);
        return res.status(httpStatus.BAD_REQUEST).json(response);
    }
  }
module.exports = {addBook, getBooks, getBook, updateBook, deleteBook}