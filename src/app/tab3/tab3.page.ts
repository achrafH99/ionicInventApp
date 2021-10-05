import { Component, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Utilisateur } from '../tab2/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(CalendarComponent, { static: false }) myCalendar: CalendarComponent;

  currentDate = new Date();
  allEvents = [];
  minDate = new Date().toISOString();
  currentMonth: string;
  showAddEvent = false;
  newEvent = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    utilisateur: ''
  };
  selected: number;
  constructor(private utilisateurService: UtilisateurService) { }

  getUtilisateurs() {
    return this.utilisateurService.getUtilisateurs();
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
    this.newEvent = {
      title: '',
      description: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      utilisateur: ''
    };
  }
  addEvent() {
    let user = this.utilisateurService.getUserByEmail(this.newEvent.utilisateur);


    this.allEvents.push({
      title: this.newEvent.title.concat(' Créateur nom: ', user.name, ' email: ', user.email),
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date(this.newEvent.endTime),
      description: this.newEvent.description,
      utilisateur: this.newEvent.utilisateur
    });
    this.showHideForm();

  }
}
