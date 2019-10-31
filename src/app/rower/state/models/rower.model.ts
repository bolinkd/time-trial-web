export class Rower {
  id: number;
  first_name: string;
  last_name: string;
  organization_id: number;

  constructor(json: any) {
    this.id = json.id;
    this.first_name = json.first_name;
    this.last_name = json.last_name;
    this.organization_id = json.organization_id;
  }
}

