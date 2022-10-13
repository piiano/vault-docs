---
sidebar_position: 1
sidebar_title: PCI DSS compliance
---

# Payment Card Industry Data Security Standard (PCI DSS) compliance guidelines

## Prepare your deployment of Vault for PCI DSS compliance

### Deploying Vault

In addition to using the recommended deployment methods, such as Terraform, it is important to follow these best practices:

* Deploy Vault and its backend database, for example, RDS, in a dedicated virtual private cloud (VPC).
* Vault's VPC should not be internet-facing. However, if it has to be, make sure only trusted addresses can access it by using an allowlist.
* Follow best practices in securing your cloud account, specifically:
  * Each user should have an IAM account. IAM accounts should not be shared between users.
  * Require multi-factor authentication (MFA) for all users.
* Configure a KMS. For example, AWS KMS.
* Use appropriate logging and audit logging mechanisms for your system, including Vault.
* Separate your production environment from your testing or staging environments. The deployments should be in different accounts or, at least, different VPCs.
* Never load production data into a Vault used for testing. Instead, use test data for testing.
* Run the [quick validation for a working Vault](/cli/Reference#quick-validation-for-a-working-vault) to ensure Vault is set up and working correctly.

### Configuring Vault for production use

Vault is production-ready. However, for PCI DSS compliance, follow these guidelines:

* Ensure that no test collections or data are present in your production Vault.
* [Switch dev-mode off](/guides/configure/environment-variables#production-and-development-mode).
* [Set the admin's API key to a non-default value](/guides/manage-users-and-policies/set-admin-api-key).
* [Monitor](/guides/monitor/) your Vault instance's logs and audit logs.
* [Configure TLS](/guides/configure/tls) for encryption of data in transit.

### PII types

Vault includes PII types that help you comply with PCI DSS requirements. These types include:
* BAN - bank account number
* CC_NUMBER - credit card number
* CC_EXPIRATION_STRING - credit card expiration month and year in the format MM/YYYY
* CC_HOLDER_NAME - credit card holder name
* CC_CVV - credit card verification value
* US_BANK_ROUTING - US bank routing code
* US_BANK_ACCOUNT_NUMBER - US bank account number

See the [Data types](/guides/manage-collections-and-schemas/reference/data-types#financial-information-types) reference for more details.

Use of these semantic types is highly recommended. They include built-in features, such as masking, that save you time and ensure your compliance when implementing PCI DSS requirements.

You can also add PII types. (coming soon :gift:)

### Encryption

Vault encrypts all properties by default. It is possible to define some properties as unencrypted. However, the PCI DSS requires that PANs be encrypted at rest and in transit. Therefore, it is recommended that you encrypt all properties holding sensitive financial data using Vault's encryption mechanism.

### Key storage

Vault supports local key storage. However, in a production cloud deployment, it is recommended that you configure Vault to use the cloud's KMS. For example, AWS KMS or GCP Cloud Key Management. 

### Masking

An advantage of using Vault's PII types is that they support masks and transformations. For instance, you can use `BAN.mask` or `CC_NUMBER.mask` to receive a bank account or credit card number with all the digits masked except for the last 4. For example, ************2795.

Some PCI DSS requirements mandate that the full primary account number (PAN) should never be rendered on client machines. Using a mask, this requirement can be easily met. For example, assume a PAN is held in the property `cc_number`, you can limit access by granting your application read permissions to `cc_number.mask` only. Then, your application gets a PAN where only the last 4 digits of the number are readable.

### Tokenization

The PCI DSS requires that PANs are rendered unreadable in all places where they are stored. Vault tokenization provides for this requirement. Using Vault, you can create a token that represents sensitive PII data, use that token in calculations, and safely store it outside Vault. 

Also, for some financial data use cases, masked values are not sufficient. For example, if you want to count the number of transactions that used a specific credit card, referring to the masked card number does not work.

Note that Vault tokens can refer to particular data items, not just records. For example, a token can refer to a bank account number several people share. The record for each person using this bank account can therefore contain the same token. 

See [Tokenize personal data](/guides/tokenize-personal-data/) to learn how to tokenize your data.

As with other entities in Vault, users can be granted access to tokenized data only or specific tokens.

Where you need to store PII data in an application's database or refer to PII data outside Vault, it is highly recommended that you use only tokenized data. 

### IAM and data access policies

The PCI DSS includes several requirements for data access policies, all of which are supported by Vault.

These recommendations can help you configure Vault to comply with these requirements. See [Manage users and policies](/guides/manage-users-and-policies/) to learn how to implement them.

* Create separate users for each of your applications, so each has a different API key.
* Each application's user account should have its own role, with access limited to the collections it uses.
* Applications should not have read access to sensitive data. Instead, provide access to only tokenized or masked versions. Specifically, only grant read access to masked or tokenized PANs (credit card numbers).
* Every person with access to Vault should have a user account and API key. User accounts and API keys should not be shared between different people. However, users can have similar roles. Roles should be used to limit access to the minimal set of entities the user needs for their business use case. Note that Vault policies and positions are deny-all by default; as such, you only need to add allow access to the entities required by the user.
* Technical administrators should not have access to PII data. They should only be able to access the control operations in the REST API and CLI.
* Revoke peoples' access immediately upon departure or termination by removing their user from the IAM configuration.

### Audit log configuration

Vault supports creating and tracking an audit log. The PCI DSS requires that you keep an audit log of actions made on cardholder data. Vault's audit log will NEVER include sensitive PII data, so depending on Vault's audit log capabilities ensures that no PAN data appears in your audit logs.

Vault's audit log entries always include: 
* The user account that took the action
* The type of the action or event
* Timestamp
* Success or failure
* Reason for action, as provided in the CLI or API.

It is recommended that you store all audit logs generated by Vault appropriately. In addition to depending on Vault's logs, you should also log access to the audit logs and make sure they are unalterable and backed up. Note that you should retain the audit log for at least a year, with the most recent 3 months available for immediate search and review. 

