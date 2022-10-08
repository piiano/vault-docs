---
sidebar_position: 2
---

# Transformations

Transformations provide a mechanism to present the data held in Vault in a way that reduces data exposure. For example, a phone number can be masked so that only the last four digits are readable, like this `***-****-2795`. Each transformation is associated with a [data type](/guides/manage-collections-and-schemas/reference/data-types).

Combined with Vault’s [access policies](/data-security/identity-and-access-management), transformations enable you to enforce and restrict access to specific views of the data, practically reducing exposure risk. For example, a public web application collects SSNs and stores them in Vault. An access policy can be configured to allow the application to read a masked SSN value only, reducing the potential of exposing SSNs stored in the system. The SSNs are now protected, even in the case of a compromised web server (through SQL injection, remote-code execution, etc.).

The built-in transformations include:
- mask for an SSN, email, phone number, credit card number, and bank account number.
- transformation of a birthday date into a day, month, or year only. (Coming soon :gift:)
- transformation of an address into a city. (Coming soon :gift:)

:::note
The [Vault roadmap](/roadmap) includes additional built-in transformations and the ability to specify custom transformations. 
:::

See [Manage transformations](/guides/manage-transformations) for more information on transformations.
