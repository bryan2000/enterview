import { Injectable,Inject } from '@angular/core';
import { Observable,of} from 'rxjs';

import {styleCode,stockItem,quotItem,quotItemSummary,addressInfo} from './datainterface';


@Injectable({
providedIn: 'root'
})
export class QuotserviceService {

quotitemid: number=4;

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



 addresses:addressInfo[]=[
  {
    addressid:'st1000',
    name:'Pickup',
    address1:'241 59th ST   ',
    address2:'',
    city:'Brooklyn',
    state:'NY',
    zipcode:'11220',
    tel:'718-888-8888',
    altphone:'3333333',
    fax:'718-853-5014',
    contact:'Herry',
    email:'',
    addressmemo:'Heor Markulande',
    freedeliveryamt:0,
    deliveryfee:0,
  },
  
  {
    addressid:'st1001',
    name:'Pick Up 2',
    address1:'242 58th ST   ',
    address2:'',
    city:'Brooklyn',
    state:'NY',
    zipcode:'11220',
    tel:'718-888-8888',
    altphone:'5555555',
    fax:'718-853-5014',
    contact:'Herry',
    email:'',
    addressmemo:'Heor Markulande',
    freedeliveryamt:0,
    deliveryfee:0,
  },
  {
    addressid:'st1002',
    name:'Store',
    address1:'131-25 41th Avenue',
    address2:'',
    city:'Flushing',
    state:'NY',
    zipcode:'11355',
    tel:'718-886-8665/718-8888-9938',
    altphone:'66666666',
    fax:'718-886-8663',
    contact:'HU',
    email:'',
    addressmemo:'Heor Markulande',
    freedeliveryamt:500,
    deliveryfee:35.00
  },
  {
    addressid:'st1003',
    name:'warehouse1',
    address1:'41-20A College Point Blvd ',
    address2:'',
    city:'Flushing',
    state:'NY',
    zipcode:'11355',
    tel:'718-762-6888',
    altphone:'88888888',
    fax:'718-762-6889',
    contact:'Ashley',
    email:'newhigh615@gmail.com',
    addressmemo:'Net 30',
    freedeliveryamt:550.00,
    deliveryfee:31.00,
  },
  {
    addressid:'st1004',
    name:'warehourse2',
    address1:'41-20B College Point Blvd ',
    address2:'',
    city:'Flushing',
    state:'NY',
    zipcode:'11355',
    tel:'718-359-3800',
    altphone:'999999999',
    fax:'718-359-3801',
    contact:'Carrie',
    email:'',
    addressmemo:'Heor Markulande',
    freedeliveryamt: 600.00,
    deliveryfee:32.00,
  },
];
 





/////////////////////////////Data above//////////////////////////////


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


getAddresses():Observable<addressInfo[]>{
  return of(this.addresses);
}

findAddress(addrid:string):Observable<addressInfo>{
  return of(this.addresses.find(addr=>addr.addressid===addrid));
}


addAddress(addrs:addressInfo):addressInfo{
  addrs.addressid='st100'+(this.addresses.length+2);
  this.addresses.push(addrs);
  return addrs;
}

constructor() { }
}





