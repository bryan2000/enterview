import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

import { QuotserviceService, } from '../quotservice.service'
import { styleCode, stockItem, quotItem, quotItemSummary, addressInfo, quotHeader } from '../datainterface';
import { FormControl, Validators } from '@angular/forms'
import { Observable } from 'rxjs';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-quotitem',
  templateUrl: './quotitem.component.html',
  styleUrls: ['./quotitem.component.css']
})










export class QuotitemComponent implements OnInit {
  stockItemControl = new FormControl();
  styleCtrl = new FormControl();
  addressCtrl = new FormControl('', [Validators.required]);

  filteredStockItems: Observable<stockItem[]>;
  filterStyles: Observable<styleCode[]>;
  filteredQuoItems: Observable<quotItem[]>;




  stockitemtxt: string;
  errtxt: string;
  quotid: string = 'quo1001';
  selectedstyle: styleCode;
  //value only when selected before input, after done it will be clean.
  selectedStockItem: stockItem;



  //Workkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
  styleselected($event: any, value: styleCode) {
    // alert($event.option.value);
    if ($event.source.selected) {
      this.selectedstyle = value;
      this.clearStockItem('');
    }
  }
  stockItemSelected($event: any, value: stockItem) {
    if ($event.source.selected) {
      this.InputStockItem(value);

      this.selectedStockItem = value;

      console.log('stock item selected: ' + value.code);
    }
  }
  InputStockItem(value: stockItem) {
    let sitem: quotItem =//{quotid:this.quotid,quotitemid: 'itm1004',code:'RBCB3327',stylecode:'LO',descr:'Reversible Blind Corner Base 33"--36" ',rqside:true,side:'LEFT',rqkd:true,kd:false,stock:'InStock',qty:1,price: 69.00,cost:39.00};
    {
      quotid: this.quotid,
      quotitemid: this.quotid + '-' + (this.quotSVC.quotitemid++),
      stockitemid: value.id,// 'itm1004',
      code: value.code,//'RBCB3327',
      stylecode: value.stylecode,// 'LO',
      itemtype: value.itemtype, // cab,acc,others
      descr: value.descr, // 'Reversible Blind Corner Base 33"--36" ',
      rqside: value.rqside,// true,
      lside: true,
      side: 'LEFT',
      rqkd: value.rqkd,// true,
      kd: this.fullkd,
      stock: value.stock,// 'InStock',
      qty: 1,
      price: value.price,// 69.00,
      price2: value.price2,
      prices3: value.price3,
      discount: 0,
      tax: 0,
      cost: value.cost, // 39.00
    };
    this.quotSVC.addQuoteItem(sitem);
    this.setErrTxt(null);
    this.getQuoteItems();

    setTimeout(() => { this.itemEnterScroll(); }, 500)

    this.subtotal();
  }
  getQuoteItems() {
    this.filteredQuoItems = this.quotSVC.getQuoteItems();
  }

  CheckBoxClick() {

    console.log('Check box click');
  }

  RemoveQuoteItems(outitem: quotItem) {
    this.quotSVC.removeQuoteItem(outitem);
    this.getQuoteItems();
    this.snackBar.open(this.fullQuotItemName(outitem) + ' Removed!', 'Close',
      { duration: 4000, }
    );
    this.subtotal();
  }
  stockItemSearchClick() {
    if (this.selectedStockItem) {
      this.selectedStockItem = null;
      return;
    }

    console.log('item Search Click:  ' + this.stockItemControl.value);
    const searchvalue = this.stockItemControl.value;

    this.getStockItem(searchvalue).subscribe(
      (rtnsearch) => {
        let item: stockItem = rtnsearch;

        if (item) {
          this.setErrTxt(null);
          this.InputStockItem(item[0]);
          this.clearStockItem('');
        }
        else {
          this.setErrTxt("Item Was Not Found " + searchvalue);
        }
      });
  }
  setErrTxt(txt: string) {
    this.errtxt = txt;
  }
  //
  styleSearchClick() {
    if (this.selectedstyle) {

      if (this.selectedstyle.name != this.styleCtrl.value) {
        this.selectedstyle = null;
      }
    }
  }
  styleClear() {
    this.selectedstyle = null;
    this.styleCtrl.setValue('');
  }
  clearStockItem(txt: string) {
    this.stockItemControl.setValue(txt);
    this.setErrTxt('');
  }

  //clear text after input correctly
  displayNull() {
    return null;
  }


