export default abstract class Dto<EntityType, ObjectType> {
  constructor(protected _entity: EntityType) {}

  get entity() {
    return this._entity;
  }

  abstract toObject(): ObjectType;
}
