Updates properties of an object in a collection.

The role performing this operation must have both of the following:
- The `CapDataWriter` capability.
- At least one allowing policy and no denying policies for the `write` operation for each of the collection properties
  specified in the call.

See [identity and access management](/data-security/identity-and-access-management) for more information about how
capabilities are used to control access to operations and policies are used to control access to data.

:::info
Vault does not support the selective modification of values in array data types in objects. To modify an array in an object, you must read the entire array, change it locally, and then provide the whole array back.
:::