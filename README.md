# Filer Server Module

[![npm](https://img.shields.io/npm/v/@quiches/front?style=for-the-badge)](https://www.npmjs.com/package/@quiches/back)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/quiches-group/back-js-package/deploy?style=for-the-badge)

## Description




## Documentation

### 1- Installation

Using npm:
````bash
$ npm install @quiches/back --save
````

Using yarn:
````bash
$ yarn add @quiches/back
````

### 2- Examples

**Usage**

The private key is generated on the dashboard at : https://dashboard.quiches.ovh.

```js
import QuichesStack from '@quiches/back';

const PRIVATE_KEY = 'priv_xxxxx';
const quiches = QuichesStack(PRIVATE_KEY);
const auth = quiches.auth;

// or
import { Authentication } from '@quiches/back';

const PRIVATE_KEY = 'priv_xxxxx';
const auth = new Authentication(PUBLIC_KEY);
```


### 3- Authentication
The Authentication class has 3 available methods.

