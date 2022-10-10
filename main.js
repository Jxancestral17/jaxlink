const http = require('http');
const fs = require('fs');
const sqlite3 = require('sqlite3');
const dbName = 'data.db'
const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const path = require('path');
const db = new sqlite3.Database(dbName);


db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS Tags (id INTEGER PRIMARY KEY, tag TEXT, link TEXT)")
})


app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));





//INDEX
app.get('/', (req, res)=> {
    db.all("SELECT id, tag, link FROM Tags", (err, rows)=>{
        let data = JSON.stringify(rows)
        fs.writeFileSync('data.json', data)
    })
    db.all("SELECT tag FROM Tags", (err, rows)=>{
      let arr = []
      rows.forEach(index =>{
            arr.push(index['tag'])
      })
      let dataNew = arr.filter((item,pos, self) =>{
          return self.indexOf(item) == pos
      })
      let raw = JSON.stringify({'tag': dataNew})
      fs.writeFileSync('tag.json', raw)
  })
    res.send(`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>JaxLink</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    </head>
    <body class="bg-secondary">
    <style>
      li{
        list-style: none;
      }
      .twitt{
          height: 5vh;
          margin-top: 5vh;
      }
      .badge{
        font-size: 1.2rem;
      }
  </style>
    <div class="container bg-dark w-100 d-flex justify-content-center">
      <h1 class="text-center text-danger display-3 fw-bold">J@XL!nk <span class="display-6">V. 1.0</span></h1>
      <a href="https://twitter.com/jank3xtr31?s=11&t=eZZVvbI-QyoK6SYldB482A" target="_blank" class="btn twitt btn-danger ms-5">Follow Me On Twitter</a>
    </div>
    <!-- Manu -->
    <div class="container my-5 bg-dark p-2 rounded-2 ps-5">
      <div class="row">
          <div class="col-12 col-md-4">
              <a href="#addTag" class="btn btn-danger" data-bs-toggle="collapse" aria-controls="addTag">Add New Tag Link</a>
              <form action="/addTag" method="post">
                  <div class="collapse" id="addTag">
                      <div class="container mt-3">
                        <input type="text" name="tag" class="form-control mt-1" placeholder="Name tag">
                        <input type="text" name="link" class="form-control mt-1" placeholder="Link">
                        <button type="submit" class="btn btn-danger mt-1 me-2">Add</button>
  
                      </div>
                  </div>
              </form>
          </div>
          <div class="col-12 col-md-4">
              <a href="#addFind" class="btn btn-danger" data-bs-toggle="collapse" aria-controls="addFind">Search</a>
              <div class="collapse" id="addFind">
                  <div class="container  mt-3">
                    <form action="/find" method="post">
                      <input type="text" name='tag' class="form-control mt-1" placeholder="Link">
                      <button class="btn btn-danger mt-1">Search</button>
                    </form>
                    </div>
              </div>
  
              
          </div>
          <div class="col-12 col-md-4">
            <form method='get' action='/'>
              <button class="btn btn-danger" data-bs-toggle="collapse" aria-controls="addFind">Reset</button>
            </from>
            </div>
        </div>
    </div>
      <!-- Table -->
      <div class="container d-flex">
          <aside class="me-5 bg-dark text-white  p-3 rounded-3">
            <h5 class='text-center'>Tag present: </h5>
            <ul class='list'>
            <script>
            let list = document.querySelector('.list')


            fetch("./tag.json")
                .then(response => {
                    return response.json();
                })
                .then(jsondata => {
                  console.log(jsondata)
                        jsondata['tag'].forEach(index => {
                            console.log(index)
                            list.innerHTML += "<li class='fw-bold badge text-bg-danger my-2 '>"+index+"</li>"
                        })
                })
                    
        </script>
            </ul>
          </aside>
          <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>
              <tbody class='body'>
              <script>
                  let body = document.querySelector('.body')
  
  
                  fetch("./data.json")
                      .then(response => {
                          return response.json();
                      })
                      .then(jsondata => 
                              jsondata.forEach(index => {
                                  body.innerHTML += "<tr><th scope='row'>"+index['id']+"</th><td>"+index['tag']+"</td><td><a href='"+index['link']+"' target='_blank'>"+index['link']+"</a></td></tr>"
                              })
                          );
              </script>
                
              </tbody>
            </table>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    </body>
              </html>`)
})

