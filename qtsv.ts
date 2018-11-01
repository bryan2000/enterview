import { Injectable,Inject } from '@angular/core';
import { Observable,of} from 'rxjs';
import {map,startWith} from 'rxjs/operators';

import {styleCode,stockItem,quotItem,quotItemSummary} from './datainterface';


@Injectable({
 providedIn: 'root'
})
export class QuotserviceService {

quotitemid: number=4;
 
 
address:addressInfo[]=[
  {
    storeid:'st1001',
    name:'Pickup',
    address:'241 59th ST Brooklyn NY 11220',
    phone:'718-888-8888',
    contact:'Heor Markulande',
    memo:'',
  },
  
  {
    storeid:'st1001',
    name:'store',
    address:'33-12 32 Ave flushing NY 12344',
    phone:'233-222-9991',
    contact:'Mike',
    memo:'',
  },
  {
    storeid:'st1002',
    name:'store2',
    address:'23-22 College Point Ave Flushing NY 10232',
    phone:'219-388-2992',
    contact:'Stone',
    memo:'',
  },
  {
    storeid:'st1003',
    name:'warehouse1',
    address:'50-01 College Porint Ave Flushing NY 10022',
    phone:'333-222-1234',
    contact:'Hanna',
    memo:'',
  },
  {
    storeid:'st1004',
    name:'warehourse2',
    address:'130 20 Ave Flushing NY 10000',
    phone:'917-111-4444',
    contact:'Jess',
    memo:'',
  },
];
 
 

