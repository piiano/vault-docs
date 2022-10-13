---
sidebar_position: 7
sidebar_label: SQL to Vault mappings
---


# SQL to Vault mappings

Vault includes data access APIs that provide features similar to those in many SQL-typed databases.

This page presents mappings between some common SQL queries and the Piiano Vault REST API calls for those familiar with SQL.

These mappings are divided into:

* Create: queries that insert information.
* Read: queries that return information. These include powerful search options.
* Update: queries that replace information.
* Delete: queries that delete information.

### Create

| SQL query                                                                        | Vault Data API equivalent                                                                                                                                                            | Comment                                                                                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `INSERT INTO customers (first_name, last_name) VALUES (@first_name, @last_name)` | Operation: `POST /api/pvlt/1.0/data/collections/customers`<br />Body: `{"first_name":"@first_name","last_name":"@last_name"}`                                                        | Though not shown here, all non-nullable properties in the schema of the collection must be included in the body of this request. |
| `BULK INSERT`                                                                    | Operation: `POST /api/pvlt/1.0/data/collections/customers?options=many`<br />Body: `[{"first_name":"@first_name","email":"@email"},{"first_name":"@first_name2","email":"@email2"}]` | Use this operation to insert large numbers of objects into Vault.                                                                |

### Read

| SQL query                                                             | Piiano Data API equivalent                                                                                                                          | Comment                                                                                                                                                                                                                          |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SELECT * FROM customers WHERE id=@id  `                              | Operation: `GET /api/pvlt/1.0/data/collections/customers?id={id}&options=unsafe`                                                                    | Vault limit access to the entire object record and encourage users to access only specific data. Therefore, requests for all properties are designated as "unsafe". However, this call only works if the user has permission to read all the properties within the collection. See [About data access policies](/guides/manage-users-and-policies/about-data-access-policies) for more information. |
| `SELECT first_name, last_name FROM customers WHERE id=@id`            | Operation: `GET /api/pvlt/1.0/data/collections/customers?id={id}?props=first_name,last_name`                                                        | The preferred way to use Vault is to explicitly specifying the properties to read.                                                                                                                                               |
| `SELECT email, nationality FROM customers WHERE last_name LIKE %Doe%` | Operation: `POST /api/pvlt/1.0/data/collections/customers/query`<br />  Body: `{"select":["email","nationality"],"where":"last_name LIKE '%Doe%'"}` | The "where" property provided in the body supports several common SQL "where" clauses and is rigorously checked to eliminate any chance of SQL injection.                                                                        |

### Update

| SQL query                                                                | Vault Data API Equivalent                                                                                                      | Comment                                       |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `UPDATE customers SET first_name=@first_name, email=@email WHERE id=@id` | Operation: `PATCH /api/pvlt/1.0/data/collections/customers?id={id}`<br />Body: `{"first_name":"@first_name","email":"@email"}` | Include the properties to update in the body. |

### Delete

| SQL query                            | Vault Data API Equivalent                                            | Comment                 |
| ------------------------------------ | -------------------------------------------------------------------- | ----------------------- |
| `DELETE from customers WHERE id=@id` | Operation: `DELETE /api/pvlt/1.0/data/collections/customers?id={id}` | Deletes an object by ID.|
