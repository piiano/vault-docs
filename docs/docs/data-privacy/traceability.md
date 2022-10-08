---
sidebar_position: 1
---

# Traceability

Vault is designed for data privacy, and traceability is embedded. Traceability is specifying a reason—a "purpose" in privacy terminology—whenever data is accessed. That reason is recorded as part of the [audit logs](/guides/monitor/about-audit-logs) retained by Vault.

Moreover, the [policy management](/data-security/identity-and-access-management#policy-management) engine uses the reason to control access to data.

Vault includes 9 built-in reasons:

* `AppFunctionality`
* `Analytics`
* `Notifications`
* `Marketing`
* `ThirdPartyMarketing`
* `FraudPreventionSecurityAndCompliance`
* `AccountManagement`
* `Maintenance`
* `DataSubjectRequest`
* `Other` when a different ad-hoc reason is specified

For example, this [Get an object](/cli/reference#get-an-object) CLI call uses the `FraudPreventionSecurityAndCompliance` reason to record the request for all of an object's details:

```bash
pvault object get \
  --collection=customers \
  --id=b86718a3-f4a7-4e40-bb59-681f22b62649 \
  --all-unsafe \
  --reason=FraudPreventionSecurityAndCompliance
```
