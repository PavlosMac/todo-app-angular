import {Deserializable} from './deserializable.model';


export interface Todo {
  id: number;
  title: string;
  description: string;
  dateCreated?: string;
  dateUpdated?: string;
  completed: boolean;
  priority: string
}

export class TodoEntry implements Deserializable {

  public id: number;
  public title: string;
  public description: string;
  public date_created: string;
  public date_updated?: string;
  public completed: boolean;
  public priority: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
