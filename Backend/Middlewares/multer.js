import multer from  "multer"


const storage = multer.diskStorage({
    filename : (req , file , cb) => {
        cb(null ,file.originalname)
    }
})

export const upload  = multer({storage : storage})









// import multer from "multer";
// import path from "path"; // Import path for extension handling

// const storage = multer.diskStorage({
   
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname); // Get file extension
//         cb(null, Date.now() + ext); // ✅ Save file with a unique name
//     }
// });

// // Multer instance
// export const upload = multer({ storage: storage });