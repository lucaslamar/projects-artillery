const express = require('express');
const { uuid } = require('uuidv4');

const server = express();

server.use(express.json());

const port = 3333;

const projects = [
  {
    "id": "345403a3-7d23-4775-8b8a-0024601a6619",
    "title": "hello world",
    "owner": "Lamar 4"
  }
];

server.get('/', (req, res) => json({message: 'Hello World!'}));

server.get('/projects', (req, res) => {
  res.json(projects);
});

server.post('/projects', (req, res) => {
  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  res.status(200).json(project);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title,owner } = req.body;

  const projectIndex = projects.findIndex(project =>  project.id === id);
console.log(projectIndex);
  if (projectIndex < 0 ) {
    console.log('entrou');
    return res.status(400).json({ error: 'Projeto não encontrado!' })
  }
console.log('passou');
  const project = {
    id,
    title,
    owner,
  }

  projects[projectIndex] = project
  
  res.status(200).json(project);
});

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0 ) {
    return response.status(400).json({ error: 'Projeto não encontrado!' })
  }

  projects.splice(projectIndex, 1);
  res.status(201).send();
});

server.listen(port);