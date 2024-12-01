# Convention for naming

## React

### React Component name

CamelCase

examples: `App`, `CommonInput`

### React Component internal const

lowerCamelCase

#### React Component internal boolean const

`is` + CamelCase

examples: `isLoading`, `isInvalid`

#### React Component external handler function

`on` + CamelCase

examples: `onClick`, `onClose`

#### React Component internal handler function

`handle` + CamelCase

examples: `handleClick`, `handleOpen`

### React Hook

`use` + CamelCase

examples: `useStore`, `useInject`

## Route

kebab-case

examples: `/doctor/report-templates`, `/patient/waiting-room`

## Service

lowerCamelCase

### service getter

type + `Get` + entity name + (optional) `By` + key name

examples: `apiLogGetImageDetailsById`, `apiOrganizationGetData`

### service setter

type + `Set` + entity name + (optional) `By` + key name

examples: `apiOrganizationSetDoctorInCallQueue`, `apiTwoFactorSetSMS`

### service remover

type + `Remove` + entity name + `By` + key name

examples: `apiOrganizationRemoveDoctorById`

## Store

lowerCamelCase

### store name

CamelCase + `Store`

examples: `DoctorStore`, `commonProfileStore`

### store custom type

CameCase + `Item`

examples: `ConsumerItem`, `SubscriptionItem`

### store model boolean keys

`is` + CamelCase

examples: `isLoading`, `isCanNextPage`

### store model action

`get` + CamelCase for getters

`get` + CamelCase + `List` for multiple items getters

`get` + CamelCase + `ById` for getters with key

`set` + CamelCase for setters

`set` + CamelCase + `ById`for setters with key

`remove` + CamelCase for removers

`remove` + CamelCase + `ById` for removers with key

examples: `getConsumersList`, `setLoading`, `removeItem`, `removeItemById`

## Typescript

### Enum

`E` + CamelCase

_note: set the name as a single value, not as multiple values!_

bad example: ~~`ERoles`~~, ~~`EAthenaPriorities`~~

good examples: `ERole`, `EAthenaPriority`

### Interface

`I` + CameCase

examples: `IAPIResponse`, `IComponent`

### Type

`T` + CameCase

examples: `TAPISearchParams`
