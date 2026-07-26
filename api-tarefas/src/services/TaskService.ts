interface Task {
    id: string;
    title: string;
    completed: boolean;
}

let actualId = 1;
const tasks: Task[] = []

export class TaskService {

    getAll(completed?: string, title?: string): Task[] {
        let result = tasks;

        if (completed !== undefined) {
            const isCompleted = completed === "true";
            result = result.filter(task => task.completed === isCompleted);
        }

        if (title !== undefined) {
            result = result.filter(task =>
                task.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        return result;
    }

    getById(id: string): Task | undefined {
        return tasks.find(task => task.id === id);
    }

    create(title: string): Task {

        const newTask: Task = {
            id: actualId.toString(),
            title,
            completed: false
        };
        actualId++;
        tasks.push(newTask);

        return newTask;
    }

    update(id: string, title?: string, completed?: boolean): Task | undefined {

        const task = tasks.find(task => task.id === id);

        if (!task) {
            return undefined;
        }

        if (title !== undefined) {
            task.title = title;
        }

        if (completed !== undefined) {
            task.completed = completed;
        }

        return task;
    }
    delete(id: string): boolean {

        const index = tasks.findIndex(task => task.id === id);

        if (index === -1) {
            return false;
        }

        tasks.splice(index, 1);

        return true;
    }

}

