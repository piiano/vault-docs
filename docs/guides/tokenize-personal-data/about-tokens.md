---
sidebar_position: 1.4
---

# About tokens

## Learn about personal data tokens.

Tokens enable you to send a non-sensitive reference to a value instead of the actual data. This mechanism is useful in various use-cases, such as: 

* Transferring sensitive information across multiple APIs and systems, and allowing a downstream system to view the data.
* Storing information outside Vault in unsecured systems, where there is no need (or desire) to expose the sensitive information (for example, in logs or an analytics data lake).

Vault [enables clients to get a token for the data](/data-security/tokenization) for these cases. As tokens are a first-class concept within Vault, all of the capabilities of Vault apply to tokens. For example, you can define a data access policy for a PII type (for example, SSN) that controls who can detokenize a token and under what conditions (for example, user-supplied 2FA).

Also, because Vault stores the PII data and provides the tokenization service, it enables unique capabilities that are impossible using stand-alone tokenizations services. These capabilities include tokenizing data **without ever gaining read access to the underlying data**. This feature is useful when you want to limit the number of systems exposed to sensitive information to those who need to view the data.


