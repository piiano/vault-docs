Deletes an object from a collection. This operation is irreversible.

The role performing this operation must have both of the following:
- The `CapDataWriter` capability.
- At least one allowing policy and no denying policies for the `delete` operation for each of the properties defined for
  the collection specified in the call.
  
See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.