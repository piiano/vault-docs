---
sidebar_position: 1
sidebar_label: Overview
slug: /
---

# Introduction

The Piiano Vault REST API allows you to access and manage collections, objects, tokens, users, policies and other resources within the Piiano Vault in a simple, programmatic way using conventional HTTP requests and standard HTTP response codes

The API follows RESTful conventions when possible, with most operations performed by `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests. Request and response bodies are [JSON-encoded](https://www.json.org/json-en.html).

Using this API reference, you'll find details for each endpoint and type of resource used in the API.

You can also try each API endpoint using **Send API request**.

OpenAPI specification is available in [YAML](@site/static/assets/openapi.yaml) and [JSON](@site/static/assets/openapi.json) formats and can be used for generating client code for the API.

## Versioning

The Piiano Vault API is versioned and the version is part of the API base URL. The current version is `1.0` so the URL will be prefixed with `/api/pvlt/1.0/`.

A new API version is released when we introduce a **backwards-incompatible** change to the API. For new features and additions to the API, such as adding a new API endpoint, or including a new object in an existing API endpoint's response, there won't be a new version.

## Pagination

Vault uses pagination to improve performance when retrieving objects. 

The default value for the page size is specified in the environment variable `PVAULT_SERVICE_DEFAULT_PAGE_SIZE`. When you request a list of objects you can use the `page_size` parameter to set the page size as lower than the default value.

The response provides an `results` array containing the object details and a `paging` object with information about the page. For example:

```json
{
  "results": [
    {
      "email": "joe-0-bill@microsoft.com"
    },
    {
      "email": "joe-1-bill@microsoft.com"
    }
  ],
  "paging": {
    "size": 100,
    "remaining_count": 901,
    "cursor": "AXfKgvXQNTZYiFCtBSTHbjkmYXiaE84oxgGzdeQyKXZbbG0sUX7jAwrUeaBIosUeXqYIKw=="
  }
}
```

In the `paging` object:

- `size` is the number of results returned.
- `remaining_count` is the number of items that remain to be returned in subsequent pages.
- `cursor` is a reference to the next page. You use the cursor in a follow up call, like this:
   ```text
   GET api/pvlt/1.0/data/collections/employees/objects?reason=Analytics&props=email&cursor=AXfKgvXQNTZYiFCtBSTHbjkmYXiaE84oxgGzdeQyKXZbbG0sUX7jAwrUeaBIosUeXqYIKw==
   ```
   to obtain the next page.

The final page in a sequence of pages returns `0` for `remaining_count` and no cursor. For example:
```json
{
  ...
  "paging": {
    "size": 1,
    "remaining_count": 0,
    "cursor": ""
  }
}
```

## HTTP status codes

The Piiano Vault REST API indicates the success or failure of an API request with a subset of [standard HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

### Codes used

This table lists the HTTP response status codes you may receive from the Piiano Vault REST API.

| Code | Outcome                                                                                                                                                                                | Example error message                                                                                 |
|:-----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------|
| 200  | The request is processed successfully.                                                                                                                                                 |                                                                                                       |
| 400  | The request fails because part of the request is misformed. For example, required properties are missing from the request body, or a request parameter is in the wrong format.         | The access reason is missing.                                                                         |
| 401  | The caller's authentication credentials are incorrect or missing. For example, an API key is wrong or not provided.                                                                    | The request is unauthorized.                                                                          |
| 403  | A required policy or policies is missing. For example, the caller needs the `CapDataWriter` capability to add an object.                                                               | The operation is forbidden due to missing capabilities.                                               |
| 404  | An item indicated in the request is not found. For example, a request is made to update items in a nonexistent collection. The error response includes details of the missing items.   | No collection exists with the ID [`id`].                                                              |
| 413  | The request is rejected as it exceeds a server-side limit.                                                                                                                             | The request payload is too large. Reduce the size of the payload and try again.                       |
| 414  | The URI of the request is longer than the server is willing to interpret.                                                                                                              | The request URI is too long. Reduce the request or use a POST operation, if available, and try again. |
| 429  | The request exceeds the rate limits.                                                                                                                                                   | This request exceeds the rate limits. Try again later.                                                |
| 500  | The request fails because there is an error on the server. This usually indicates a transient error, and you can try again later. If the error persists, contact your service support. | Something went wrong                                                                                  |
| 501  | The operation hasn't been implemented.                                                                                                                                                 | This operation is not implemented.                                                                    |
| 503  | The request fails because the service is not running. Try again later and if the error persists, contact your service support.                                                         | The operation timed out on the server.                                                                |

### Error response schema

| Property  | Type    | Description           |
|:----------|:--------|:----------------------|
| `code`    | integer | The HTTP status code. |
| `message` | string  | The error message.    |
| `context` | map     | The error context.    |

#### Example Error Response

```text
HTTP/1.1 401 Unauthorized
{
  "code": 401,
  "message": "Authentication credentials are incorrect or missing.",
  "context": {}
}
```

## Generating client code

The Piiano Vault REST API reference includes a way to convert an API request into a code snippet in the programming language or framework of your choosing.

---


### SQL to Vault mappings

Vault includes data access APIs that provide features similar to those you find in many SQL typed databases.

For those familiar with SQL, the following presents mappings between some common SQL queries and corresponding Piiano Vault REST API calls.

These mappings are divided into:

* Create: queries that insert information.
* Read: queries that return information. These include powerful search options.
* Update: queries that replace information.
* Delete: queries that delete information.

#### Create

| SQL query                                                                        | Vault Data API equivalent                                                                                                                                                            | Comment                                                                                                                          |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `INSERT INTO customers (first_name, last_name) VALUES (@first_name, @last_name)` | Operation: `POST /api/pvlt/1.0/data/collections/customers`<br />Body: `{"first_name":"@first_name","last_name":"@last_name"}`                                                        | Though not shown here, all non-nullable properties in the schema of the collection must be included in the body of this request. |
| `BULK INSERT`                                                                    | Operation: `POST /api/pvlt/1.0/data/collections/customers?options=many`<br />Body: `[{"first_name":"@first_name","email":"@email"},{"first_name":"@first_name2","email":"@email2"}]` | Use this operation to insert large numbers of objects into Vault.                                                                |


#### Read

| SQL query                                                             | Piiano Data API equivalent                                                                                                                          | Comment                                                                                                                                                                                                                          |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SELECT * FROM customers WHERE id=@id  `                              | Operation: `GET /api/pvlt/1.0/data/collections/customers?id={id}&options=unsafe`                                                                    | Vault limit access to the entire object record and encourage users to access only specific data. Therefore, requests for all properties are designated as "unsafe" and are only allowed for users with the unsafe access policy. |
| `SELECT first_name, last_name FROM customers WHERE id=@id`            | Operation: `GET /api/pvlt/1.0/data/collections/customers?id={id}?props=first_name,last_name`                                                        | The preferred way to use Vault is to explicitly specifying the properties to read.                                                                                                                                               |
| `SELECT email, nationality FROM customers WHERE last_name LIKE %Doe%` | Operation: `POST /api/pvlt/1.0/data/collections/customers/query`<br />  Body: `{"select":["email","nationality"],"where":"last_name LIKE '%Doe%'"}` | The "where" property provided in the body supports several common SQL "where" clauses and is rigorously checked to eliminate any chance of SQL injection.                                                                        |


#### Update

| SQL query                                                                | Vault Data API Equivalent                                                                                                      | Comment                                       |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `UPDATE customers SET first_name=@first_name, email=@email WHERE id=@id` | Operation: `PATCH /api/pvlt/1.0/data/collections/customers?id={id}`<br />Body: `{"first_name":"@first_name","email":"@email"}` | Include the properties to update in the body. |


#### Delete

| SQL query                            | Vault Data API Equivalent                                            | Comment                 |
| ------------------------------------ | -------------------------------------------------------------------- | ----------------------- |
| `DELETE from customers WHERE id=@id` | Operation: `DELETE /api/pvlt/1.0/data/collections/customers?id={id}` | Deletes an object by ID.|
