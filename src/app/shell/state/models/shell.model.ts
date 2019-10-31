import {Group} from '../../../group/state/models/group.model';

export enum ShellType {
  Single,
  Double,
  Quad,
  Eight
}

export class Shell {
  id: number;
  name: string;
  type: ShellType;
  group_id: number;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.type = json.type;
    this.group_id = json.group_id;
  }
}

export class ShellWithData extends Shell {
  group: Group;

  constructor(json: any) {
    super(json);
    this.group = new Group(json.club);
  }
}