  //in use
  getStyleImg(searchtxt: string): any {

    return this.quotSVC.getStyleImg(searchtxt);
  }
  getStockItem(searchtxt: string): Observable<stockItem> {
    const selectedstylevalue = this.selectedstyle ? this.selectedstyle.name.toLowerCase() : '';
    const searchValue = searchtxt.toLowerCase();
    return this.quotSVC.findStockItem(selectedstylevalue, searchValue);

  }


  subtotal() {
    this.quotsummary.subtotal = 0;
    this.quotsummary.totalpiece = 0;
    this.quotsummary.cabinet = 0;
    this.quotsummary.accessary = 0;
    this.quotsummary.others = 0;
    this.quotsummary.discount = 0;

    this.quotsummary.total = 0;
    this.quotsummary.tax = 0;




    this.filteredQuoItems.subscribe(allitem => {
      allitem.forEach(element => {
        if (!element.kd) {
          this.quotsummary.subtotal += element.price * element.qty;
        }
        else {
          this.quotsummary.subtotal += element.price2 * element.qty;
        }

        switch (element.itemtype) {
          case 'cab': { this.quotsummary.cabinet += element.qty; break; }
          case 'acc': { this.quotsummary.accessary += element.qty; break; }
          case 'others': { this.quotsummary.others += element.qty; break; }
          default: { break; }
        }

        this.quotsummary.totalpiece += element.qty;
        this.quotsummary.discount += element.discount;
        this.quotsummary.tax += element.tax;


      });

      var amt = this.quotsummary.subtotal - this.quotsummary.discount;

      if (this.freedeliveryamt > 0 && amt > this.freedeliveryamt) {
        this.quotsummary.total = amt + this.quotsummary.tax;
        this.quotsummary.deliveryfee = 0;
      } else {
        this.quotsummary.deliveryfee = this.deliveryfee;
        this.quotsummary.total = amt + this.quotsummary.tax + this.quotsummary.deliveryfee;
      }
    });


  }

  kdChanged() {

    setTimeout(() => { this.subtotal(), 500 });
  }

  kdAssambled(kda: boolean) {
    this.allkd = kda;
    console.log(this.allkd);

    this.filteredQuoItems.subscribe(allitem => {
      allitem.forEach(element => {
        element.kd = this.allkd;

      });

      this.kdChanged();
    });
  }



  /*/////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////*/



  ngOnInit() {
    this.getQuoteItems();
    this.filterStyles = this.quotSVC.getStyles();
    this.stockItemControl.valueChanges.subscribe(val => {
      const filterValue = val.toLowerCase();
      const selectedstylecode = this.selectedstyle ? this.selectedstyle.name.toLowerCase() : '';
      this.filteredStockItems = this.quotSVC.getStockItemsFilter(filterValue, selectedstylecode);
    });

    this.shippingaddresses = this.quotSVC.getAddresses();
    this.loadQuot('9950');

    this.subtotal();

    //this.loadAddress(null);
    this.Addresschanged('st1000');
    this.LoadVendorAddress('st1000');
  
  

  }

  public loadQuot(quotid: string): void {
    this.quotheader = {
      quotid: 'qu1111',
      vendorname:'Home Improvements',
      vendornum:2233,
      vendoraddressid:'st1000',
      customernum:1002,
      customername:'New Heights Kitchen',
      shippingaddressid:'st1003',
      po: '9950',
      reference: '1997',
      etadate: new Date('12/10/2018'),
      quotdate: new Date('11/17/2018'),
      displayprice: true,
      fullkd: true,
      crtstage:'pending',
      printed:false,
      termsnet:25,
      discount:5,
    };



  }

  slidetoggle(st: quotItem) {
    st.side = (st.side.toLowerCase() === 'left' ? 'right' : 'left');
  }
  fullQuotItemName(inputitem: quotItem): string {
    return inputitem.stylecode + '-' + inputitem.code;
  }

