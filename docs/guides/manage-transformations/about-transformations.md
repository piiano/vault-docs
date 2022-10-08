---
sidebar_position: 1
---

# About transformations

Transformations provide a mechanism to present the data held in Vault to reduce data exposure. For example, a phone number can be masked so that only the last four digits are readable, like this `***-****-2795`. 

Each transformation is associated with a [data type](/guides/manage-collections-and-schemas/reference/data-types) and can be applied to any data of the same type. Vault provides several built-in transformations for specific data types.

The [access policies](/guides/manage-users-and-policies/about-data-access-policies) then enable you to restrict access to raw data and enforce the use of transformations for specific users, practically reducing exposure risk. For example, a public web application collects SSNs and stores them in Vault. An access policy can be configured to allow the application to read a masked SSN value only, reducing the potential of exposing SSNs stored in the system. The SSNs are now protected, even in the case of a compromised web server (through SQL injection, remote-code execution, etc.).
