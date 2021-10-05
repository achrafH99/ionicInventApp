import { Component, Input, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-utilisateur',
  templateUrl: './modal-utilisateur.component.html',
  styleUrls: ['./modal-utilisateur.component.scss'],
})
export class ModalUtilisateurComponent implements OnInit {
  //   userForm = new FormGroup({
  //     name: new FormControl(),
  //     email: new FormControl()
  // });
  name: string;
  email: string;
  userForm = null;
  oneUtilisateur: any = { nom: 'ach' };
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  async closeModal() {
    if (this.name && this.email) {
      await this.modalController.dismiss({ name: this.name, email: this.email });
    }
    else {
      await this.modalController.dismiss();
    }
  }

  onSubmit() {
    this.closeModal();
  }
}
