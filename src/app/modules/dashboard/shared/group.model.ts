export class Group {
  id: string;
  name: string;
  people: string[];

  constructor(group: any = {}) {
    this.id = group.id || '';
    this.name = group.name || '';
    this.people = group.people || [];
  }

  toJson(): any {
    return {
      _id: this.id,
      name: this.name,
      people: this.people,
    };
  }
}
