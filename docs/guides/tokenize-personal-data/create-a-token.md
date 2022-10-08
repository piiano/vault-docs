---
sidebar_position: 2
---

# Create a token

## Learn how to create a token in Piiano Vault.

To conceal data, you tokenize data stored in an object in a Vault collection. Piiano Vault supports various options for creating a token, and this guide describes some of the most common uses.

### Create tokens that return the latest values

#### Overview

A pointer token is a token that returns the latest information from a person object. To create a pointer token you:

1. Determine the object and its property values you want the tokenize, along with any special requirements for token lifetime, etc.
2. Use the:
   - [CLI create tokens](/cli/reference#create-tokens) command setting the `--type` flag to `POINTER`.
   - [REST API tokenize](/api/operations/tokenize) operation setting the `type` property to `POINTER`.

#### Step-by-step

You want to create a pointer token for the name of a person in the `buyers` collection you created in [Create a collection](../manage-collections-and-schemas/create-a-collection). To do this:

1. Determine the ID of the person.
2. Create the pointer token using the CLI like this:

   ```bash
   pvault token create --collection buyers -object-id cc9a39c5-4734-4786-b317-e16705d5128f --props name --type POINTER
   ```

   You get a response similar to this:

   ```text
   +--------------------------------------+
   |               token_id               |
   +--------------------------------------+
   | d27923c6-5d16-41e3-89ee-118b05a25372 |
   +--------------------------------------+
```

   Or using the REST API like this:

   ```bash
   curl -X POST \
        -H 'Authorization: Bearer pvaultauth' \
        -H 'Content-Type: application/json' \
        -d '{ "type" : "pointer", "object_ids": ["cc9a39c5-4734-4786-b317-e16705d5128f"], "props" :    ["name"] }' \
       'http://localhost:8123/api/pvlt/1.0/data/collections/persons/tokens?reason=AppFunctionality'
   ```

   You get a response similar to this:

   ```json
   [{"token_id":"d27923c6-5d16-41e3-89ee-118b05a25372"}]
   ```

If you repeat this process with `--props email`, you receive a token for the email. However, if you were to request `--props first_name,email` you get one token for both pieces of information. 

### Create tokens that stores values

#### Overview

A value token is a token that represents an object’s property value as it was when the token was created. 

To create a value token you:

1. Determine the object and its property value you want the tokenize, along with any special requirements for token lifetime, etc.
2. Use the:
   - [CLI create tokens](/cli/reference#create-tokens) command, setting the `--type` flag to `VALUE`.
   - [REST API tokenize](/api/operations/tokenize) operation, settingthe `type` property to `VALUE`.

#### Step-by-step

You create a log of transactions made by buyers and want to store the buyers’ credit card details on each log record and tokenized these details to keep them private. As buyers’ credit card details may change, you use a value token to tokenize credit card details used for the transaction.

To do this:

1. Determine the ID of the buyers making the transaction.
2. Create a value token of the credit card details using the CLI like this:

   ```bash
   pvault token create --collection buyers -object-id 33cb450d-67ac-4fd2-9c6d-273d037c2edb --props    credit_card_no --type VALUE
   ```

   You get a response similar to this:

   ```text
   +--------------------------------------+
   |               token_id               |
   +--------------------------------------+
   | d27923c6-5d16-41e3-89ee-118b05a25372 |
   +--------------------------------------+
   ```

   Or using the REST API like this:

   ```bash
   curl -X POST \
        -H 'Authorization: Bearer pvaultauth' \
        -H 'Content-Type: application/json' \
        -d '{ "type" : "value", "object_ids": ["33cb450d-67ac-4fd2-9c6d-273d037c2edb"], "props" : ["credit_card_no"] }' \
       'http://localhost:8123/api/pvlt/1.0/data/collections/buyers/tokens?reason=AppFunctionality'
   ```

   You get a response similar to this:

   ```json
   [{"token_id":"d27923c6-5d16-41e3-89ee-118b05a25372"}]
   ```

Now, you save this token ID onto the transaction log, and, even if the buyer updates their credit card number, the token resolves to the credit card number used when the transaction was made.

### Reuse a token

#### Overview

By default you get a new token for each tokenization request. However, you can request that tokenization reuses a token ID where the value being tokenized is the same. This can be useful where you want to:

1.  minimize the number of tokens generated
2.  confirm whether two values are identical without exposing the underlying value.

To reuse a token:

1. Determine the object and its property value you want the tokenize, along with any special requirements for token lifetime, etc.
2. Use the:
   - [CLI create tokens](/cli/reference#create-tokens) command, setting the `--reusable-token-id` flag to `true`.
   - [REST API tokenize](/api/operations/tokenize) operation, setting the `reuse_token_id` property to `true`.

#### Step-by-step

You create a log of transactions made by buyers and want to store the buyers’ credit card details on each log record and tokenized these details to keep them private. As buyers’ credit card details may change, you use a value token to tokenized the credit card details used for the transaction. However, you also want to ensure that all transactions using the same credit card are identifiable, so you tokenize the credit card details as reusable tokens.

Do this:

1. Determine the ID of the buyers making the transaction.
2. Create a reusable value token of the credit card details using the CLI like this:
    
    ```bash
    pvault token create --collection buyers -object-id 32077c80-3792-4a45-a957-e365bb1c9533 --props credit_card_no --type VALUE --reusable-token-id
    ```
    
    You get a response similar to this:
    
    ```text
    +--------------------------------------+
    |               token_id               |
    +--------------------------------------+
    | d27923c6-5d16-41e3-89ee-118b05a25372 |
    +--------------------------------------+
    ```
    
    Or using the REST API like this:
    
    ```bash
    curl -X POST \
         -H 'Authorization: Bearer pvaultauth' \
         -H 'Content-Type: application/json' \
         -d '{ "type" : "value", "object_ids": ["32077c80-3792-4a45-a957-e365bb1c9533"], "props" : ["credit_card_no"], "reuse_token_id": true}' \
        'http://localhost:8123/api/pvlt/1.0/data/collections/buyersd/tokens?reason=AppFunctionality'
    ```
    
    You get a response similar to this:
    
    ```json
    [{"token_id":"d27923c6-5d16-41e3-89ee-118b05a25372"}]
    ```
    
3. Now, you save this token ID onto the transaction log, and, even if the buyer updates their credit card number, the token resolves to the credit card number used when the transaction was made.
4. Repeat the process when creating the next transaction log for the buyer, and if their credit card number hasn't changed you will be returned the token ID `d27923c6-5d16-41e3-89ee-118b05a25372`. 

### Create format preserving tokens

#### Overview

The ID of a token is, by default, a UUID. However, you can choose the format of the token ID. A token with a specific ID format is a format-preserving token. Such tokens are useful where you expect the tokenized data to pass through systems that validate the format of data values. By using a format-preserving token you can ensure that the data passes validation. 

Format preserving tokens are generated using a template that may use one or more seed properties. For example, the ID for a token that preserves the primary account number (credit card number) is created from a seed primary account number by preserving the seed's first six and last four digits and randomizing the remaining digits. 

For example, take a buyer with a credit card with the number `1234567890123456`. Passing this number as the seed to the format preserving token might result in a token ID of `1234565234903456`.

However, the seed doesn't have to be the primary account number being tokenized. For example, if the buyer's record includes two credit card numbers: 

- `cc1` with the number `1234567890123456`
- `cc2` with the number `6543210987654321`

You can tokenize `cc1` using `cc2` as the seed, resulting in a token ID similar to `6543215740894321` that, when detokenized, returns `1234567890123456`.

To create a format preserving token:

1. Determine the object and its property value you want the tokenized.
2. Determine the format-preserving template you want to use, along with any special requirements for token lifetime, etc.
3. Use the:
   - [CLI create tokens](/cli/reference#create-tokens) command, setting `--fptemplate` to the name of the template you want to use and `--fpprops`  to the properties to seed the token ID.
   - [REST API tokenize](/api/operations/tokenize) operation, setting `fptemplate` to the name of the template you want to use and `fpprops` to the properties to seed the token ID.

#### Step-by-step

You create a log of transactions made by buyers and want to store the buyers’ credit card details on each log record and tokenized these details to keep them private. You want to make details of the log available for audit purposes but are aware that your auditors load into their system and that system validates that the record has a valid credit card number. So to ensure that the records validate correctly you create a format preserving token by applying the `primary_account_number` template to the credit card number.

To do this:

1. Determine the ID of the buyers making the transaction.
2. Create a format preserving value token of the credit card details using the CLI like this:
    
    ```bash
    pvault token create --collection buyers -object-id 32077c80-3792-4a45-a957-e365bb1c9533 --props credit_card_no --type VALUE  --fptemplate primary_account_number --fpprops credit_card_no
    ```
    
    You get a response similar to this:
    
    ```text
    +------------------+
    |     token_id     |
    +------------------+
    | 4012882413281881 |
    +------------------+
    ```
    
    Or using the REST API like this:
    
    ```bash
    curl -X POST \
         -H 'Authorization: Bearer pvaultauth' \
         -H 'Content-Type: application/json' \
         -d '{ "type" : "value", "object_ids": ["32077c80-3792-4a45-a957-e365bb1c9533"], "props" : ["credit_card_no"], "fptemplate":"primary_account_number","fpprops":["credit_card_no"] }' \
        'http://localhost:8123/api/pvlt/1.0/data/collections/buyers/tokens?reason=AppFunctionality'
    ```
    
    You get a response similar to this:
    
    ```json
    [{"token_id":"4012886715241881"}]
    ```
    
3. Now, you save this token ID onto the transaction log.
4. When you make the transaction log available to order it and they loaded into the system, or the records past validation because they include a valid but anonymized credit card number.

:::note
The credit card number returned for the format-preserving token is generated at random. It is therefore possible that it may represent a live credit card number.
:::

### Create details for statistical analysis

#### Overview

Generally, you create a token so that the tokenized information can be recovered. However, there is an option to create tokens that cannot be reversed. These tokens can be useful when you want to, for example, make anonymized data available for statistical analysis.

To create a non-reversible token:

1. Determine the object and its property value you want the tokenized.
2. Determine any special requirements for token lifetime, etc.
3. Use the:
   - [CLI create tokens](/cli/reference#create-tokens) command, setting the `--non-reversible` flag
   - [REST API tokenize](/api/operations/tokenize) operation, setting the `reversible` property to `true`.

#### Step-by-step

You create a log of transactions that way you make available to your data scientists for analysis. You want to be able to identify the credit card used to make each transaction I'm sure that this information can never be the original credit card number can never be recovered. Therefore, when you store the buyers’ credit card details on each log record you tokenize the credit card details as a non-reversible, reusable value token.

Do this:

1. Determine the ID of the buyers making the transaction.
2. Create a non-reversible, reusable value token of the credit card details using the CLI like this:
    
    ```basd
    pvault token create --collection buyers -object-id 32077c80-3792-4a45-a957-e365bb1c9533 --props credit_card_no --type VALUE --reusable-token-id --non-reversible
    ```
    
    You get a response similar to this:
    
    ```text
    +--------------------------------------+
    |               token_id               |
    +--------------------------------------+
    | d27923c6-5d16-41e3-89ee-118b05a25372 |
    +--------------------------------------+
    ```
    
    Or using the REST API like this:
    
    ```bash
    curl -X POST \
         -H 'Authorization: Bearer pvaultauth' \
         -H 'Content-Type: application/json' \
         -d '{ "type" : "value", "object_ids": ["32077c80-3792-4a45-a957-e365bb1c9533"], "props" : ["credit_card_no"], "scope": "default", "reuse_token_id": true, "reversible": false }' \
        'http://localhost:8123/api/pvlt/1.0/data/collections/buyersd/tokens?reason=AppFunctionality'
    ```
    
    You get a response similar to this:
    
    ```json
    [{"token_id":"d27923c6-5d16-41e3-89ee-118b05a25372"}]
    ```
    
3. Now, you save this token ID onto the transaction log.
4. When your data scientists receive the transaction log, they see unique numbers for each of the credit card numbers used on transactions but cannot reverse the token and obtain the original credit card number. 
