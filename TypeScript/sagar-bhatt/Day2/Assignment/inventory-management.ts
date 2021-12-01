// ? There is a retail shop which need to manage the inventory, whenever some purchase is being made product quantity should be reduced, if quantity is less than 5 reorder request should be raised.Design an interface and classes for the same.

// * INVENTORY INTERFACE
interface IStock {
  productCode: number;
  productName: string;
  productPrice?: number;
  quantity: number;
}

// * SALES/PURCHASE INTERFACE
interface IBill extends IStock {
  billNo: number;
  totalPrice: number;
}

// * STOCK CLASS
class Stock implements IStock {
  productCode!: number;
  productName!: string;
  productPrice!: number;
  quantity!: number;

  setStock(
    productCode: number,
    productName: string,
    productPrice: number,
    quantity: number
  ) {
    this.productCode = productCode;
    this.productName = productName;
    this.productPrice = productPrice;
    this.quantity = quantity;
  }

  getStock() {
    return {
      productCode: this.productCode,
      productName: this.productName,
      productPrice: this.productPrice,
      quantity: this.quantity,
    };
  }
}

// * PURCHASE CLASS
class Purchase implements IBill {
  billNo!: number;
  productCode!: number;
  productName!: string;
  quantity!: number;
  totalPrice!: number;

  setPurchase(
    billNo: number,
    productCode: number,
    productName: string,
    quantity: number,
    totalPrice: number
  ) {
    this.billNo = billNo;
    this.productCode = productCode;
    this.productName = productName;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }

  getPurchase() {
    return {
      billNo: this.billNo,
      productCode: this.productCode,
      productName: this.productName,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
    };
  }
}

// * SALES CLASS
class Sale implements IBill {
  billNo!: number;
  productCode!: number;
  productName!: string;
  quantity!: number;
  totalPrice!: number;

  setSale(
    billNo: number,
    productCode: number,
    productName: string,
    quantity: number,
    totalPrice: number
  ) {
    this.billNo = billNo;
    this.productCode = productCode;
    this.productName = productName;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }

  getSale() {
    return {
      billNo: this.billNo,
      productCode: this.productCode,
      productName: this.productName,
      quantity: this.quantity,
      totalPrice: this.totalPrice,
    };
  }
}

// * STOCK OBJECT
const objStock1 = new Stock();
objStock1.setStock(1, "Keyboard", 2000, 100);
const objStock2 = new Stock();
objStock2.setStock(2, "Mouse", 1000, 100);

//  * STOCK ARRAY
const arrStock: IStock[] = [objStock1.getStock(), objStock2.getStock()];
console.log(`Stock On Hand:`, arrStock);

//  * SALES OBJECT
const objSale1 = new Sale();
objSale1.setSale(1, 1, "keyboard", 50, 1000);
const objSale2 = new Sale();
objSale2.setSale(2, 2, "Mouse", 50, 500);
const objSale3 = new Sale();
objSale3.setSale(3, 1, "Keyboard", 46, 300);

//  * SALES ARRAY
const arrSales: IBill[] = [objSale1.getSale(), objSale2.getSale()];
console.log(`Sales History:`, arrSales);

// * UPDATE STOCK
function updateStock(arrStock: IStock[], salesObject: IBill): void {
  const stock = arrStock.find((elem) => {
    if (elem.productCode === salesObject.productCode) {
      elem.quantity = elem.quantity - salesObject.quantity;
      // console.log(elem.quantity, elem);
    }
  });
  console.log(`Updated Stock:`, arrStock);
}
updateStock(arrStock, objSale1.getSale());
updateStock(arrStock, objSale2.getSale());
updateStock(arrStock, objSale3.getSale());
// console.log(`Updated Stock:`, arrStock);

// * PURCHASE OBJECT
const objPurchase1 = new Purchase();
objPurchase1.setPurchase(1, 1, "keyboard", 100, 2000);
const objPurchase2 = new Purchase();
objPurchase2.setPurchase(2, 2, "Mouse", 100, 1000);

// * PURCHASE ARRAY
const arrPurchase: IBill[] = [
  objPurchase1.getPurchase(),
  objPurchase2.getPurchase(),
];
console.log(`Purchase History:`, arrPurchase);

// * PURCHASE PRODUCT
function purchaseProduct(arrStock: IStock[]) {
  for (let stock of arrStock) {
    if (stock.quantity < 5) {
      console.log(`${stock.productName} quantity: ${stock.quantity}`);
    }
  }
}
purchaseProduct(arrStock);
