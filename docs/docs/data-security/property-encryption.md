---
sidebar_position: 3
---

# Property encryption

Data inside Vault is highly secure. Vault employs two industry-standard methods to achieve this:

* TLS to encrypt data in transit between the application and the deployment-option-specific load balancer.
* Data store (file) encryption to secure the data at rest.

Properties can be further protected by encrypting values before saving them in Vault's data store. This additional protection makes property values, the encrypted data, inaccessible through the database, such as if administrator credentials are used to access it directly.

To enable this encryption on a property, indicate that it's encrypted in the [schema](/guides/manage-collections-and-schemas/about-collections). Vault then manages key provisioning and rotation. Searches over these properties are limited to exact matches only.

From the application's view, accessing encrypted properties and handling encryption is fully transparent – Vault encrypts and decrypts the data automatically as it travels to or from the backend database. Technically, data is decrypted at runtime when it is fetched inside Vault.

### Key management service

Vault uses a key management service (KMS) to sign and verify the encryption keys used for property encryption and decryption. You must define an Amazon Web Service (AWS) or Google Cloud Platform (GCP) KMS when implementing Vault in the cloud for property encryption to be secure.

To configure a KMS, set the `PVAULT_KMS_URI` environment variable to the KMS key URI using these patterns:

|   KMS   | KMS identifier prefix | Key URI format                                             |
|:-------:|:----------------------|:-----------------------------------------------------------|
| AWS KMS | `aws-kms://`          | `aws-kms://arn:aws:kms:<region>:<account-id>:key/<key-id>` |
| GCP KMS | `gcp-kms://`          | `gcp-kms://projects/*/locations/*/keyRings/*/cryptoKeys/*` |

Vault must have these permissions to be able to use the KMS:

- Sign keys with the KMS
- Verify keys with the KMS
- Get the KMS public key

These high-level permissions have equivalent policies in AWS and GCP that need to be granted to the AWS or GCP authenticated identity where Vault is running.

:::warning
When Vault is started without an external KMS it uses a built-in hard-coded master encryption key.
This is convenient for development and testing purposes but is insecure and must not be used in a production environment that requires property encryption.
:::

:::info 
The [Vault roadmap](/roadmap) includes support for controlling rotation parameters, queries over encrypted data, bring your own key (BYOK) for multi-tenant applications, and more.
:::
