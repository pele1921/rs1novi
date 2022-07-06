import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MojConfig } from '../moj-config';

declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css'],
})
export class StudentMaticnaknjigaComponent implements OnInit {
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}
  maticnaKnjiga:any;
  semestar:any = null;
  id:number;
  sub:any;
  akGodine:any;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params:any) => {
      this.id = +params["id"];
      this.getMaticnaKnjiga();
    })
    this.loadAkGodine();
  }
  getMaticnaKnjiga() {
    this.httpClient.get(MojConfig.adresa_servera + "/MaticnaKnjiga/getMaticnaKnjiga/?id=" + this.id, MojConfig.http_opcije())
    .subscribe((res:any) => this.maticnaKnjiga = res);
  }

  loadAkGodine(){
    this.httpClient.get(MojConfig.adresa_servera + "/MaticnaKnjiga/getAkademskeGodine", MojConfig.http_opcije())
    .subscribe((res:any) => this.akGodine = res);
  }

  ovjeriLjetni() {}

  upisLjetni() {}

  ovjeriZimski(id:any) {
    this.httpClient.post(MojConfig.adresa_servera + "/MaticnaKnjiga/ovjeriZimski/" + id, null, MojConfig.http_opcije())
    .subscribe((res:any) => {
      porukaSuccess("Uspjesna ovjera zimskog semestra!");
    })
  }
  upisiZimski(){
    this.semestar={
      id: this.id,
      datum: new Date(),
      godinaStudija: 1,
      akademskaGodinaId: 1,
      cijenaSkolarine: 0,
      obnova: false
    }
  }

  spasiPromjene(){
    this.httpClient.post(MojConfig.adresa_servera + "/MaticnaKnjiga/upisiZimski/" + this.id, this.semestar, MojConfig.http_opcije())
    .subscribe((res:any) => {
      porukaSuccess("Uspjesno dodano!");
    })
  }
}
