// var sqlite3 = require('sqlite3');
 
//  var db = new sqlite3.Database('example.db');
 
//  db.serialize(function() {
//   // Create a table
//   db.run("CREATE TABLE IF NOT EXISTS Foo (id INTEGER PRIMARY KEY, name TEXT)");
 
//   // Insert data into the table
//   db.run("INSERT INTO Foo (name) VALUES ('bar')");
 
//   // Query data from the table
//   db.each("SELECT id, name FROM Foo", function(err, row) {
//     console.log(row.id + ": " + row.name);
//   });
//  });
 
//  db.close();

// const fs = require('fs');

// let rawdata = fs.readFileSync('test.json');
// let student = JSON.parse(rawdata);
// console.log(student);


// getJSON = function(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.responseType = 'json';
//   xhr.onload = function() {
//       var status = xhr.status;
//       if (status === 200) {
//           callback(null, xhr.response);
//       } else {
//           callback(status, xhr.response);
//       }
//   };
//   xhr.send();
// };
// getJSON('http://localhost/json' ,(err, data)=> {
//   if (err !== null) {
//     alert('Something went wrong: ' + err);
//   } else {
//     alert('Your query count: ' + data.query.count);
//   }
// });

// body.innerHTML += "<tr><th scope='row'>"+index['id']+"</th><td>"+index['tag']+"</td><td>"+index['link']+"</td></tr>"

// let body = document.quereySelector('.body')

// let b = document.querySelector('.body')


let a = [{"tag":"ciao"},{"tag":"Test"},{"tag":"Test"}]
let b = []
a.forEach(index =>{
       b.push(index['tag'])
})
console.log(b)
let s = []
s = b.filter((item,pos, self) =>{
    return self.indexOf(item) == pos
})
console.log(b)
console.log(s)
