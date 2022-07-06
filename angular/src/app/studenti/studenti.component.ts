import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MojConfig } from '../moj-config';
import { Router } from '@angular/router';
declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css'],
})
export class StudentiComponent implements OnInit {
  title: string = 'angularFIT2';
  ime: string = '';
  studentPodaci:any [];
  odabraniStudent: any = null;

  constructor(private httpKlijent: HttpClient, private router: Router) {}

  testirajWebApi(): void {
    this.httpKlijent
      .get(
        MojConfig.adresa_servera + '/Student/GetAll',
        MojConfig.http_opcije()
      )
      .subscribe((x: any) => {
        this.studentPodaci = x;
      });
  }

  ngOnInit(): void {
    this.testirajWebApi();
  }

  filterStudent(){
    return this.studentPodaci.filter((student:any) => `${student.ime} ${student.prezime}`.toLowerCase().includes(this.ime.toLowerCase()));
  }

  odaberiStudenta(student:any){
    this.odabraniStudent = student;
    this.odabraniStudent.prikazi = true;
  }

  noviStudent(){
    this.odabraniStudent = {
      prikazi: true,
      id: 0,
      ime: "",
      prezime: "",
      broj_indeksa: "",
      datum_rodjenja: new Date(),
      opstina_rodjenja_id: 0
    }
  }

  obrisiStudenta(student:any){
    this.httpKlijent.post(MojConfig.adresa_servera + "/Student/Delete/" + student.id, null, MojConfig.http_opcije())
    .subscribe((res:any) => {
      let index = this.studentPodaci.indexOf(student);
      if (index > -1){
        this.studentPodaci.splice(student, 1);
      }
      porukaSuccess(`Student ${student.ime} ${student.prezime} je uspješno obrisan!`);
    })
  }

  dodajStudenta(student:any){
    this.studentPodaci.splice(0, 1, student);
  }

  maticnaKnjiga(student:any){
    this.router.navigate(["student-maticnaknjiga", student.id])
  }
}
