# Auto generate SDK for Vault

Piiano Vault supports auto generating an SDK that can be used to integrate with your code base.

The openapi file is available for download in two formats: [JSON](@site/static/assets/openapi.json)
and [YAML](@site/static/assets/openapi.yaml). Use one of these files and an open api generators for 
creating the SDK client. We support any OpenAPI generator compliant with version 3.0.3. For example,  
[OpenAPI Generator](https://openapi-generator.tech) or 
[Swagger Codegen](https://swagger.io/tools/swagger-codegen/).

:bulb: Creating an additional SDK interface on top of the auto generated SDK is on our roadmap.

:::info
While this guide provides examples based on **openapi-generator**, other generators 
may be more suitable for your use case. Selecting a generator and its configuration is a matter of preference and other implications that are out of scope for this guide.
:::

### Install OpenAPI Generator
#### Using Homebrew
For MacOS with homebrew:
```bash
brew install openapi-generator
```

#### Using npm
```bash
npm install @openapitools/openapi-generator-cli -g
```

#### Using OpenAPI Generator's Docker Image
If you prefer using Docker without any installation:
```bash
docker run openapitools/openapi-generator-cli
```

### Using the OpenAPI Generator
#### List the Available Programming Languages
Most common programming languages are supported by the generator. Verify that your 
language is supported by the generator by finding it in the list of available languages 
under the 'CLIENT generators' section:
```bash
openapi-generator list
```

#### Generate the client
Use the command `generate` with these arguments:
1. Specify the input file path using the flag `-i`
2. Specify the desired language using the flag `-g`
3. Specify the output directory using the flag `-o`. 
```bash
openapi-generator generate -i <openapi-file> -g <desired-language> -o <output-directory>
```

Examples:

##### Generate Python Client
```bash
openapi-generator generate -i openapi.yaml -g python -o python-sdk/
```

##### Generate Java Client
```bash
openapi-generator generate -i openapi.yaml -g java -o java-sdk/
```

##### Generate Go Client
```bash
openapi-generator generate -i openapi.yaml -g go -o go-sdk/
```

##### Generate Node JS Client
```bash
openapi-generator generate -i openapi.yaml -g javascript -o js-sdk/
```
