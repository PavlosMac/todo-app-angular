

export interface Todo {
  id: number;
  title: string;
  body: string;
  dateCreated?: string;
  dateUpdated?: string;
  completed: boolean;
  priority: string
}

export class TodoEntry {

  constructor( title: string, body: string, priority: string) {}
}
