
import { Entity } from "./Entity";

export interface Entities {
  plural: {
    primaryEntity: Entity;
    secondaryEntity: Entity | null;
  },
  singular: {
    primaryEntity: Entity;
    secondaryEntity: Entity | null;
  } | null;
}