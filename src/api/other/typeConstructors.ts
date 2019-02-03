import * as Entities from '../entities';

const typeConstructors = Object.keys(Entities)
  .reduce((types, key) => {
    const entities = <any>Entities;
    if(entities[key].$Type){
      (<any>types)[entities[key].$Type.value] = entities[key];
    }

    return types;
}, {});

export default typeConstructors;
