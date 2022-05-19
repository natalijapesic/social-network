export class UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;

  constructor(name: string, email: string, password: string) {
    this.id = 0;
    this.username = name;
    this.email = email;
    this.password = password;
    this.isAdmin = false;
  }
}
