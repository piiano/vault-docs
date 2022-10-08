Adds an object to a collection. The request must include all the non-nullable properties, as defined by the [collection schema](/operations/list-collection-properties).

The role performing this operation must have both of the following:
- The `CapDataWriter` capability.
- At least one allowing policy and no denying policies for the `write` operation for each of the collection properties
  provided in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.