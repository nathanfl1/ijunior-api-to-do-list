import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";


const taskService = new TaskService();

export class TaskController {
    getAll(req: Request, res: Response) {
        const tasks = taskService.getAll();

        return res.status(200).json(tasks);
    }

    getById(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const task = taskService.getById(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada."
            });
        }

        return res.status(200).json(task);
    }

    create(req: Request, res: Response) {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "A requisicao deve conter o titulo da tarefa."
            });
        }

        const task = taskService.create(title);

        return res.status(201).json(task);
    }

    update(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;
        const { title, completed } = req.body;

        const task = taskService.update(id, title, completed);

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada."
            });
        }

        return res.status(200).json(task);
    }

    delete(req: Request<{ id: string }>, res: Response) {
        const { id } = req.params;

        const deleted = taskService.delete(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Tarefa não encontrada."
            });
        }

        return res.sendStatus(204);
    }
}