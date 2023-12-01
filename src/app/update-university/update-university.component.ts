import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { University } from '../model/university.model';

@Component({
  selector: 'app-update-university',
  templateUrl: './update-university.component.html',
  styleUrls: ['./update-university.component.css']
})
export class UpdateUniversityComponent  implements OnInit {

@Input()
university! : University;

@Input()
ajout!:boolean;

@Output() 
universityUpdated = new EventEmitter<University>();

constructor() { }
ngOnInit(): void {
  console.log("ngOnInit du composant UpdateCategorie ",this.university);
  }

  saveUniversity(){
    this.universityUpdated.emit(this.university);
    }
  
}
