// GET REQUEST
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos',{
    title: 'new task',
    completed : false
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.put('https://jsonplaceholder.typicode.com/todos/2',{
    title: 'done',
    completed : true
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/2')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
  ])
  .then(axios.spread((todo,post)=>{
    showOutput(post);
    console.log(todo);
  }))
  .catch(er=>console.log(er));
}

// CUSTOM HEADERS
function customHeaders() {  
  axios.post('https://jsonplaceholder.typicode.com/todos?_limit=5',{
    title: 'new task',
    completed : false
  },{
    headers:{
      "content-type": 'application/Json',
      Authorization: 'sometoken'
    }
  }
  )
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'kartik'
    },
    transformResponse : axios.defaults.transformResponse.concat(data=>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }

  axios.get(options)
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todost')
  .then(res=>showOutput(res))
  .catch(err=>{
    if(err.response){
      alert('you got problem with because of this machine');
    }else if(err.request){
      alert('server is down');
    }else{
      alert('something is wrong');
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  let source = axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  })
  .then(res=>showOutput(res))
  .catch(err=>{
    if(axios.isCancel(err)){
      console.log('Request canceled', err.message);
    }
  });

  if(true) source.cancel('Request canceled')
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config=>{
    console.log(`${config.method.toUpperCase()} request sent to 
    ${config.url} at ${ new Date().getMinutes()}:${new Date().getSeconds()}`);
    return config;
  },
  error=>{}
);

// AXIOS INSTANCES
const instant = axios.create({
  baseURL : 'https://jsonplaceholder.typicode.com/'
});

// instant.get('comments').then(re=>showOutput(re));


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      <h4>Headers</h4>
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
     <h4> Data </h4>
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
