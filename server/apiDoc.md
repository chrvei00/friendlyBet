```
/api
```

*Bet:*

```
api/bet
```
GET: Gets all bets

POST: Create bet
```
{
    "title": String,
    "oddsW": Number,
    "oddsL": Number,
    "description: String
}
```

*User:*
```
/api/user
```

```
/api/user/
```

GET: Gets all user-object (should prob be removed)

```
/api/user/auth
```

GET: Check if user is auth (via session)
DELETE: Logs out (deletes session)
POST: Logs in
```
{
    "username": String,
    "pasword": String
}
```

```
/api/user/register
```
POST: Creates user
```
{
    "username": String,
    "pasword": String
}
```