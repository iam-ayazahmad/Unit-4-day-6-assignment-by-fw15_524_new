const express = require("express")
const mongoose = require("mongoose")

const app=express()

app.use(express.json())//midddelware


const connect=()=>{
    return mongoose.connect("mongodb+srv://Ayaz_Ahmad:AYAZisLUCKY@cluster0.sxbry.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

}





const userSchema=new mongoose.Schema({
    first_Name:{type:String,required:true},
    last_Name:{type:String,required:true}  
})
const Users=mongoose.model("newuser",userSchema)






const sectionSchema=new mongoose.Schema({

  section_name:{type:String,required:true}
})
const Section=mongoose.model("mysection",sectionSchema)







const bookSchema=new mongoose.Schema({
    first_Name:{type:String,required:true},
    lasr_Name:{type:String,required:true},
    sectionID:{type:mongoose.Schema.Types.ObjectId,ref:"mysection"}
     
})
const Books=mongoose.model("mybook",bookSchema)







const authorSchema= new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"newuser"}
})

const Authors=mongoose.model("author",authorSchema)






const bookAuthor_schema=new mongoose.Schema({
    bookID:{type:mongoose.Schema.Types.ObjectId,ref:"mybook"},
    AuthorID:{type:mongoose.Schema.Types.ObjectId,ref:"aythor"}
})

const Book_authors=mongoose.model("book_author",bookAuthor_schema)








const checked_outSchema=new mongoose.Schema({
    userID:{type:mongoose.Schema.Types
        .ObjectId,ref:"user1"},
    bookID:{type:mongoose.Schema.Types
        .ObjectId,ref:"book"},
    checkedoutTime:{type:Date,default:null},
    checkedinTime:{type:Date,default:null}

})

const Checked_out=mongoose.model("checked_out",checked_outSchema)









app.post("/users",async(req,res)=>{
    try{
        const users=await Users.create(req.body)
        return res.status(200).send(users)

    }
    catch(err){
        return res.status(200).send(err.message)

    }
})
app.get("/users",async(req,res)=>{
    try{
        const users=await Users.find({}).lean().exec()
        return res.status(200).send(users)

    }
    catch(err){
        return res.status(200).send(err.message)

    }
})




app.post("/sections",async(req,res)=>{
    try{
        const sections=await Section.create(req.body)
          return res.status(200).send(sections)

    }
    catch(err){
        return res.status(500).send(err.message)
    }
})



app.get("/sections",async(req,res)=>{
    try{
          const sections=await Section.find({}).lean().exec()
          return res.status(200).send(sections)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})









app.post("/authors",async(req,res)=>{
    try{
          const authors=await Authors.create(req.body)
          return res.status(200).send(authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/authors",async(req,res)=>{
    try{
          const authors=await Authors.find({}).lean().exec()
          return res.status(200).send(authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})







app.get("/books/:authorID",async(req,res)=>{
    try{
     const books = await Book_authors.findById(req.params.authorID).populate("bookID")
     return res.status(200).send(books)
    }
    catch
    {
        return res.status(500).send(err.message)
    }
})












app.post("/books",async(req,res)=>{
    try{
          const books=await Books.create(req.body)
          return res.status(200).send(books)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/books",async(req,res)=>{
    try{
          const books=await Books.find({}).lean().exec()
          return res.status(200).send(books)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})









app.post("/book_authors",async(req,res)=>{
    try{
          const book_authors=await Book_authors.create(req.body)
          return res.status(200).send(book_authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/book_authors",async(req,res)=>{
    try{
          const book_authors=await Book_authors.find({}).lean().exec()
          return res.status(200).send(book_authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/books/:sectionID",async(req,res)=>{
    try{
     const books=await Books.findById(req.params.sectionID)
     return res.status(200).send(books)
    }
    catch{
        return res.status(500).send(err.message)
    }
})







app.get("/checkedOut",async(req,res)=>{
    try{
          const Chekedoutbooks=await Checked_out.find({}).lean().exec()
          return res.status(200).send(Chekedoutbooks)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})







app.listen(7500,async()=>{
    try{
        await connect()
        console.log("listening on port 7500")
    }
    catch(err){
        console.log(err.message)
    }
})