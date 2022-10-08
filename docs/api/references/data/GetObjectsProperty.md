Returns a [paginated list](/#pagination) of the values of a property for objects in a collection.

The role performing this operation must have both of the following:
- The `CapDataReader` capability.
- At least one allowing policy and no denying policies for the `read` operation for the property and the and the
  collection requested in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.