export class Utilisateur {
  email: string;
  name: string;
  id: number;

  constructor(email, name, id: number) {
    this.email = email;
    this.name = name;
    this.id = id;

  }
}
