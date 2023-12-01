import { Injectable } from '@angular/core';
import { Enseignant } from '../model/enseignant.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { University } from '../model/university.model';
import { AuthService } from './auth.service';
import { UniversityWrapper } from '../model/universityWrapped.model';
import { Image } from '../model/image.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  apiURL: string = 'http://localhost:8083/teachers/api';
  apiUniv: string = 'http://localhost:8083/teachers/api/univ';

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  listeEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(this.apiURL+"/all");

}


uploadImage(file: File, filename: string): Observable<Image>{
  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${this.apiURL + '/image/upload'}`;
  return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
  const url = `${this.apiURL + '/image/get/info'}/${id}`;
  return this.http.get<Image>(url);
  }


  
  ajouterenseignant(ens: Enseignant): Observable<Enseignant> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.post<Enseignant>(this.apiURL+"/addEns", ens, {headers:httpHeaders});
    }

  supprimerEnseignant(id : number) {
    const url = `${this.apiURL}/delEns/${id}`;
     let jwt = this.authService.getToken();
     jwt = "Bearer "+jwt;
     let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
       return this.http.delete(url,  {headers:httpHeaders});
     }

  consulterEnseignant(id: number): Observable<Enseignant> {
    const url = `${this.apiURL}/getbyid/${id}`;
    console.log(url);
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.get<Enseignant>(url,{headers:httpHeaders});
    }

  // updateEnseignant(e: Enseignant): Observable<Enseignant> {
  //   const url = `${this.apiURL}/${e.idEnseignant}`;
  //   return this.http.put<Enseignant>(url, e, httpOptions);
  // }
  

  updateEnseignant(ens :Enseignant) : Observable<Enseignant>    {
    console.log("ennnnnnnnnnnns "+ens);
     console.log(ens.university);
       let jwt = this.authService.getToken();
       jwt = "Bearer "+jwt;
       let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
         return this.http.put<Enseignant>(this.apiURL+"/updateEns", ens, {headers:httpHeaders});
       }
  
  
  listeUniversities(): Observable<UniversityWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return  this.http.get<UniversityWrapper>(this.apiUniv,{headers:httpHeaders});
    
        }     
  rechercherParUniversity(idUniv: number): Observable<Enseignant[]> {
    const url = `${this.apiURL}/ensUniv/${idUniv}`;
    return this.http.get<Enseignant[]>(url);
   } 

    
  rechercherParNomEns(nom: string):Observable< Enseignant[]> {
    const url = `${this.apiURL}/ensByName/${nom}`;
    return this.http.get<Enseignant[]>(url);
    }

      ajouterUniversity( univ: University):Observable<University>{
        return this.http.post<University>(this.apiUniv, univ, httpOptions);
        }


      
        
}


