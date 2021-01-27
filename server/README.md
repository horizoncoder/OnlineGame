### `Установка postgresql (Для Линукс "Ubuntu")`

Откройте терминал и выполните следущие команды:

 //Для установки "postgresql"

```
# Create the file repository configuration:
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key:
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package lists:
sudo apt-get update

# Install the latest version of PostgreSQL.
# If you want a specific version, use 'postgresql-12' or similar instead of 'postgresql':
sudo apt-get -y install postgresql
```
//Создание пользователя

```
CREATE USER имя пользователя WITH PASSWORD 'ваш пароль' 
```
//Получить доступ к таблице 

```
GRANT ALL PRIVILEGES ON TABLE имя таблицы  TO имя пользователя 
```
### `db.js`
В файле "db.js"  выполняется подключение к базе данных, перед запуском приложения подключите базу данных.

### `.env`

 В папке "server" создайте файл ".env" введите свою цифровую подпись для шифрования паролей пользователей и пароль к базе данных.
 //Шаблон

```
jwtSecret = "ваш пароль"
BDpassword="ваш пароль"
```

### `PostgreSQL Database`
Для работы приложения установите "PostgreSQL Database" и создайте базу данных.

### `node index.js`

Запустите приложение используя команду "node index.js".
