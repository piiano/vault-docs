---
sidebar_position: 3
sidebar_label: Design rationale
---

# Design rationale

This page provides background information on the design rationale for various aspects of the Piiano Vault REST API.

### Parameter passing

Where various parameters are passed in a REST API request has ramifications for security. Considering the security ramifications, the Piiano team made these design decisions:

- Authentication token: this token is passed in the request's header, following industry best practices. Doing so ensures the credentials are not accidentally logged but can be logged when requested. Also, passing the token in the header enables proxies to block access for specific API token users.
- Arguments: These are passed in query parameters. This enables a relatively fixed URL structure that helps simplify the [IAM configuration](/guides/manage-users-and-policies/how-iam-works), which is in part based on the URL structure. Another benefit of passing items, such as IDs, in query parameters, is that you can easily specify multiple IDs in the same request.
- Personally identifiable information (PII): Anything related to PII is passed in the request body to ensure it is never accidentally logged. For example, in the get object by query, the following is passed in the body of the request: `"match": {"first_name": "John", "last_name": "Doe"}`.
