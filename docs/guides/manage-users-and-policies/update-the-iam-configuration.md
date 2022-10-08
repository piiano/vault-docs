---
sidebar_position: 2.2
---

# Update the IAM configuration

## Learn how to update the IAM configuration.

The identity and access management (IAM) settings in Vault are defined in a file in TOML format. When you wish to make changes to the IAM users, roles, and policies, you modify and save a copy of the IAM configuration file. This guide explains how to get and save the file. Other guides in this section provide information on modifying the content of the file.

To update the IAM configuration you use the REST API [Get IAM configuration](/api/operations/get-iam-conf) and [Set IAM configuration](/api/operations/set-iam-conf) operations like this:

1. Get the IAM configuration
   Use the Get IAM configuration CLI  command to get the IAM configuration as a string in the TOML format and store it in a file, like this:
   ```
   pvault iam get > iam.toml
   ```
   In this example, the save file is called `iam.toml`.
2. Edit the TOML file. 
   Check out the other guides in the section to learn how to implement some common identity and access management use cases.
3. Apply the updated IAM configuration
   Apply the updated configuration using the Set IAM configuration CLI command, like this:
   ```
   pvault iam apply --conf=@iam.toml
   ```
4. Verify that the change has been applied
   Optionally, read back the updated configuration using the CLI, like this:
   ```
   pvault iam get
   ```
   and verify that the configuration that is displayed in stdout is the correct, updated configuration.
    

:::note 

- Any changes made to the IAM configuration after step 1 and before step 3 will be overwritten by step 3.
- The examples provided in this guide use CLI flags to read data from files. This avoids quoting large text segments in the example CLI commands. However, if you’re running the CLI in Docker, you cannot refer to files on the host. You can append the file content to the command in single quotes. For instance, the command:
    
    ```bash
    pvault object add --collection=employees --fields=@object.json
    ``` 
    
    where `object.json` is the name of a file, can be specified like this:
    
    ```bash
    pvault object add --collection=employees --fields='{
      "email": "john@thecompany.com",
      "age": 45
    }'
    ```
    
    where the string in single quotes is the content of the `object.json` file.
