---
sidebar_position: 1
---

# How IAM works

## Learn about Piiano Vault's identity and access management (IAM).

Identity and access management is how Vault governs access to APIs and data. This feature has two components:

- [**Access control**](#access-control) – to control user access to the APIs.
- [**Policy management**](#policy-management) – to control user access to data.

### Users and roles

A user represents the identity of a caller that requires access to an API operation or data in Vault. Each user gains access to Vault using an API key and has one role. Each role is a collection of access control capabilities and data access policies.

The initial configuration of Vault has one user called `Admin`, which has a special role also called `Admin`. This role has the `"CapSystem"` capability, which provides access to all API operations. The policy engine also grants the `Admin` role access to all data.

### Access control

Access control governs access to API operations. API operations are classified into scopes. For example, the collections
scope represents all the REST API operations with the `/api/pvlt/1.0/ctl/collections` prefix in their path. Capabilities
then define access to methods within the scope. For example, the `"CapCollectionsReader"` capability provides access to
all the GET operations in the `"collections"` scope. Each role can have one or more of these capabilities.

#### Capability evaluation and data access

When a user makes a REST API call or uses a CLI command, Vault determines whether the user's role includes the capability to perform the requested action. For a REST API call, for example, if the user doesn't have the required capability, the call is denied and a 403 error is returned. 

### Policy management

Policy management determines whether a user is allowed to complete an operation based on the data that the operation manipulates and how the data is manipulated. To do this, policy management uses the collection of policies associated with the user's role. A policy is a rule that contributes to the decision about whether a user can execute the requested operation.

This information defines each policy:

- `Type`, either `allow` or `deny`.
- `Operations`, a list of actions on data, including:
  - "read"
  - "write"
  - "delete"
  - "search"
  - "tokenize"
  - "detokenize"
  - "invalidate_token"
- `Resources`, a list of collection properties or transformations where each element is in the form of "`{collection_name}`/properties/`{property or transformation name}`".
- `Reasons`, a list of reasons for accessing data.

`Operations`, `Resources`, and `Reasons` must contain at least one value. The value of `"*"` denotes all possible values.

See [IAM configuration file reference](toml#policies) for more details on defining policies.

#### Policy evaluation and data access

When a user performs an operation in Vault, through the CLI or an API, the policy engine evaluates the operation against each policy in the user's role. Each policy then votes on whether to allow the user access. The policy's vote can be for, against, or an abstention. The policy engine allows the operation only when there is at least one allow vote and no deny votes.

To see how this works, assume that a user attempts to update all the properties of an object in a collection called `employees` using the [Update object](/api/operations/update-object-by-id) REST API operation. Also, assume that the `employees` collection has four properties, `first_name`, `last_name`, `phone_number`, and `ssn`.

If a user has a role that includes only this policy:

```toml
[policies.WriteAll]
policy_type = "allow"
operations = ["write"]
reasons = ["*"]
resources = ["*"]
```

When the user attempts to update all the details for an object, the policy votes to allow access. This is because the policy permits the user to write data for any property and any reason. With no votes denying access, the policy engine allows the user to perform the operation.

If the role were to include this second policy:

```toml
[policies.WriteAll]
policy_type = "deny"
operations = ["tokenize"]
reasons = ["*"]
resources = ["*/phone_number"]
```

Now, when the user attempts to update all of an object's details, two policies vote. This policy abstains from voting because the requested operation isn't trying to tokenize a property. With one vote for and one abstention, the policy engine allows the user to perform the update.

However, if the role includes this third policy:

```toml
[policies.DenyWriteSSN]
policy_type = "deny"
operations = ["write"]
reasons = ["*"]
resources = ["employees/ssn"]
```

When the user attempts to update all of an object's details, this policy votes against allowing access. This is because the policy denies the user the ability to update the `ssn` property of the `employees` collection. Consequently, although there is still one vote for (and one abstention), the vote against allowing access means that the policy engine denies the request to update the object's details. For the REST API, this results in the call not executing, and a 403 error is returned.
