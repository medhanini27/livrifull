import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommanderService {

    public menu = [];
   
    private resultList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    public resultList$: Observable<any[]> = this.resultList.asObservable();

    updateResultList(idf,namef,imgf,prixf,nbr) {
        //this.resultList.next(updatedList);

        this.resultList.next([{ id: idf, name: namef, img: imgf, prix: prixf, prixT: nbr * prixf }]);
        //this.menu.push({ id: idf, name: namef, img: imgf, prix: prixf, prixT: 0 });
        console.log("weslet");

    }



  constructor() { }
}
