# DentISt - Dentist Managment

## Getting started

### Install

1. `yarn` - install necessary dependencies

### Developing enviroment
You can start local:
1. `yarn start` - starts at port 3000

Or you can dockerize app:
1. `yarn docker:build` - build React App from Docker image
1. `yarn docker:start` - starts at port 4000

### Production enviroment
1. `yarn build` - starts at port 5000


## Code Guidelines

1. Branch from **develop**, name your new branch feature or ticket name related. Upon finishing the feature create MR to develop.
2. Organize folder structure in the following way

```
    -> Component
        -> Component
        -> Component
            -> Component.js
            -> Component.module.css

```

3. Import defaults as you name them

```js
//Do
import MenuHeader from "./MenuHeader/MenuHeader";

//Don't
import H from "./MenuHeader/MenuHeader";
import Header from "./MenuHeader/MenuHeader";
```

4. Import styles in the following way

```js
import styles from "./Component.module.css";
```

5. Combine classes using classnames, import in the following way

```js
import cn from "classnames";
```

6. Name your classes and ids in the following way

```css
.class-name {
    ...
```

7. Organize imports. First import modules, utility functions, other components, than styles

```js
    import React from 'react'
    import cn from 'classnames'

    import { helperFunction } from '@/util/helper'

    import Component1 from '@/components/Component1/Component1'
    import Component2 from '@/components/Component2/Component2'

    import styles from './Component.module.css'

    const Component = props => {
        ....
```

8. Please do not have files (dummy, test, ...) in your MRs. Make your work readable to others and your future self.
