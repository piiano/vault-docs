Returns a [paginated list](/#pagination) of objects from a collection with all or a subset of object property values.

The role performing this operation must have both of the following:
- The `CapDataReader` capability.
- At least one allowing policy and no denying policies for the `read` operation for each of the properties and the
  collection requested in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.

**Warning**: Use of the `unsafe` option, to include all object property values, may expose more private information than is required, use with caution.