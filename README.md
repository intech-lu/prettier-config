# InTech Prettier Rules

Welcome to the "InTech Prettier Rules" repository, a centralized solution for managing and applying consistent code formatting standards across all projects at InTech. This repository hosts a custom Prettier configuration designed to enforce a unified coding style, helping to ensure readability and reducing formatting discrepancies in collaborative projects.

## 🗂️ Table of Contents

1. [Installation](#⚙️-installation)
    1. [Requirements](#U+1F600-requirements)
    2. [Step 1: install the Prettier extension for VSCode](#1️⃣-step-1-install-the-prettier-extension-for-vscode)
    3. [Step 2: install Prettier and the InTech rules](#2️⃣-step-2-install-prettier-and-the-intech-rules)
    4. [Step 3: create the Prettier configuration](#3️⃣-step-3-create-the-prettier-configuration)
    5. [(Optional) Step 4: manage your plugins](#4️⃣-optional-step-4-manage-your-plugins)
    7. [Step 5: enjoy 🎉](#5️⃣-step-5-enjoy-🎉)
2. [Import sorter configuration recommendations](#💡-import-sorter-configuration-recommendations)

## ⚙️ Installation

Add the Prettier InTech Rules on your existing project.

### 📋 Requirements

- Node.js version >= `v24.18.0`

### 1️⃣ Step 1: install the Prettier extension for VSCode

- <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

Create a `.vscode/settings.json` file with the following configuration at the root of your project:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
}
```

### 2️⃣ Step 2: install Prettier and the InTech rules

Go to the folder of your project and execute the following command:

```bash
npm install -D prettier '@intech.lu/prettier-config'@latest
```

### 3️⃣ Step 3: create the Prettier configuration

At the root of the folder of your project, create an `.prettierrc.mjs` file with the following content:

```js
import intechPrettierConfig from '@intech.lu/prettier-config';

export default intechPrettierConfig;
```

If you need to override the InTech Rules for some reason, simply do it by overriding existing rules in your `.prettierc.mjs`

```js
import intechPrettierConfig from '@intech.lu/prettier-config';

export default {
  ...intechPrettierConfig,
  semi: false, // will switch InTech 'semi' rules from true to false
};
```

⚠️ *NB: You should override the rules after destructuring the InTech Prettier config*

#### Overriding import sorter configuration

The InTech Prettier comes with the `@trivago/prettier-plugin-sort-imports`, a plugin that sorts import declarations based on Regular Expression order.

The default InTech configuration is the following:

```json
importOrder: ['<THIRD_PARTY_MODULES>', '@/(.*)', '^[./]'],
importOrderSeparation: true,
```

Here's an example with our configuration (based on <https://github.com/trivago/prettier-plugin-sort-imports> example):

##### Input

```js
import React, {
    FC,
    useEffect,
    useRef,
    ChangeEvent,
    KeyboardEvent,
} from 'react';
import { logger } from '@/core/logger';
import { reduce, debounce } from 'lodash';
import { Message } from './Message';
import { createServer } from '@/server/node';
import { Alert } from '@/ui/Alert';
import { repeat, filter, add } from './utils';
import { initializeApp } from '@/core/app';
import { Popup } from '@/ui/Popup';
import { createConnection } from '@/server/database';
```

##### Output

```js
import { debounce, reduce } from 'lodash';
import React, {
    ChangeEvent,
    FC,
    KeyboardEvent,
    useEffect,
    useRef,
} from 'react';

import { initializeApp } from '@/core/app';
import { logger } from '@/core/logger';
import { createConnection } from '@/server/database';
import { createServer } from '@/server/node';
import { Alert } from '@/ui/Alert';
import { Popup } from '@/ui/Popup';

import { Message } from './Message';
import { add, filter, repeat } from './utils';
```

To change this order, you'll have to override the importOrder option in your `.prettierrc.mjs` file.

```js
import intechPrettierConfig from '@intech.lu/prettier-config';

export default {
  ...intechPrettierConfig,
  importOrder: [<YOUR_OWN_ORDER>],
};
```

We **strongly** recommend that you keep the `importOrderSeparation` option set to `true` as this improves the readability of your imports.

For more information on how to configure this import sorter, see the [plugin Github page](https://github.com/trivago/prettier-plugin-sort-imports).

### 4️⃣ (Optional) Step 4: manage your plugins

The InTech Prettier comes with the `@trivago/prettier-plugin-sort-imports` plugin by default and we **strongly** recommend that you don't remove it, as it really helps to read your import declarations.

That said, if you still wish to remove it, simply empty the `plugins` option of your `.prettierc.js` file:

```js
import intechPrettierConfig from '@intech.lu/prettier-config';

export default {
  ...intechPrettierConfig,
  plugins: [],
};
```

#### Adding new plugins

To add new prettier plugins, install them in your project, import the `plugins` option from InTech Prettier and override it by merging the InTech plugins with yours.

```js
import intechPrettierConfig from '@intech.lu/prettier-config';

const { plugins } = intechPrettierConfig;

export default {
  ...intechPrettierConfig,
  plugins: [...plugins, '<YOUR_PLUGINS>'],
};
```

For instance, to add the official prettier [plugin-xml](https://github.com/prettier/plugin-xml), install the plugin with:

```cli
npm install --save-dev @prettier/plugin-xml
```

or if you're using yarn:

```cli
yarn add --dev @prettier/plugin-xml
```

Then add this plugins in your `.prettierrc.mjs` file.

```js
import intechPrettierConfig from '@intech.lu/prettier-config';

const { plugins } = intechPrettierConfig;

export default {
  ...intechPrettierConfig,
  plugins: [...plugins, '@prettier/plugin-xml'],
};
```

You can now add the rules from this plugin inside the `.prettierrc.mjs` file.

#### Recommendations

- [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) : This plugin automatically sorts your Tailwind CSS classes based on the recommended order. It is highly recommended to use this plugin if you're using Tailwind CSS in your project.

### 5️⃣ Step 5: enjoy 🎉

You now have the InTech Prettier rules applied automatically to your project.