//ADD NEW LINK
app.post('/addTag',(req, res)=>{
    value = req.body
    db.serialize(()=>{
        db.run(`INSERT INTO Tags (tag, link) VALUES ('${value['tag']}','${value['link']}')`);
    })
    res.redirect('/')
})

app.post('/find',(req, res)=>{
  value = req.body
  db.all(`SELECT id, tag, link FROM Tags WHERE tag = '${value['tag']}'`, (err, rows)=>{
      let data = JSON.stringify(rows)
      fs.writeFileSync('data.json', data)
  })
  res.send(`<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>JaxLink</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    </head>
    <body class="bg-secondary">
    <style>
      li{
        list-style: none;
      }
      .twitt{
          height: 5vh;
          margin-top: 5vh;
      }
      .badge{
        font-size: 1.2rem;
      }
  </style>
    <div class="container bg-dark w-100 d-flex justify-content-center">
      <h1 class="text-center text-danger display-3 fw-bold">J@XL!nk <span class="display-6">V. 1.0</span></h1>
      <a href="https://twitter.com/jank3xtr31?s=11&t=eZZVvbI-QyoK6SYldB482A" target="_blank" class="btn twitt btn-danger ms-5">Follow Me On Twitter</a>
    </div>
    <!-- Manu -->
    <div class="container my-5 bg-dark p-2 rounded-2 ps-5">
      <div class="row">
          <div class="col-12 col-md-4">
              <a href="#addTag" class="btn btn-danger" data-bs-toggle="collapse" aria-controls="addTag">Add New Tag Link</a>
              <form action="/addTag" method="post">
                  <div class="collapse" id="addTag">
                      <div class="container mt-3">
                        <input type="text" name="tag" class="form-control mt-1" placeholder="Name tag">
                        <input type="text" name="link" class="form-control mt-1" placeholder="Link">
                        <button type="submit" class="btn btn-danger mt-1 me-2">Add</button>
  
                      </div>
                  </div>
              </form>
          </div>
          <div class="col-12 col-md-4">
              <a href="#addFind" class="btn btn-danger" data-bs-toggle="collapse" aria-controls="addFind">Search</a>
              <div class="collapse" id="addFind">
                  <div class="container  mt-3">
                    <form action="/find" method="post">
                      <input type="text" name='tag' class="form-control mt-1" placeholder="Link">
                      <button class="btn btn-danger mt-1">Search</button>
                    </form>
                    </div>
              </div>
  
              
          </div>
          <div class="col-12 col-md-4">
            <form method='get' action='/'>
              <button class="btn btn-danger" data-bs-toggle="collapse" aria-controls="addFind">Reset</button>
            </from>
            </div>
        </div>
    </div>
      <!-- Table -->
      <div class="container d-flex">
          <aside class="me-5 bg-dark text-white  p-3 rounded-3">
            <h5 class='text-center'>Tag present: </h5>
            <ul class='list'>
            <script>
            let list = document.querySelector('.list')


            fetch("./tag.json")
                .then(response => {
                    return response.json();
                })
                .then(jsondata => {
                  console.log(jsondata)
                        jsondata['tag'].forEach(index => {
                            console.log(index)
                            list.innerHTML += "<li class='fw-bold badge text-bg-danger my-2 '>"+index+"</li>"
                        })
                })
                    
        </script>
            </ul>
          </aside>
          <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>
              <tbody class='body'>
              <script>
                  let body = document.querySelector('.body')
  
  
                  fetch("./data.json")
                      .then(response => {
                          return response.json();
                      })
                      .then(jsondata => 
                              jsondata.forEach(index => {
                                  body.innerHTML += "<tr><th scope='row'>"+index['id']+"</th><td>"+index['tag']+"</td><td><a href='"+index['link']+"' target='_blank'>"+index['link']+"</a></td></tr>"
                              })
                          );
              </script>
                
              </tbody>
            </table>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    </body>
              </html>`)
})

//LOAD JSON FOR FATCH DATA
app.get('/data.json',(req, res)=>{

    res.sendFile(path.join(__dirname,'/data.json'))
})

app.get('/tag.json',(req, res)=>{

  res.sendFile(path.join(__dirname,'/tag.json'))
})

//PORT
app.listen(port)