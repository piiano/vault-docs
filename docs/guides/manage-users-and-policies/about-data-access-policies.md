---
sidebar_position: 1.1
---

# About data access policies

## Learn about data access policies.

Vault lets you control how sensitive data is accessed using advanced data access policies.

On top of standard role-based-access-controls (RBAC), Vault supports granular policies by taking into account:
* **Request context** - for example, the reason for accessing the data.
* **Data context** - for example, the origin of the data.

These policies are a powerful capability, unlocking many privacy and compliance use-cases, for example:

* Allow marketing entities (jobs and roles) to access a customer's email only if they have consented to marketing emails.
* Allow access to personal information for legal reasons only when the legal representative is in the same jurisdiction as the person accessed.
* Allow an engineer to access users' information only when the engineer is on active duty.

Vault provides a powerful [identity and access management](/data-security/identity-and-access-management) and [advanced data access controls](/data-security/advanced-data-and-access-controls) to govern data access.
