export class Group {
  id: string;
  name: string;
  people: string[];

  constructor(group: any) {
    this.id = group._id || '';
    this.name = group.name || '';
    this.people = group.people || [];
  }

  toJson() {
    return {
      _id: this.name,
      name: this.name,
      people: this.people,
    };
  }
}
