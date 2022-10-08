---
sidebar_position: 3
---

# Built-in transformations

## Discover a list of the built-in transformations

Vault provide these built-in transformations: 

| Data type    | Mask name | Specification           | Transformed example   |
|--------------|-----------|-------------------------|-----------------------|
| EMAIL        | mask      | {}                      |                       |
| SSN          | mask      | {}                      |                       |
| BAN          | mask      | {"non_masked_length":4} | `*******7917`         |
| PHONE_NUMBER | mask      | {"non_masked_length":4} | `***-****-2795`       |
| CC_NUMBER    | mask      | {"non_masked_length":4} | `**** **** **** 9573` |
