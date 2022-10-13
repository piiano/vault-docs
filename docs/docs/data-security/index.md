# Data security

## Get zero-trust architecture and security by design.

Vault provides features that let you use personal information while inherently reducing its exposure and risk. Unlike a database, that is typically optimized for data accessibility, Vault is designed to limit access and ensure data is not leaked. It tackles many security threats that have not been fully addressed before, such as SQL injections and broken object level authorization (BOLA) unauthorized access attacks. Therefore, it enables security by design and a zero-trust architecture.

These features include:
* **[Tokenization](/data-security/tokenization)** - to retrieve a non-sensitive token that references data within Vault. 
* **[Transformations](/data-security/transformations)** - to provide reduced-exposure views of the data within Vault.  
* **[Property encryption](/data-security/property-encryption)** - to encrypt the values of sensitive properties, in addition to encryption of Vault data in motion and at rest.  
* **[Identity and access management](/data-security/identity-and-access-management)** - to provide:  
   * **Access control** – to control user access to the API URLs.
   * **Policy management** – to control user access to data.  
* **[Advanced data and access controls](/data-security/advanced-data-and-access-controls)** – to restrict the operations and data available to clients, including customer-controlled access with 2FA, rate limiting, and many more (coming soon 🎁 ).  

You can also find details in this section on [how secrets are handled](/architecture/components#secrets-handling) in Piiano Vault.