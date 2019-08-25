export class Boat {
  id: number;
  time_trial_id: number;
  name: string;
  start: number;
  end: number;
  time: number;
  bow_marker: number;

  constructor(json: any) {
    this.id = json.id;
    this.time_trial_id = json.time_trial_id;
    this.name = json.name;
    this.start = json.start;
    this.end = json.end;
    this.time = json.time;
    this.bow_marker = json.bow_marker;
  }
}
