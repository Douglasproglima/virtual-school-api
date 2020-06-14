# escola-virutal

### Instalar Dependências
``
npm i
``

### Criar a tabela no BD
``
CREATE SCHEMA `virtual_school` DEFAULT CHARACTER SET utf8mb4;
``

### Criar Migration/Tabela Students - No terminal digite

``
npx sequelize migration:create --name=students
``

### Criar a Tabela no BD

``
npx sequelize db:migrate
``