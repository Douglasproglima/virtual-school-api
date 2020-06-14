import app from './src/app';

const port = 3001;
app.listen(port, () => {
  console.log(`Acessar http://localhost:${port}`);
  console.log(`Servidor executando na porta ${port}`);
});