# Vault naming rules

This page describes the rules for valid names for:

- Entity names
- Transformation bindings
- Resources

### Entity names

An entity is a:

- Collection
- Property
- Policy
- Role
- User

The name of an entity can be any combination of alphanumeric ASCII characters (a-z, A-Z, 0-9) and underscore ('_'), except the first character cannot be an underscore. For example, `2em_Ploy33s_1` is a valid entity name. However, these are invalid entity names:
- `_employees`
- `-employees`
- ` employees`
- `e mployees`
- `employés`

Entity names are case-insensitive and case-preserving. This behavior means that when returning an entity name, Vault uses the case initially provided by the caller. However, when a string to match with an entity name is provided in an API call, the match function ignores the case.

For example, if a caller creates a collection by providing this body to the [REST API add collection](/api/operations/add-collection) operation:

```sql
customers PERSONS (
    first_NAME STRING NOT NULL COMMENT "First Name",
);
```

The operation set the property name to `first_NAME`.

Then, the value of an object's `first_NAME` property can be retrieved by calling the [REST API get objects property](/api/operations/get-objects-property) method specifying `props=first_name` as a query parameter.

### Transformation bindings

A transformation binding represents the application of a transformation to a property value or data type. The binding name consists of a property or data type name followed by a transformation name separated by a dot.

If the first element in the pair is a property name, the transformation binding is called a property transformation
binding. If the first element in the pair is a data type, the transformation binding is called a type transformation binding.

For example: 

- this is a property transformation binding: `personal_email.mask` where `personal_email` is the name of a property and `mask` is the name of a transformation.
- this is a type transformation binding: `email.mask` where `email` is a data type and `mask` is the name of a transformation.

### Resource

A resource specifies a set of data items referred to by a policy. A resource may be the string `*` or a string in the format: `[collection_name]/[resource_type]/[resource_name]`. In the formatted string:

- `collection_name` is an entity name that may include one or zero `*` characters. It is used as a glob to match one or more collection names.
- `resource_type` is one of the strings: `tokens`, `types`, `properties`, `deleted/properties`, or `deleted/tokens`.
- `resource_name` is an entity name or a transformation binding that can include one or zero `*` characters.

These rules also apply to the `resource_name`:

- If `resource_type` is `tokens` or `deleted/tokens`, `resource_name` is ignored.
- If `resource_type` is `properties` or `deleted/properties`, `resource_name` is used as a glob to match one or more property names or property transformation binding.
- If `resource_type` is `types`, `resource_name` is used as a glob to match one or more type names or type transformation bindings.
