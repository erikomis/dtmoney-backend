export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class UserDto {
  id: string;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
