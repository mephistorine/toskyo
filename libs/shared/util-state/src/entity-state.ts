import {RxState} from "@rx-angular/state"
import {map, Observable} from "rxjs"

export type EntityState<T> = {
  entities: Record<string, T>
  ids: string[]
}

type EntityPatch<T> = {
  id: string
  changes: Partial<T>
}

type IdSelector<T> = (entity: T) => string

type Comparer<T> = (a: T, b: T) => number

const DEFAULT_COMPARER: Comparer<unknown> = () => 0

const DEFAULT_ID_SELECTOR: IdSelector<unknown> = (entity: unknown) => {
  if (
    typeof entity === "object" &&
    entity !== null &&
    Reflect.has(entity, "id")
  ) {
    return Reflect.get(entity, "id")
  }

  throw new Error(`Entity must has field "id" or specify \`selectId\` func`)
}

export class EntityStateController<T> {
  constructor(
    protected readonly state: RxState<EntityState<T>>,
    private readonly sortComparer: Comparer<T> = DEFAULT_COMPARER,
    private readonly selectId: IdSelector<T> = DEFAULT_ID_SELECTOR
  ) {}

  public insert(entity: T): void {
    return this.insertMany([entity])
  }

  public insertMany(entities: readonly T[]): void {
    this.state.set((state) => {
      const nextState = structuredClone(state)
      for (const entity of entities) {
        const id = this.selectId(entity)
        nextState.entities[id] = entity
      }

      nextState.ids = nextState.ids
        .concat(entities.map((e) => this.selectId(e)))
        .sort(this.createIdSortComparer(nextState.entities))
      return nextState
    })
  }

  public patch(entityPatch: EntityPatch<T>): void {
    return this.patchMany([entityPatch])
  }

  public patchMany(entityPatches: readonly EntityPatch<T>[]): void {
    this.state.set((state) => {
      const nextState = structuredClone(state)
      for (const entityPatch of entityPatches) {
        nextState.entities[entityPatch.id] = {
          ...nextState.entities[entityPatch.id],
          ...entityPatch.changes
        }
      }
      nextState.ids.sort(this.createIdSortComparer(nextState.entities))
      return nextState
    })
  }

  public delete(id: string): void {
    return this.deleteMany([id])
  }

  public deleteMany(ids: readonly string[]): void {
    this.state.set((state) => {
      const nextState = structuredClone(state)

      for (const id of ids) {
        Reflect.deleteProperty(nextState.entities, id)
      }

      nextState.ids = Object.keys(nextState.entities).sort(
        this.createIdSortComparer(nextState.entities)
      )

      return nextState
    })
  }

  public clear(): void {
    this.state.set((state) => {
      const nextState = structuredClone(state)
      nextState.entities = {}
      nextState.ids = []
      return nextState
    })
  }

  public selectIds(): Observable<readonly string[]> {
    return this.state
      .select("ids")
      .pipe(map((entities) => structuredClone(entities)))
  }

  public selectEntities(): Observable<Readonly<Record<string, T>>> {
    return this.state
      .select("entities")
      .pipe(map((entities) => structuredClone(entities)))
  }

  public selectAll(): Observable<readonly T[]> {
    return this.state
      .select("entities")
      .pipe(map((entities) => structuredClone(Object.values(entities))))
  }

  private createIdSortComparer(
    entities: Record<string, T>
  ): (a: string, b: string) => number {
    return (a, b) => this.sortComparer(entities[a], entities[b])
  }
}