  rtnResult: string;
  openDialog(inputitem: quotItem): void {
    if (!inputitem) { return; }
    const dialogRef = this.dialog.open(Quotitemdialog, {
      width: '50%', //'250px',
      data: { id: 'quo2it123', name: this.fullQuotItemName(inputitem), descr: 'After You Click OK,  this item will be delete. Are you sure?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.rtnResult = result; // remove by quote item id
      console.log(result);
      if (result === true) {
        this.RemoveQuoteItems(inputitem);
      }
    });
  }

  toPrint(): void {

    const dialogRef = this.dialog.open(Quotitemprint, {
      width: '80%', //'250px',
      data: {
        id: 'quo2it123',
        name: 'ABC',
        descr: 'After You Click OK,  this page will be printed. Are you sure?',
        displayprice: this.quotheader.displayprice,
        entries: this.filteredQuoItems,
        summary: this.quotsummary,
        quotheader: this.quotheader,
        vendoraddress: this.vendoraddress,
        currenshippingaddrs:this.currenshippingaddrs,
      },
    });

    dialogRef.afterClosed().subscribe(result=>{
      if(result===true){
        this.quotheader.printed=true;
      }      
    });

  }






  public itemEnterScroll() {

    let topdetail = document.getElementById('itemdetail');
    if (topdetail !== null) {
      topdetail.scrollTo(0, topdetail.scrollHeight + 100);

      topdetail = null;
    }

    let itementer = document.getElementById('divitementer');
    if (itementer !== null) {
      itementer.scrollIntoView();

    }
  }


  EditMode(ipt: boolean) {
    this.isAddresedit = ipt;
    setTimeout(() => {
      if (ipt) {
        this.inptclreditElement.nativeElement.focus();
        this.inptclreditElement.nativeElement.select();
      } else {
        this.loadAddress(this.currenshippingaddrs);

      }
    }, 500);

  }


  //////////////////////// Functions/////////////////////////////

  constructor(private quotSVC: QuotserviceService, public dialog: MatDialog, public snackBar: MatSnackBar) { ////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
  }

  fullkd: boolean = false;

  displaydescr: boolean = false;
  totalPrice: number = 0;
  allkd: boolean = false;

  isAddresedit: boolean = false;




  ///////////shipping address //// START ////////////////
  companyname:string;
  addrname: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  tel: string;
  altphone: string;
  fax: string;
  contact: string;
  email: string;
  addressmemo: string;
  freedeliveryamt: number = 0;
  deliveryfee: number = 0;
  vendoraddress:addressInfo;
  currenshippingaddrs: addressInfo;
  shippingaddresses: Observable<addressInfo[]>;
  //newshippingaddrs:addressInfo;
  quotheader: quotHeader;



  ///////// shipping address ////  END  ///////////////////

  public loadAddress(addrs: addressInfo) {

    if (addrs) {
      this.companyname=addrs.companyname
      this.addrname = addrs.name
      this.address1 = addrs.address1;
      this.address2 = addrs.address2;
      this.city = addrs.city;
      this.state = addrs.state;
      this.zipcode = addrs.zipcode;
      this.tel = addrs.tel;
      this.altphone = addrs.altphone;
      this.fax = addrs.fax;
      this.contact = addrs.contact;
      this.email = addrs.email;
      this.addressmemo = addrs.addressmemo;
      this.freedeliveryamt = addrs.freedeliveryamt;
      this.deliveryfee = addrs.deliveryfee;

    } else {
      this.currenshippingaddrs.companyname=this.companyname;
      this.currenshippingaddrs.name = this.addrname;
      this.currenshippingaddrs.address1 = this.address1;
      this.currenshippingaddrs.address2 = this.address2;
      this.currenshippingaddrs.city = this.city;
      this.currenshippingaddrs.state = this.state;
      this.currenshippingaddrs.zipcode = this.zipcode;
      this.currenshippingaddrs.tel = this.tel;
      this.currenshippingaddrs.altphone = this.altphone;
      this.currenshippingaddrs.fax = this.fax;
      this.currenshippingaddrs.contact = this.contact;
      this.currenshippingaddrs.email = this.email;
      this.currenshippingaddrs.addressmemo = this.addressmemo;
      this.currenshippingaddrs.freedeliveryamt = this.freedeliveryamt;
      this.currenshippingaddrs.deliveryfee = this.deliveryfee;
    }
    //////////////// Reflesh Total////////////////////
    this.quotsummary.deliveryfee = this.deliveryfee;
    this.subtotal();
    //////////////// Reflesh Total /////////////////////

  }


  Addresschanged(addrid: string) {
    if (addrid) {
      this.quotSVC.findAddress(addrid).subscribe(
        shipadd => {
          if (shipadd) {
            this.updateCurrentAddress(shipadd);
            this.loadAddress(shipadd);
          }
        }
      );
    }
  }

  LoadVendorAddress(addrid:string){
    if(addrid){
      this.quotSVC.findAddress(addrid).subscribe(
        vndadd=>{
          if(vndadd){
            this.vendoraddress=vndadd;
          }
        }
      )
    }
  }


  public SaveAddress() {
    this.loadAddress(null);
    this.EditMode(false);
    this.snackBar.open(this.currenshippingaddrs.name + ' Updated!', 'Close',
      { duration: 4000, verticalPosition: 'top', panelClass: ['snackbaraddrs-edit'], }
    );
  }

  public NewAddress() {
    const newshippingaddrs: addressInfo = {
      addressid: '',
      name: this.addrname,
      companyname:this.quotheader.customername,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      tel: this.tel,
      altphone: this.altphone,
      fax: this.fax,
      contact: this.contact,
      email: this.email,
      addressmemo: this.addressmemo,
      freedeliveryamt: this.freedeliveryamt,
      deliveryfee: this.deliveryfee,
    }
    this.updateCurrentAddress(this.quotSVC.addAddress(newshippingaddrs));
    this.EditMode(false);
    this.snackBar.open(this.currenshippingaddrs.name + ' Added!', 'Close',
      { duration: 4000, verticalPosition: 'top', panelClass: ['snackbaraddrs-new'], }
    );
  }


  updateCurrentAddress(addr:addressInfo){
    this.currenshippingaddrs = addr;
    
    this.quotheader.shippingaddressid=this.currenshippingaddrs.addressid;    
  }

  //////////////////////// Functions/////////////////////////////


  quotsummary: quotItemSummary = {
    cabinet: 0, //Piece
    accessary: 0, // piece
    others: 0,  // piece
    totalpiece: 0,//piece

    discount: 0,
    subtotal: 0,
    tax: 0,
    deliveryfee: 0,
    total: 0,
    styles: 1
  }
    ;

  @ViewChild('inpt') inptElement: ElementRef;
  @ViewChild('inptedit') inptclreditElement: ElementRef;


} // Component Class











export interface DialogData {
  id: string;
  name: string;
  descr: string;

}
@Component({
  selector: 'app-quotitemdialog',
  templateUrl: './quotitemdialog.html',
})

export class Quotitemdialog {
  constructor(public dialogRef: MatDialogRef<Quotitemdialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}


export interface PrintData {
  id: string;
  name: string;
  descr: string;
  displayprice: boolean;
  entries: Observable<quotItem[]>;
  summary: quotItemSummary;
  quotheader:quotHeader;
  vendoraddress:addressInfo;
  shippingaddress:addressInfo;


}
@Component({
  selector: 'app-quotitemprint',
  templateUrl: './quotitemprint.html',
  styleUrls: ['./quotitemprint.css'],
})

export class Quotitemprint {

