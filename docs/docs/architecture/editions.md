---
sidebar_position: 4
sidebar_label: Compare Piiano Vault editions
title: Compare Piiano Vault editions
---

# Compare Piiano Vault editions
Vault is self-hosted within your own environment. Your data, in your control, performant and secure. Piiano cannot access your data.

There is no charge for using Vault for **non-production** activities.

Vault is a container-based software solution that can be deployed anywhere, from public clouds to on-prem. For example, Vault can be deployed on native Docker, Docker Compose, Kubernetes, Google Cloud Platform CloudRun, and AWS Elastic Container Service. [Talk to us](https://piiano.com/contact-us/) about your deployment needs.

Vault uses Postgres as its main backend store, and the cloud provider encryption service (KMS) for encryption. Specific features may use additional cloud-native or public cloud infrastructure such as object storage. Support for public cloud starts with AWS, Google Cloud Platform, and Azure.

Vault comes in these editions, for various environments and purposes:

| Edition           | Use cases                                                                            | Environment                                                                                                               | For production environments |
| ----------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **Vault Dev**     | 1) Local development<br/>2) Testing<br/>3) CI/CD                                     | One container running Vault with an embedded database                                                                     | :x:                         |
| **Vault Server**  | 1) Serverless<br/>2) When tightly integrated with your infrastructure<br/>3) On-prem | One container running Vault, working with an external database<br/>You can run multiple instances of the container        | :white_check_mark:          |
| **Vault ServerX** | For maximum scalability and when network segregation is required                     | Multiple containers running Vault, working with an external database<br/>You can run multiple instances of each container | :white_check_mark:          |
