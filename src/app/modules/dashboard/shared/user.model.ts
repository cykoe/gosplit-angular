export class User {
  username: string;
  token: string;

  constructor(user: any = {}) {
    this.username = user.username || '';
    this.token = user.token || '';
  }
}
