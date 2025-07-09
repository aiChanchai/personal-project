# Personal project

### env guide

```
PORT = 8000
DATABASE_URL="mysql://root:02468ToM*@localhost:3306/personal-project"
JWT_SECRET=chanchai
```

### service

| Path                                    | Method | Description             | Authentication | Params | Query | Body | Response |
| :-------------------------------------- | :----- | :---------------------- | :------------- | :----- | :---- | :--- | :------- |
| /api/auth/register                      | POST   | Create user             |
| /api/auth/login                         | POST   | Login                   |
| /api/habits                             | GET    | Get habits              |
| /api/habits/:id                         | GET    | Get 1 habit             |
| /api/habits                             | POST   | Create habit            |
| /api/habits/:id                         | PUT    | Edit habit              |
| /api/habits/:id                         | DELETE | Delete habit            |
| /api/categories                         | GET    | Get Categories          |
| /api/categories                         | POST   | Create category         |
| /api/categories/:id                     | PUT    | Edit category           |
| /api/categories/:id                     | DELETE | Delete category         |
| /api/habits/:habit_id/entries           | GET    | Get all daily records   |
| /api/habits/:habit_id/entries           | POST   | Record a habit was done |
| /api/habits/:habit_id/entries/:entry_id | DELETE | Delete entry            |
| /api/admin/users                        | GET    | Get all users           |
| /api/admin/users/:id                    | GET    | Get a user              |
| /api/admin/users/:id                    | PUT    | Update user             |
| /api/admin/users/:id                    | DELETE | Delete users            |
