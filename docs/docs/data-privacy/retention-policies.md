---
sidebar_position: 3
---

# Retention policies

Vault data retention controls the deletion of expired objects.

You can customize aspects of the retention policy globally and also on the three object types:
* Person object. For example, a user record. 
* Person-data objects. For example, a credit card belonging to a user or a transaction the user has made.
* Tokens. For example, the opaque value `a03e9931-be21-42ab-8c67-3ee4d77f5e84` could point to the user's credit card or SSN.

All objects in Vault have a life cycle. When created, objects are live. Once their time to live (TTL) expires, or they are deleted, they become soft-deleted. Then, after a grace period (30 days by default), they become eligible for purging. When the purge process is run, they are hard-deleted.

The periods that affect the life cycle of all object types are configurable, including the default TTL for new objects in a collection, the TTL of an object, and the grace period for soft-deleted objects.

If an object's **owner object** is soft-deleted or hard-deleted, the object is also soft-deleted or hard-deleted, regardless of its TTL. This feature enables Vault to automatically remove all the data belonging to a person when the retention period for that person expires.


