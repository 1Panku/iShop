var mongoClient = require("mongodb").MongoClient;
var connectionString = "mongodb://127.0.0.1:27017";
var cors = require("cors");
var express = require("express");

var app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(cors());



app.get("/products/categories", function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblcategories").find().toArray(function (err, document) {
                if (!err) {
                    res.send(document)
                }
            })
        }
    })
})




app.get("/products/categories/electronics", function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({ "category": "electronics" }).toArray(function (err, document) {
                res.send(document);
            })
        }
    })
})


app.get("/products/categories/jewelery", function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({ "category": "jewelery" }).toArray(function (err, document) {
                res.send(document);
            })
        }
    })
})


app.get("/products/categories/men's%20clothing", function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({ "category": "men's clothing" }).toArray(function (err, document) {
                res.send(document);
            })
        }
    })
})


app.get("/products/categories/women's%20clothing", function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({ "category": "women's clothing" }).toArray(function (err, document) {
                res.send(document);
            })
        }
    })
})


app.get("/products/categories/footwear", function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({ "category": "footwear" }).toArray(function (err, document) {
                res.send(document);
            })
        }
    })
})




app.get("/products", function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find().toArray(function (err, document) {
                if (!err) {
                    res.send(document)
                }
            })
        }
    })
})


app.get(`/products/:id`, function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({ id: parseInt(req.params.id) }).toArray(function (err, document) {
                if (!err) {
                    res.send(document);
                }
            })
        }
    })
})


app.get(`/products/by/:name`, function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({ name: req.params.name }).toArray(function (err, document) {
                if (!err) {
                    res.send(document);
                }
            })
        }
    })
})



app.get(`/admin`, function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObj) {
        if (!err) {
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tbladmin").find().toArray(function (err, document) {
                if (!err) {
                    res.send(document);
                }
            })
        }
    })
})


app.post('/admin/register', function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObject) {
        if (!err) {
            var dbo = clientObject.db("ishopdb");
            var data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                mobile: req.body.mobile,
                email: req.body.email,
                password: req.body.password,
               
            };
            dbo.collection("tbladmin").insertOne(data, function (err, result) {
                if (!err) {
                    console.log("Record Inserted");
                }
            });
        }
    })
})




app.get('/customers', function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObject) {
        if (!err) {
            var dbo = clientObject.db("ishopdb");
            dbo.collection("tblcustomers").find().toArray(function (err, documents) {
                if (!err) {
                    res.send(documents);
                    
                }else{
                    console.log(err);
                }
            })
        }
    })
});


app.post('/customers/register', function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObject) {
        if (!err) {
            var dbo = clientObject.db("ishopdb");
            var data = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                Dob: req.body.Dob,
                gender: req.body.gender,
                mobile: req.body.mobile,
                email: req.body.email,
                password: req.body.password,
                address1: req.body.address1,
                address2: req.body.address2,
                pin_code: req.body.pin_code,
                state: req.body.state,
                country: req.body.country
            };
            dbo.collection("tblcustomers").insertOne(data, function (err, result) {
                if (!err) {
                    console.log("Record Inserted");
                } else {
                    console.log(err);
                }
            });
        }
    })
})


app.post('/products/register', function (req, res) {
    mongoClient.connect(connectionString, function (err, clientObject) {
        if (!err) {
            var dbo = clientObject.db("ishopdb");
            var data = {
                id: req.body.id,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                category: req.body.category,
                image: req.body.image,
                rating: { rate: req.body.rate, count: req.body.count }
            };
            dbo.collection("tblproducts").insertOne(data, function (err, result) {
                if (!err) {
                    console.log("Record Inserted");
                } else {
                    console.log(err);
                }
            });
        }
    })
})



app.listen(3030);
console.log("Server Started http://127.0.0.1:3030");