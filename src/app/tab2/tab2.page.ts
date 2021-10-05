import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalUtilisateurComponent } from '../modal-utilisateur/modal-utilisateur.component';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from './utilisateur';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  utilisateur = null;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
  onEdit = false;
  oneUtilisateur: any;
  data: any[] = [];
  constructor(public modalController: ModalController, private utilisateurService: UtilisateurService) {

  }

  ngOnInit() {
    this.utilisateurService.utilisateurs.forEach(value => {
      const obj = {
        form: new FormGroup({
          name: new FormControl(value.name),
          email: new FormControl(value.email),
        }),
        edit: false
      };
      this.data.push(obj);
    });
  }
  async presentModal(formGroup) {
    const modal = await this.modalController.create({
      component: ModalUtilisateurComponent,
      componentProps: { formGroup }
    });
    modal.onDidDismiss().then(dataReturned => {
      // trigger when about to close the modal
      if (dataReturned.data !== undefined) {
        if ((dataReturned.data.email && dataReturned.data.name)) {
          this.utilisateurService.addUtilisateurs(dataReturned.data.email, dataReturned.data.name);
          this.utilisateur.patchValue(dataReturned.data);
        }
      }
      else {
        this.data.splice(this.data.length - 1, 1);
      }

    });
    return await modal.present();
  }

  newUser() {
    const formGroup = new FormGroup({ email: new FormControl(), name: new FormControl() });
    const dt = {
      form: formGroup,
      edit: false
    };
    this.data.push(dt);
    this.presentModal(formGroup);
    this.utilisateur = formGroup;
  }

  toggleEdit(item) {
    item.edit = !item.edit;
  }

  edit(item) {
    this.utilisateurService.setUtilisateur(item.form.get('name').value, item.form.get('email').value);
    this.toggleEdit(item);
  }
  getUtilisateurs() {
    return this.utilisateurService.getUtilisateurs();
  }

  deleteUtilisateur(value) {
    this.utilisateurService.deleteUser(value);
    const index: number = this.data.indexOf(value);
    this.data.splice(index, 1);

  }



}
