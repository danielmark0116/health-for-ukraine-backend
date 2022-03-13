## Validation

We can validate in two ways:

- [ ] with `validators` created in `/validators`, use middleware composing thingy from express
- [ ] with `typeorm subscribers` if there is no need to validate before accessing any kind of controller, e.g. we create a new instance of given entity inside some controller itself, as side effectk
