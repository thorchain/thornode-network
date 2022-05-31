const tableData = JSON.parse(
  `[{
  "id": 0,
  "key": 0,
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bluefx_/128.jpg",
  "city": "Lake Zelda",
  "email": "Lonny79@hotmail.com",
  "firstName": "Emelia",
  "lastName": "Gislason",
  "street": "Kulas Shoals",
  "zipCode": "52677",
  "date": "2016-09-27T08:18:56.302Z",
  "bs": "back-end optimize e-markets",
  "catchPhrase": "Devolved heuristic focus group",
  "companyName": "Kessler LLC",
  "words": "dignissimos et natus",
  "sentence": "Illum molestiae saepe eaque odit magnam veritatis eligendi est qui."
}, {
  "id": 1,
  "key": 1,
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jnmnrd/128.jpg",
  "city": "East Pierce",
  "email": "Lucinda_Gottlieb@hotmail.com",
  "firstName": "Cloyd",
  "lastName": "Armstrong",
  "street": "Lyla Heights",
  "zipCode": "64903",
  "date": "2016-10-08T06:30:16.347Z",
  "bs": "seamless mesh vortals",
  "catchPhrase": "Managed background migration",
  "companyName": "Doyle and Sons",
  "words": "voluptatum dignissimos possimus",
  "sentence": "Aut similique a qui."
}, {
  "id": 2,
  "key": 2,
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/damenleeturks/128.jpg",
  "city": "Sibylside",
  "email": "Ransom.Bergstrom@gmail.com",
  "firstName": "Rahul",
  "lastName": "Funk",
  "street": "Jolie Shoals",
  "zipCode": "46659",
  "date": "2017-05-16T02:02:32.105Z",
  "bs": "bleeding-edge enhance e-commerce",
  "catchPhrase": "Public-key intermediate hardware",
  "companyName": "Champlin and Sons",
  "words": "est est corrupti",
  "sentence": "Qui consequatur aut dignissimos error qui praesentium sit et unde."
}, {
  "id": 3,
  "key": 3,
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/keryilmaz/128.jpg",
  "city": "Anaisshire",
  "email": "Loyce.Upton@hotmail.com",
  "firstName": "Hilbert",
  "lastName": "Langosh",
  "street": "Sim Station",
  "zipCode": "22101",
  "date": "2017-01-28T01:56:10.609Z",
  "bs": "24/7 orchestrate communities",
  "catchPhrase": "Team-oriented fault-tolerant help-desk",
  "companyName": "Shields Inc",
  "words": "aut perspiciatis totam",
  "sentence": "Ut omnis et."
}, {
  "id": 4,
  "key": 4,
  "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/romanbulah/128.jpg",
  "city": "North Brad",
  "email": "Cassidy48@hotmail.com",
  "firstName": "Cloyd",
  "lastName": "Wilderman",
  "street": "Ruecker Turnpike",
  "zipCode": "93686",
  "date": "2016-12-30T12:07:39.922Z",
  "bs": "sticky e-enable metrics",
  "catchPhrase": "Re-engineered intangible methodology",
  "companyName": "Hoeger Inc",
  "words": "iusto ut voluptatem",
  "sentence": "Praesentium sit exercitationem aut."
}]`
);
const sortOption = {};
class fakeData {
  constructor(size) {
    this.size = size || 2000;
    this.datas = [];
    this.sortKey = null;
    this.sortDir = null;
  }
  dataModel(index) {
    return tableData[index];
  }
  getObjectAt(index) {
    if (index < 0 || index > this.size) {
      return undefined;
    }
    if (this.datas[index] === undefined) {
      this.datas[index] = this.dataModel(index);
    }
    return this.datas[index];
  }
  getAll() {
    if (this.datas.length < this.size) {
      for (let i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this.datas.slice();
  }

  getSize() {
    return this.size;
  }
  getSortAsc(sortKey) {
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'ASC';
    return this.datas.sort(this.sort);
  }
  getSortDesc(sortKey) {
    sortOption.sortKey = sortKey;
    sortOption.sortDir = 'DESC';
    return this.datas.sort(this.sort);
  }
  sort(optionA, optionB) {
    const valueA = optionA[sortOption.sortKey].toUpperCase();
    const valueB = optionB[sortOption.sortKey].toUpperCase();
    let sortVal = 0;
    if (valueA > valueB) {
      sortVal = 1;
    }
    if (valueA < valueB) {
      sortVal = -1;
    }
    if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
      return sortVal * -1;
    }
    return sortVal;
  }
}
export default fakeData;
