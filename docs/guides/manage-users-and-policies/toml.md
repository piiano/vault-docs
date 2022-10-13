---
sidebar_position: 5
---

# IAM configuration file reference

## Learn about the IAM configuration file structure.

[Identity and access management](/data-security/identity-and-access-management) users, roles, and policies are defined using a [TOML file](https://en.wikipedia.org/wiki/TOML) loaded using the [Set IAM configuration REST API endpoint](/api/operations/set-iam-conf) or [CLI command](/cli/Reference#set-iam-configuration).

The TOML file must contain three sections, in any order.

## Users

Users are defined with the `[users]` keyword like this:

```toml
[users.<name>]
role = "<role_name>"
```

Where `<role_name>` is any valid string.

## Roles

Users are defined with the `[roles]` keyword like this:

```toml
[roles.<role_name>]
capabilities = [<capabilities-list>]
policies = [<policies-list>]
```

Where:

- `<role_name>` is any valid string.
- `<capabilities-list>` is a comma-separated list of capabilities or `"*"` to indicate that all capabilities are included. These are the capabilities by scope:
<table>
<thead>
  <tr>
    <th>Scope</th>
    <th>Prefix</th>
    <th>Methods</th>
    <th>Capability</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">Data</td>
    <td rowspan="2"><code>/api/pvlt/1.0/data</code></td>
    <td>GET</td>
    <td><code>"CapDataReader"</code></td>
  </tr>
  <tr>
    <td>POST, PATCH, and DELETE</td>
    <td><code>"CapDataWriter"</code></td>
  </tr>
  <tr>
    <td rowspan="2">Identity and access management</td>
    <td rowspan="2"><code>/api/pvlt/1.0/data</code></td>
    <td>GET</td>
    <td><code>"CapIAMReader"</code></td>
  </tr>
  <tr>
    <td>POST</td>
    <td><code>"CapIAMWriter"</code></td>
  </tr>
  <tr>
    <td rowspan="2">Schema</td>
    <td rowspan="2"><code>/api/pvlt/1.0/schema</code></td>
    <td>GET</td>
    <td><code>"CapCollectionsReader"</code></td>
  </tr>
  <tr>
    <td>POST, PATCH, and DELETE</td>
    <td><code>"CapCollectionsWriter"</code></td>
  </tr>
  <tr>
    <td>Version</td>
    <td><code>/api/pvlt/1.0/system/info/version</code></td>
    <td>All</td>
    <td>Not required</td>
  </tr>
  <tr>
    <td rowspan="2">Health</td>
    <td><code>/api/pvlt/1.0/data/info/health</code></td>
    <td>All</td>
    <td>Not required</td>
  </tr>
  <tr>
    <td><code>/api/pvlt/1.0/ctl/info/health</code></td>
    <td>All</td>
    <td>Not required</td>
  </tr>
</tbody>
</table>

- `<policies-list>` is a comma-separated list of policies or `"*"` to indicate that all policies are included. 

## Policies

Policies are defined with the `[policies]` keyword like this:

```toml
[policies.<policy_name>]
policy_type = "allow"|"deny"
operations = [<operations-list>]
reasons = [<reasons-list>]
resources = [<resources-list>]
```

Where: 

- `operations-list` is a comma-separated list of one or more of these values or `"*"` to indicate that all operations are included:
  - `"read"`
  - `"write"`
  - `"delete"`
  - `"search"`
  - `"tokenize"`
  - `"detokenize"`
  - `"invalidate_token"`
- `reasons-list` is a comma-separated list of one or more of these values or `"*"` to indicate that all reasons are included:
  - `AppFunctionality`
  - `Analytics`
  - `Notifications`
  - `Marketing`,
  - `ThirdPartyMarketing`
  - `FraudPreventionSecurityAndCompliance`
  - `AccountManagement`
  - `Maintenance`
  - `DataSubjectRequest`
  - `Other`
- `resources-list` is a comma-separated list of one or more collection properties or transformations specified as `<collection–name>/[<property –name>|<transformation–name>]`. `<collection–name>` or `[<property –name>|<transformation–name>]` can be specified as `"*"` to indicate that all collections or properties and transformations are included. For example:

  - `"employees/email"` refers to the email property of the employees collection.
  - `"*/email"` refers to the email property in any collection.
  - `"customers/ssn.mask"` refers to the mask transformation of the ssn property of the customers collection.

## Example

This example shows the specification of:

- A `CollectionsManager` user.
- A `CollectionsReaderWriter` role. The `CollectionsReaderWriter` role has the capabilities to enable it to maintain the
  schema of collections.
- Two policies allowing read and write for all properties and transformations for any reason.

```toml
[users]

[users.CollectionsManager]
role = "CollectionsReaderWriter"

[roles]

[roles.CollectionsReaderWriter]
capabilities = ["CapCollectionsReader", "CapCollectionsWriter"]
policies = ["PolReadAll","PolWriteAll"]

[policies]

[policies.PolReadAll]
policy_type = "allow"
operations = ["read"]
reasons = ["*"]
resources = ["*"]

[policies.PolWriteAll]
policy_type = "allow"
operations = ["write"]
reasons = ["*"]
resources = ["*"]
```
