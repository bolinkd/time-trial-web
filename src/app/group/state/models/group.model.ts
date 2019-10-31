export class Group {
  id: number;
  name: string;
  parent_id: number;
  organization_id: number;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.parent_id = json.parent_id;
    this.organization_id = json.organization_id;
  }
}

export class GroupTreeData extends Group {
  parent: Group;
  children: GroupTreeData[];
  expandable: boolean;
  level: number;

  constructor(self: Group, parent?: Group, children?: GroupTreeData[]) {
    super(self);
    this.parent = parent;
    this.children = children;
  }
}
