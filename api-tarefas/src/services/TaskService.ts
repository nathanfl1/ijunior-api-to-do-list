import { prisma } from "../config/prismaClient";

export class TaskService {

    async getAll(completed?: string, title?: string) {
        return await prisma.task.findMany({
            where: {
                completed:
                    completed !== undefined
                        ? completed === "true"
                        : undefined,

                title:
                    title
                        ? {
                            contains: title,
                        }
                        : undefined,
            },
        });
    }

    async getById(id: number) {
        return await prisma.task.findUnique({
            where: {
                id
            }
        });
    }

    async create(title: string) {
        return await prisma.task.create({
            data: {
                title,
                completed: false
            }
        });
    }


    async update(id: number, title?: string, completed?: boolean) {

        const task = await prisma.task.findUnique({
            where: { id }
        });

        if (!task) {
            return undefined;
        }

        return await prisma.task.update({
            where: { id },
            data: {
                title,
                completed
            }
        });
    }

    async delete(id: number): Promise<boolean> {

        const task = await prisma.task.findUnique({
            where: { id }
        });

        if (!task) {
            return false;
        }

        await prisma.task.delete({
            where: { id }
        });

        return true;
    }
}