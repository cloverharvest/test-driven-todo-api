// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  /* This endpoint responds with all of the todos
   */
   res.json({todos:todos});
});

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
  //  */ //console.log("hello");
     //
     var newId = todos[todos.length-1]._id + 1;
     var task = req.body.task;
     var desc = req.body.description;
     console.log(task, desc);
     var newTodo = { _id: newId, task: task, description: desc};
     todos.push(newTodo);
     res.json(newTodo);
});

//nathan's solutions studied
//The filter() method creates a new array with all elements that pass the test implemented by the provided function.
app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
    //get id from url params
    var todoId = parseInt(req.params.id);
    //find todo by its ID
    var foundTodo = todos.filter(function(todo) {
      return todo._id == todoId;
    })[0];

    res.json(foundTodo);
 });

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
   var todoId = parseInt(req.params.id);

   var todoToUpdate = todos.filter(function (todo) {
     return todo._id == todoId;
   })[0];

   todoToUpdate.task = req.body.task;

   todoToUpdate.descripttion = req.body.description;

   res.json(todoToUpdate);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
  var todoId = parseInt(req.params.id);

  var todoToDelete = todos.filter(function (todo) {
    return todo._id == todoId;
  })[0];

  //what is array.prototype.slice? If deleteCount is greater than the number of elements left in the array
  //starting at start, then all of the elements through the end of the array will be deleted.
// If deleteCount is omitted, deleteCount will be equal to (arr.length - start).

  todos.splice(todos.indexOf(todoToDelete), 1);


  res.json(todoToDelete);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
