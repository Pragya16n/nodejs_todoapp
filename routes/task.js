import express from "express";
import { deleteTask, getMyTask, newTasks, updateTask } from "../controllers/task.js";
import { isAuhenticated } from "../midddlewares/auth.js";

const  router = express.Router();

router.post("/new",isAuhenticated, newTasks);
router.get("/my",isAuhenticated,getMyTask);
router.route("/:id").put(isAuhenticated,updateTask).delete(isAuhenticated,deleteTask);



 export default router;