 stockitems: stockItem[]=[
   {id: 'itm1001',code:'B18',stylecode:'LO',descr:'Base 18" ',itemtype:'cab',price: 56.00,price2:44,price3:0,cost:33.00,rqside:true,rqkd:true,stock:'inStock'},
   {id: 'itm1002',code:'W1830',stylecode:'LO',descr:'Wall 18X30" ',itemtype:'cab',price: 48.00,price2:33.00,price3:0,cost:23.00,rqside:true,rqkd:true,stock:'inStock'},
   {id: 'itm1003',code:'SB36',stylecode:'LO',descr:'Sink Base 36" ',itemtype:'cab',price: 80.00,price2:66.00,price3:0,cost:42.00,rqside:false,rqkd:true,stock:'Low'},
   {id: 'itm1011',code:'BF3',stylecode:'LO',descr:'Base Filler 3" ',itemtype:'acc',price: 8.00,price2:7.00,price3:0,cost:6.00,rqside:false,rqkd:false,stock:'Out'},
   {id: 'itm1004',code:'RBCB3327',stylecode:'LO',descr:'Reversible Blind Corner Base "',itemtype:'cab',price: 69.00,price2:56.00,price3:0,cost:39.00,rqside:true,rqkd:true,stock:'inStock'},
   {id: 'itm2003',code:'SB36',stylecode:'MW',descr:'Sink Base 36" ',itemtype:'cab',price: 180.00,price2:165.00,price3:0,cost:142.00,rqside:false,rqkd:true,stock:'Low'},
   {id: 'itm2003',code:'B15',stylecode:'MW',descr:'Base 15" ',itemtype:'cab',price: 96.00,price2:82.00,price3:0,cost:62.00,rqside:true,rqkd:true,stock:'Low'},
   {id: 'itm3003',code:'B18',stylecode:'AC',descr:'Base 18" ',itemtype:'cab',price: 125.00,price2:105.00,price3:0,cost:82.00,rqside:true,rqkd:true,stock:'Low'},
   {id: 'itm3004',code:'W3330',stylecode:'AC',descr:'Wall 33x30" ',itemtype:'cab',price: 153.00,price2:133.00,price3:0,cost:121.00,rqside:false,rqkd:true,stock:'Low'},
 ]; 
 styles: styleCode[]=[
   {name:'LO',img:'assets/img/style/LO.png'},
   {name:'OC',img:'assets/img/style/OC.png'},
   {name:'MW',img:'assets/img/style/MW.png'},
   {name:'AC',img:'assets/img/style/AC.png'},
   {name:'SN',img:'assets/img/style/SN.png'},
   {name:'CSG',img:'assets/img/style/CSG.png'},
   {name:'CB',img:'assets/img/style/CB.png'},
   {name:'MA',img:'assets/img/style/MA.png'},
 ];
 quoteitems: quotItem[]=[
  {quotid:'qu1111',quotitemid: 'qu1111-1',stockitemid:'itm1001',code:'B18',stylecode:'LO',itemtype:'cab',descr:'Base 18" ',rqside:true,lside:true,side:'LEFT',rqkd:true,kd:true,stock:'inStock',qty:2,price: 56.00,price2:44.00,prices3:0,discount:0,cost:33.00,tax:2.00},
  {quotid:'qu1111',quotitemid: 'qu1111-2',stockitemid:'itm1002',code:'W1830',stylecode:'LO',itemtype:'cab',descr:'Wall 18X30" ',rqside:true,lside:true,side:'LEFT',rqkd:true,kd:true,stock:'inStock',qty:2,price: 48.00,price2:33.00,prices3:0,discount:0,cost:23.00,tax:1.00},
  {quotid:'qu1111',quotitemid: 'qu1111-3',stockitemid:'itm1003',code:'SB36',stylecode:'LO',itemtype:'cab',descr:'Sink Base 36" ',rqside:true,lside:true,side:'LEFT',rqkd:true,kd:true,stock:'Low',qty:2,price: 80.00,price2:66.00,prices3:0,discount:0,cost:42.00,tax:2.30},
 ];
getStockItems():Observable<stockItem[]>{
 return of(this.stockitems);
}

getStockItemsFilter(filterValue:string,selectedstylecode:string):Observable<stockItem[]>{
 if(selectedstylecode){
   return of( this.stockitems
   .filter(stckit=>
     stckit.code.toLowerCase().indexOf(filterValue)===0
     && stckit.stylecode.toLowerCase().indexOf(selectedstylecode)===0));
   }
   else if(filterValue.length>0) {
 return  of(this.stockitems
   .filter(stckit=>  
     stckit.code.toLowerCase().startsWith(filterValue)
     || (stckit.stylecode+'-'+stckit.code).toLowerCase().startsWith(filterValue)
     || stckit.stylecode.toLowerCase().startsWith(filterValue)
   ));
  
   }

}



getStyles(): Observable<styleCode[]>{
 return of(this.styles);
}
findStyle(searchtxt:string):Observable<styleCode>{
 return of(this.styles.find(stl=>stl.name===searchtxt));
}
getStyleImg(stylecode:string):string{
let rtn=  this.styles.find(stl=>stl.name===stylecode);
return rtn? rtn.img:null;
}

getStylesFilter(filterValue: string): Observable<styleCode[]>{
 return of(this.styles.filter(style=>style.name.toLocaleLowerCase().indexOf(filterValue)===0));
}


getQuoteItems():Observable<quotItem[]>{
 return of(this.quoteitems);
}
addQuoteItem(sitem:quotItem):void{
 this.quoteitems.push(sitem);
}

removeQuoteItem(sitem: quotItem):void{ 
 this.quoteitems.splice(this.quoteitems.indexOf(sitem),1);
}


findStockItem(selectedstylevalue: string,searchValue:string):Observable<stockItem>{

 return of(this.stockitems.find(
   sit=>sit.code.toLowerCase()===searchValue && (sit.stylecode.toLowerCase()===selectedstylevalue.toLowerCase())
   ||(sit.stylecode+'-'+sit.code).toLowerCase().indexOf(searchValue.toLowerCase())===0
   ));
}

 getAddress():Observable<addressInfo[]>{
  return of(this.address);
}


 constructor() { }
}



