import Book from "../models/bookModel.js"
export async function getAllBooks(req,res) {
    // console.log("getAllBooks")
    // res.status(200).json("getAllBooks")
    try{
        const books = await Book.find().sort({ createAt: -1})
        res.status(200).json(books)
    } catch(error){
        console.error("Error in getAllBooks controller", error)
        res.status(500).json({message: "Internal Server error"})
}
}
export async function getBookById(req,res) {
//     console.log("getBookById")
//     res.status(200).json("getBookById")
    try{
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(400).json({message: "book mot found"})
        res.status(200).json(book)
    } catch(error){
        console.error("Error in getBookById controller", error)
        res.status(500).json({message: "Internal Server error"})
}
 }

export async function createBook(req,res) {
    // console.log("createBook")
    // res.status(200).json("createBook")
    try{
        const{ title, author, publishYear}=req.body
        if(!title || !author || !publishYear) {
            return res.status(404).json({ message: `All Fields are required`})
        }
        const book = new Book({ title, author, publishYear})
        const savedBook = await book.save()
        res.status(201).json({savedBook})
    } catch(error){
        console.error("error in createbook controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
    
}
export async function updateBook(req,res) {
//     console.log("updateBook")
//     res.status(200).json("updateBook")
    try{
        const{ title, author, publishYear}=req.body
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, {title,author,publishYear},{new: true})
        if (!updatedBook) return res.status(404).json({message: "book not found"})
        res.status(200).json(updatedBook)
    } catch(error){
        console.error("error in  updatebook controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}
export async function deleteBook(req,res) {
    // console.log("deleteBook")
    // res.status(200).json("deleteBook")
    try{
        const deleteBook = await Book.findByIdAndDelete(req.params.id)
        if(!deleteBook) return res.status(404).json({message: "book not found"})
            res.status(200).json({message: "Book deleted sucessfully"})
    } catch(error){
        console.error("error in  deleteBook controller", error)
        res.status(500).json({ message: "Internal server error"})
    }
}
