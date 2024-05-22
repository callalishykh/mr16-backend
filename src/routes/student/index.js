import { Router } from "express";
import StudentController from "../../controller/student/index.js";

const studentRouter = Router();
studentRouter.get("/students", StudentController.getAll);

studentRouter.post("/student", StudentController.create);

studentRouter.get("/student/:id", StudentController.getSingle);

studentRouter.put("/student/:id", StudentController.update);

studentRouter.delete("/student/:id", StudentController.delete);

export default studentRouter;
