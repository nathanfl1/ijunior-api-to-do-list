import { Request, Response } from "express";
import { TaskService } from "../services/TaskService";


const taskService = new TaskService();

export class TaskController {
    async getAll(req: Request, res: Response) {
        const { completed, title } = req.query;

        const tasks = await taskService.getAll(
            completed as string | undefined,
            title as string | undefined
        );

        return res.status(200).json(tasks);
    }

    async getById(req: Request<{ id: number }>, res: Response) {
        const id = Number(req.params.id);

        const task = await taskService.getById(id);

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada."
            });
        }

        return res.status(200).json(task);
    }

    async create(req: Request, res: Response) {
        const { title } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                message: "A requisicao deve conter o titulo da tarefa."
            });
        }

        const task = await taskService.create(title);

        return res.status(201).json(task);
    }

    async update(req: Request<{ id: number }>, res: Response) {
        const id = Number(req.params.id);
        const { title, completed } = req.body;

        const task = await taskService.update(id, title, completed);

        if (!task) {
            return res.status(404).json({
                message: "Tarefa não encontrada."
            });
        }

        return res.status(200).json(task);
    }

    async delete(req: Request<{ id: number }>, res: Response) {
        const id = Number(req.params.id);

        const deleted = taskService.delete(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Tarefa não encontrada."
            });
        }

        return res.sendStatus(204);
    }
}