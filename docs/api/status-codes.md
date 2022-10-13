---
sidebar_position: 6
sidebar_label: Status codes
---

# HTTP status codes

The Piiano Vault REST API indicates the success or failure of an operation call with a subset of the [standard HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

### Codes used

This table lists the HTTP response status codes you may receive from the Piiano Vault REST API.

| Code | Outcome                                                                                                                                                                                | Example error message                                   |
|:-----|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------|
| 200  | The request is processed successfully.                                                                                                                                                 |                                                         |
| 400  | The request fails because part of the request is misformed. For example, required properties are missing from the request body, or a request parameter is in the wrong format.         | The access reason is missing.                           |
| 401  | The caller's authentication credentials are incorrect or missing. For example, an API key is wrong or not provided.                                                                    | The request is unauthorized.                            |
| 403  | A required policy or policies is missing. For example, the caller needs the `CapDataWriter` capability to add an object.                                                               | The operation is forbidden due to missing capabilities. |
| 404  | An item indicated in the request is not found. For example, a request is made to update items in a nonexistent collection. The error response includes details of the missing items.   | No collection exists with the ID [`id`].                |
| 413  | The request is rejected as it exceeds a server-side limit.                                                                                                                             | The request payload is too large.                       |
| 414  | The URI of the request is longer than the server is willing to interpret.                                                                                                              | The request URI is too long.                            |
| 429  | The request exceeds the rate limits.                                                                                                                                                   | This request exceeds the rate limits.                   |
| 500  | The request fails because there is an error on the server. This usually indicates a transient error, and you can try again later. If the error persists, contact your service support. | Something went wrong.                                   |
| 501  | The operation hasn't been implemented.                                                                                                                                                 | This operation is not implemented.                      |
| 503  | The request fails because the service is not running. Try again later and if the error persists, contact your service support.                                                         | The operation timed out on the server.                  |

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
