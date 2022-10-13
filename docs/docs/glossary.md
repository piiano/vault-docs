---
sidebar_position: 10
sidebar_label: Glossary
sidebar_class_name: divider
---

# Piiano glossary
## This glossary defines common terms that you might see as you're working with Piiano.

### Collection  

Data from an application or system that resides in Vault.

### Person  

Data about an individual stored in a Vault collection.

### Associated data  

Data associated with an object in the same or another collection. Vault support relationships between objects in collections based on PERSONS and DATA schemas. 

### Personal Identifiable Information (PII)  

Data that can be used, alone or in combination, to identify an individual. Examples of PII data include full names, social security numbers, phone numbers, and email addresses. The collection and processing of PII is governed by regulations such as General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).

### PII data types  

Data types specific to PII, such as those for social security numbers, phone numbers, and email addresses.

### Policy  

A mechanism that defines a user's access to the capabilities of or data stored in Vault. For example, to access all properties of a person, a user needs the policy for accessing unsafe REST APIs and CLI commands.

### Property  

The definition of a field in a source system stored in Vault.

### Role   

A configurable set of policies. Roles simplify the management of user access to capabilities and data in Vault by enabling policies to be defined by job function, such as an administrator. Users can hold multiple roles.

### Token  

An identifier that replaces data in the source system to provide additional security for sensitive information. Users with the appropriate policies can use the token to detokenize the original data value.

### Transformation  

A mechanism for reducing the sensitivity of personal data, for example, by returning only the day and month from a date of birth field.
