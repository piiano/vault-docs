---
sidebar_position: 1
---
# About collections

## Learn about the definition of personal and sensitive data in Piiano Vault.

Vault stores data in a [hierarchy](/architecture/hierarchy), where each vault contains collections, each collection contains objects, and objects hold values. 

Each vault may have multiple collections of both independent and associated data. For example, an application may use two collections in a vault – one for customers in an e-commerce system and another collection of associated data for the financial transactions made by those customers.

### Collection and schemas

The data values held in a collection's objects are defined with a schema, similar to a database table schema. The schema contains [properties](reference/schema-properties) that define the data types of all values in the collection's objects, similar to columns of a table. All objects in a collection conform to the same schema. For example, a collection storing data about people may have a schema that specifies properties for first name, last name, SSN, etc. All schemas are based on [schema prototypes](reference/schema-prototypes). These prototypes define properties that have specific meaning or purposes within Vault, such as the item ID, foreign ID, and creation time. 

### Semantic data types

Vault's unique ability to enable privacy by design for personally identifiable information (PII) comes from its support for semantic PII data types, such as name, social security number (SSN), credit card, phone number, address, etc. Using these types, Vault understands data's semantic meaning and provides specialized, built-in capabilities for each data type. For example, Vault can:

* Verify the format and values for SSN, phone number, addresses, etc.
* Mask credit card numbers to display only the last 4 digits, as most uses don't require complete credit card numbers. See [What is a transformation](/guides/manage-transformations/about-transformations) for more details.
* Limit read access for sensitive information, such as SSN, and allow access only with explicit user approval, such as using a 2FA code sent to their phone. This mechanism can be helpful, for example, when you want to limit support systems or call center operators from gaining full access to people's data.  See [About data access policies](/guides/manage-users-and-policies/about-data-access-policies) for more details.

Each semantic data type has a validator that ensures the value is correctly formatted and can support [transformations](/guides/manage-transformations/about-transformations).

See [Data types](reference/data-types) for a list of the supported data types.

### Metadata cache

The Vault maintains an in memory cached copy of your collection's schema, IAM and other configurations.
Metadata changes are thus eventual consistent as explained in [this section](/guides/write-and-read-personal-data/metadata-cache).
