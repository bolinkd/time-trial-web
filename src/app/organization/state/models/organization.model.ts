export class Organization {
  id: number;
  name: string;
  abbreviation: string;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.abbreviation = json.abbreviation;
  }
}
