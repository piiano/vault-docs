---
sidebar_position: 2
---

# About audit logs

## Learn how Piiano Vault collects audit logs.

Vault always logs all requests to access and change data. This enables comprehensive auditing to be performed, if needed.

All operations are logged in a JSON format, and you decide where to stream these logs (for example, to S3, Splunk, ElasticSearch, etc.). The logs do not contain sensitive data. They only contain metadata and references (tokens) to the accessed data.

This is an example of a typical audit log entry:

```json
{
    "URL": "/api/pvlt/1.0/ctl/collections/customer/properties",
    "available_caps": [
        "CapSystem"
    ],
    "collection": "customer",
    "iam_signature": "1e8466fe8d6ec0b05ee20cfceef255f2959e2c18371a2ca184540983e9a7feee48ec53add15936cf2f0ccd8ec3ce09a277442e0309b6d7e75657338c0a15b3f4",
    "level": "info",
    "message": "Audit",
    "method": "GET",
    "reason": "",
    "reason_other": "",
    "required_caps": [
        "CapCollectionsReader"
    ],
    "role_name": "Admin",
    "server_trace_id": "ebc3c906-8320-481a-b37b-79155e10181e",
    "service": "pvault-dev",
    "status": 200,
    "time": 1655041514671,
    "user_name": "Admin",
    "vault_id": "58899390522593280",
    "vault_name": "vault",
    "version": "0.6.1-dev.1-g477357a7"
}
```
