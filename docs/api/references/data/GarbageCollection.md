Runs garbage collection on objects and tokens.

Objects and tokens' lifecycle includes a TTL (time to leave) configuration. when TTL is passed those are considered expired.
Also when deleting objects and tokens, those are not being deleted immediately but marked as expired as well.

Garbage collection is an operation for hard delete expired objects and soft deleted objects that are expired for more than the grace period defined in the configuration, which is 30 days by default.

`filter` query parameter may be used to run only on objects or only on tokens.

`dry_run` query parameter may be used to get a report of how many objects and tokens will be deleted on actual garbage collection and from which collections.

The role performing this operation must have the `CapSystemGCRunner` capability.
See [Access control](/data-security/identity-and-access-management#access-control) for more information about how
capabilities are used to control access to operations.