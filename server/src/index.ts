// import express, {Request, Response} from "express";
// import path from 'path';
// import {spawn} from "child_process";


// const app = express();
// app.get("/", (req: Request, res: Response) => {
//     const path_to_python_script = path.join(__dirname, "..", "..", "python", "test.py");
//     const ps = spawn("python", [path_to_python_script, `Duy`, `Quoc`]);

//     ps.stdout.on("data", function (data) {
//         res.send(data.toString());
//     });
// });

// app.get("/api", (req, res) => {
//     res.json({message: "Hello from server!"});
// });

// const port = process.env.PORT || 3001;

// app.listen(port, () => console.log(`Server is running in port ${port}`));
