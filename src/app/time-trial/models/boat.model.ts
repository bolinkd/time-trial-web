export class Boat {
  id: number;
  time_trial_id: number;
  name: string;
  start: number;
  end: number;
  time: number;
  bow_marker: number;

  constructor(name: string, bow_marker: number) {
    this.id = bow_marker;
    this.name = name;
    this.start = null;
    this.end = null;
    this.time = null;
    this.bow_marker = bow_marker;
  }
}
