import { TaskModel, ITask } from "../models/task";

import { Request, Response } from "express";

const taskController = {
  getAllTasks: async (_req: Request, res: Response) => {
    try {
      const tasks: ITask[] = await TaskModel.find()
        // .populate("lists")
        .exec();

      console.log("tasks", tasks);

      return res.status(200).send({ ok: true, data: tasks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },

  addTask: async (req: Request, res: Response) => {
    try {
      const task: ITask = req.body;

      const taskExist = await TaskModel.findOne({
        name: task.name,
      }).exec();
      if (taskExist) {
        return res.status(409).send({
          ok: false,
          error: "There is already another task with this name",
        });
      }
      const newTask = await TaskModel.create(task);
      return res.status(201).send({ ok: true, data: newTask });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },
  updateTask: async (req: Request, res: Response) => {
    try {
      const taskId = req.params._id;
      const task: ITask = req.body;
      console.log("task", task);
      const taskExist = await TaskModel.findById(taskId);
      if (!taskExist) {
        return res.status(409).send({
          ok: false,
          error: "This task doesn't exist",
        });
      }
      const updatedTask = {
        name: taskExist.name,
        status: taskExist.status,
      };
      if (req.body.hasOwnProperty("name")) updatedTask.name = task.name;
      if (req.body.hasOwnProperty("status")) updatedTask.status = task.status;
      console.log("updatedTask", updatedTask);
      taskExist.set(updatedTask);
      // todo try
      // taskExist.set(task);
      await taskExist.save();

      return res.status(200).send({ ok: true, data: taskExist });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },
  deleteTask: async (req: Request, res: Response) => {
    try {
      const taskId = req.params._id;

      const taskExist = await TaskModel.findById(taskId);
      if (!taskExist) {
        return res.status(409).send({
          ok: false,
          error: "This task doesn't exist",
        });
      }
      await TaskModel.findByIdAndDelete(taskId);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Sorry, something went wrong :/" });
    }
  },
};

export default taskController;