import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { Utilisateur } from '../tab2/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  utilisateurs: Array<Utilisateur> = [];
  constructor(public toastController: ToastController) {
  }

  setUtilisateur(name, email) {
    const user = this.getUserByEmail(email);
    user.email = email;
    user.name = name;
    this.presentToast('Utilisateur modifié');
  }
  addUtilisateurs(email, name) {
    this.utilisateurs.push(new Utilisateur(email, name, this.utilisateurs.length));
    this.presentToast('Utilisateur ajouté');

  }
  async presentToast(messageToas) {
    const toast = await this.toastController.create({
      header: '',
      message: messageToas,
      color: 'success',
      position: 'bottom',
      duration: 1000

    });
    await toast.present();
  }
  getUtilisateurs() {
    return this.utilisateurs;
  }

  deleteUser(user) {
    const index: number = this.utilisateurs.indexOf(user);
    this.utilisateurs.splice(index, 1);
    this.presentToast('Utilisateur supprimé');

  }

  getUserByEmail(email) {
    const user = this.utilisateurs.filter(utilisateur => utilisateur.email === email)[0];
    return user;
  }
}
