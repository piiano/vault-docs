Permanently deletes objects and tokens that have:
- passed their time to live (TTL) end date and therefore expired
- been deleted
where the expiry or deletion date of an item is before the grace period.

For example, suppose the default 30-day grace period applies, and this operation is called on 1 October. In that case, items that expired or were deleted before 1 September are permanently deleted, and those that expired or were deleted after 1 September are unaffected.

The grace period is set with the `PVAULT_DB_GC_GRACE_PERIOD_DAYS` environment variable.

A dry run can be performed to determine how many objects and tokens are available to delete permanently.
