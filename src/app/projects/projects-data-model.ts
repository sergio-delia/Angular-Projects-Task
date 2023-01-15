import { Task } from "../tasks/task-data-model";

export interface Projects {
  //id: string,
  name: string;
  available_hours: number;
  tasks: Task[];
}