  printing: boolean = true;
  @ViewChild('iframeprint') iframeprt: ElementRef;

  constructor(public dialogRef: MatDialogRef<Quotitemprint>,
    @Inject(MAT_DIALOG_DATA) public data: PrintData
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
    
  }
  toPrint() {
    this.printing = false;
    this.printFrame();

    setTimeout(() => {
      //   window.print();
      // this.printing = true;
      this.dialogRef.close(true);
    }, 500);

  }






















  printFrame() {
    var contents = document.getElementById("print-section").innerHTML;
    const win: Window = this.iframeprt.nativeElement.contentWindow;
    this.iframeprt.nativeElement.name = "frame3";

    var frameDoc = win.document; //frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.documentElement ? frame1.contentDocument.documentElement : frame1.contentDocument;

    frameDoc.open();
    frameDoc.write('<html><head> <style>.invoice-box{max-width:800px;margin:auto;padding:30px;border:1px solid #eee;box-shadow:0 0 10px rgba(0,0,0,.15);font-size:16px;line-height:24px;color:#555}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{padding:5px;vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:right}.invoice-box table tr.top table td{padding-bottom:20px}.invoice-box table tr.top table td.title{font-size:45px;line-height:45px;color:#333}.invoice-box table tr.information table td{padding-bottom:40px}.invoice-box table tr.heading td{background:#eee;border-bottom:1px solid #ddd;font-weight:700}.invoice-box table tr.details td{padding-bottom:20px}.invoice-box table tr.item td{border-bottom:1px solid #eee}.invoice-box table tr.item.last td{border-bottom:none}.invoice-box table tr.total td:nth-child(2){border-top:2px solid #eee;font-weight:700} </style>');
    //        frameDoc.write('  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"> ');
    frameDoc.write(' <link href="assets/dialog.css" rel="stylesheet"> ');
    frameDoc.write('</head><body>');
    frameDoc.write(contents);
    frameDoc.write('</body></html>');
    frameDoc.close();
    console.log(frameDoc);
    setTimeout(function () {
      win.focus();
      win.print();

      frameDoc.open();
      frameDoc.clear();
      frameDoc.close();
    }, 500);
  }






}//End





