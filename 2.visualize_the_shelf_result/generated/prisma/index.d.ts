
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Inventory
 * 
 */
export type Inventory = $Result.DefaultSelection<Prisma.$InventoryPayload>
/**
 * Model InventoryPlacement
 * 
 */
export type InventoryPlacement = $Result.DefaultSelection<Prisma.$InventoryPlacementPayload>
/**
 * Model optimization_runs
 * 
 */
export type optimization_runs = $Result.DefaultSelection<Prisma.$optimization_runsPayload>
/**
 * Model shelves
 * 
 */
export type shelves = $Result.DefaultSelection<Prisma.$shelvesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Inventories
 * const inventories = await prisma.inventory.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Inventories
   * const inventories = await prisma.inventory.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.inventory`: Exposes CRUD operations for the **Inventory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inventories
    * const inventories = await prisma.inventory.findMany()
    * ```
    */
  get inventory(): Prisma.InventoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inventoryPlacement`: Exposes CRUD operations for the **InventoryPlacement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InventoryPlacements
    * const inventoryPlacements = await prisma.inventoryPlacement.findMany()
    * ```
    */
  get inventoryPlacement(): Prisma.InventoryPlacementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.optimization_runs`: Exposes CRUD operations for the **optimization_runs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Optimization_runs
    * const optimization_runs = await prisma.optimization_runs.findMany()
    * ```
    */
  get optimization_runs(): Prisma.optimization_runsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shelves`: Exposes CRUD operations for the **shelves** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shelves
    * const shelves = await prisma.shelves.findMany()
    * ```
    */
  get shelves(): Prisma.shelvesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Inventory: 'Inventory',
    InventoryPlacement: 'InventoryPlacement',
    optimization_runs: 'optimization_runs',
    shelves: 'shelves'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "inventory" | "inventoryPlacement" | "optimization_runs" | "shelves"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Inventory: {
        payload: Prisma.$InventoryPayload<ExtArgs>
        fields: Prisma.InventoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InventoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InventoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>
          }
          findFirst: {
            args: Prisma.InventoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InventoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>
          }
          findMany: {
            args: Prisma.InventoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>[]
          }
          create: {
            args: Prisma.InventoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>
          }
          createMany: {
            args: Prisma.InventoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InventoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>[]
          }
          delete: {
            args: Prisma.InventoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>
          }
          update: {
            args: Prisma.InventoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>
          }
          deleteMany: {
            args: Prisma.InventoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InventoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InventoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>[]
          }
          upsert: {
            args: Prisma.InventoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPayload>
          }
          aggregate: {
            args: Prisma.InventoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventory>
          }
          groupBy: {
            args: Prisma.InventoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.InventoryCountArgs<ExtArgs>
            result: $Utils.Optional<InventoryCountAggregateOutputType> | number
          }
        }
      }
      InventoryPlacement: {
        payload: Prisma.$InventoryPlacementPayload<ExtArgs>
        fields: Prisma.InventoryPlacementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InventoryPlacementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InventoryPlacementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>
          }
          findFirst: {
            args: Prisma.InventoryPlacementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InventoryPlacementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>
          }
          findMany: {
            args: Prisma.InventoryPlacementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>[]
          }
          create: {
            args: Prisma.InventoryPlacementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>
          }
          createMany: {
            args: Prisma.InventoryPlacementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InventoryPlacementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>[]
          }
          delete: {
            args: Prisma.InventoryPlacementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>
          }
          update: {
            args: Prisma.InventoryPlacementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>
          }
          deleteMany: {
            args: Prisma.InventoryPlacementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InventoryPlacementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InventoryPlacementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>[]
          }
          upsert: {
            args: Prisma.InventoryPlacementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InventoryPlacementPayload>
          }
          aggregate: {
            args: Prisma.InventoryPlacementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventoryPlacement>
          }
          groupBy: {
            args: Prisma.InventoryPlacementGroupByArgs<ExtArgs>
            result: $Utils.Optional<InventoryPlacementGroupByOutputType>[]
          }
          count: {
            args: Prisma.InventoryPlacementCountArgs<ExtArgs>
            result: $Utils.Optional<InventoryPlacementCountAggregateOutputType> | number
          }
        }
      }
      optimization_runs: {
        payload: Prisma.$optimization_runsPayload<ExtArgs>
        fields: Prisma.optimization_runsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.optimization_runsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.optimization_runsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>
          }
          findFirst: {
            args: Prisma.optimization_runsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.optimization_runsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>
          }
          findMany: {
            args: Prisma.optimization_runsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>[]
          }
          create: {
            args: Prisma.optimization_runsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>
          }
          createMany: {
            args: Prisma.optimization_runsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.optimization_runsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>[]
          }
          delete: {
            args: Prisma.optimization_runsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>
          }
          update: {
            args: Prisma.optimization_runsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>
          }
          deleteMany: {
            args: Prisma.optimization_runsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.optimization_runsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.optimization_runsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>[]
          }
          upsert: {
            args: Prisma.optimization_runsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$optimization_runsPayload>
          }
          aggregate: {
            args: Prisma.Optimization_runsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOptimization_runs>
          }
          groupBy: {
            args: Prisma.optimization_runsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Optimization_runsGroupByOutputType>[]
          }
          count: {
            args: Prisma.optimization_runsCountArgs<ExtArgs>
            result: $Utils.Optional<Optimization_runsCountAggregateOutputType> | number
          }
        }
      }
      shelves: {
        payload: Prisma.$shelvesPayload<ExtArgs>
        fields: Prisma.shelvesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.shelvesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.shelvesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>
          }
          findFirst: {
            args: Prisma.shelvesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.shelvesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>
          }
          findMany: {
            args: Prisma.shelvesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>[]
          }
          create: {
            args: Prisma.shelvesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>
          }
          createMany: {
            args: Prisma.shelvesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.shelvesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>[]
          }
          delete: {
            args: Prisma.shelvesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>
          }
          update: {
            args: Prisma.shelvesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>
          }
          deleteMany: {
            args: Prisma.shelvesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.shelvesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.shelvesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>[]
          }
          upsert: {
            args: Prisma.shelvesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shelvesPayload>
          }
          aggregate: {
            args: Prisma.ShelvesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShelves>
          }
          groupBy: {
            args: Prisma.shelvesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShelvesGroupByOutputType>[]
          }
          count: {
            args: Prisma.shelvesCountArgs<ExtArgs>
            result: $Utils.Optional<ShelvesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    inventory?: InventoryOmit
    inventoryPlacement?: InventoryPlacementOmit
    optimization_runs?: optimization_runsOmit
    shelves?: shelvesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type InventoryCountOutputType
   */

  export type InventoryCountOutputType = {
    InventoryPlacement: number
  }

  export type InventoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InventoryPlacement?: boolean | InventoryCountOutputTypeCountInventoryPlacementArgs
  }

  // Custom InputTypes
  /**
   * InventoryCountOutputType without action
   */
  export type InventoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryCountOutputType
     */
    select?: InventoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InventoryCountOutputType without action
   */
  export type InventoryCountOutputTypeCountInventoryPlacementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryPlacementWhereInput
  }


  /**
   * Count Type ShelvesCountOutputType
   */

  export type ShelvesCountOutputType = {
    InventoryPlacement: number
  }

  export type ShelvesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InventoryPlacement?: boolean | ShelvesCountOutputTypeCountInventoryPlacementArgs
  }

  // Custom InputTypes
  /**
   * ShelvesCountOutputType without action
   */
  export type ShelvesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShelvesCountOutputType
     */
    select?: ShelvesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ShelvesCountOutputType without action
   */
  export type ShelvesCountOutputTypeCountInventoryPlacementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryPlacementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Inventory
   */

  export type AggregateInventory = {
    _count: InventoryCountAggregateOutputType | null
    _avg: InventoryAvgAggregateOutputType | null
    _sum: InventorySumAggregateOutputType | null
    _min: InventoryMinAggregateOutputType | null
    _max: InventoryMaxAggregateOutputType | null
  }

  export type InventoryAvgAggregateOutputType = {
    id: number | null
    quantity: number | null
    width: number | null
    height: number | null
    depth: number | null
    price: number | null
    weight: number | null
  }

  export type InventorySumAggregateOutputType = {
    id: number | null
    quantity: number | null
    width: number | null
    height: number | null
    depth: number | null
    price: number | null
    weight: number | null
  }

  export type InventoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    quantity: number | null
    width: number | null
    height: number | null
    depth: number | null
    price: number | null
    weight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    quantity: number | null
    width: number | null
    height: number | null
    depth: number | null
    price: number | null
    weight: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InventoryCountAggregateOutputType = {
    id: number
    name: number
    description: number
    quantity: number
    width: number
    height: number
    depth: number
    price: number
    weight: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InventoryAvgAggregateInputType = {
    id?: true
    quantity?: true
    width?: true
    height?: true
    depth?: true
    price?: true
    weight?: true
  }

  export type InventorySumAggregateInputType = {
    id?: true
    quantity?: true
    width?: true
    height?: true
    depth?: true
    price?: true
    weight?: true
  }

  export type InventoryMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    quantity?: true
    width?: true
    height?: true
    depth?: true
    price?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    quantity?: true
    width?: true
    height?: true
    depth?: true
    price?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InventoryCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    quantity?: true
    width?: true
    height?: true
    depth?: true
    price?: true
    weight?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InventoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inventory to aggregate.
     */
    where?: InventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventories to fetch.
     */
    orderBy?: InventoryOrderByWithRelationInput | InventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inventories
    **/
    _count?: true | InventoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryMaxAggregateInputType
  }

  export type GetInventoryAggregateType<T extends InventoryAggregateArgs> = {
        [P in keyof T & keyof AggregateInventory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventory[P]>
      : GetScalarType<T[P], AggregateInventory[P]>
  }




  export type InventoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryWhereInput
    orderBy?: InventoryOrderByWithAggregationInput | InventoryOrderByWithAggregationInput[]
    by: InventoryScalarFieldEnum[] | InventoryScalarFieldEnum
    having?: InventoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryCountAggregateInputType | true
    _avg?: InventoryAvgAggregateInputType
    _sum?: InventorySumAggregateInputType
    _min?: InventoryMinAggregateInputType
    _max?: InventoryMaxAggregateInputType
  }

  export type InventoryGroupByOutputType = {
    id: number
    name: string
    description: string
    quantity: number
    width: number
    height: number
    depth: number
    price: number
    weight: number
    createdAt: Date
    updatedAt: Date
    _count: InventoryCountAggregateOutputType | null
    _avg: InventoryAvgAggregateOutputType | null
    _sum: InventorySumAggregateOutputType | null
    _min: InventoryMinAggregateOutputType | null
    _max: InventoryMaxAggregateOutputType | null
  }

  type GetInventoryGroupByPayload<T extends InventoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryGroupByOutputType[P]>
        }
      >
    >


  export type InventorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    quantity?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    price?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    InventoryPlacement?: boolean | Inventory$InventoryPlacementArgs<ExtArgs>
    _count?: boolean | InventoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventory"]>

  export type InventorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    quantity?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    price?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["inventory"]>

  export type InventorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    quantity?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    price?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["inventory"]>

  export type InventorySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    quantity?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    price?: boolean
    weight?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InventoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "quantity" | "width" | "height" | "depth" | "price" | "weight" | "createdAt" | "updatedAt", ExtArgs["result"]["inventory"]>
  export type InventoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InventoryPlacement?: boolean | Inventory$InventoryPlacementArgs<ExtArgs>
    _count?: boolean | InventoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InventoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type InventoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InventoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inventory"
    objects: {
      InventoryPlacement: Prisma.$InventoryPlacementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      quantity: number
      width: number
      height: number
      depth: number
      price: number
      weight: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inventory"]>
    composites: {}
  }

  type InventoryGetPayload<S extends boolean | null | undefined | InventoryDefaultArgs> = $Result.GetResult<Prisma.$InventoryPayload, S>

  type InventoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InventoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InventoryCountAggregateInputType | true
    }

  export interface InventoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inventory'], meta: { name: 'Inventory' } }
    /**
     * Find zero or one Inventory that matches the filter.
     * @param {InventoryFindUniqueArgs} args - Arguments to find a Inventory
     * @example
     * // Get one Inventory
     * const inventory = await prisma.inventory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryFindUniqueArgs>(args: SelectSubset<T, InventoryFindUniqueArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inventory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InventoryFindUniqueOrThrowArgs} args - Arguments to find a Inventory
     * @example
     * // Get one Inventory
     * const inventory = await prisma.inventory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryFindUniqueOrThrowArgs>(args: SelectSubset<T, InventoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inventory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryFindFirstArgs} args - Arguments to find a Inventory
     * @example
     * // Get one Inventory
     * const inventory = await prisma.inventory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryFindFirstArgs>(args?: SelectSubset<T, InventoryFindFirstArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inventory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryFindFirstOrThrowArgs} args - Arguments to find a Inventory
     * @example
     * // Get one Inventory
     * const inventory = await prisma.inventory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryFindFirstOrThrowArgs>(args?: SelectSubset<T, InventoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inventories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inventories
     * const inventories = await prisma.inventory.findMany()
     * 
     * // Get first 10 Inventories
     * const inventories = await prisma.inventory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryWithIdOnly = await prisma.inventory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InventoryFindManyArgs>(args?: SelectSubset<T, InventoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inventory.
     * @param {InventoryCreateArgs} args - Arguments to create a Inventory.
     * @example
     * // Create one Inventory
     * const Inventory = await prisma.inventory.create({
     *   data: {
     *     // ... data to create a Inventory
     *   }
     * })
     * 
     */
    create<T extends InventoryCreateArgs>(args: SelectSubset<T, InventoryCreateArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inventories.
     * @param {InventoryCreateManyArgs} args - Arguments to create many Inventories.
     * @example
     * // Create many Inventories
     * const inventory = await prisma.inventory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InventoryCreateManyArgs>(args?: SelectSubset<T, InventoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inventories and returns the data saved in the database.
     * @param {InventoryCreateManyAndReturnArgs} args - Arguments to create many Inventories.
     * @example
     * // Create many Inventories
     * const inventory = await prisma.inventory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inventories and only return the `id`
     * const inventoryWithIdOnly = await prisma.inventory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InventoryCreateManyAndReturnArgs>(args?: SelectSubset<T, InventoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inventory.
     * @param {InventoryDeleteArgs} args - Arguments to delete one Inventory.
     * @example
     * // Delete one Inventory
     * const Inventory = await prisma.inventory.delete({
     *   where: {
     *     // ... filter to delete one Inventory
     *   }
     * })
     * 
     */
    delete<T extends InventoryDeleteArgs>(args: SelectSubset<T, InventoryDeleteArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inventory.
     * @param {InventoryUpdateArgs} args - Arguments to update one Inventory.
     * @example
     * // Update one Inventory
     * const inventory = await prisma.inventory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InventoryUpdateArgs>(args: SelectSubset<T, InventoryUpdateArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inventories.
     * @param {InventoryDeleteManyArgs} args - Arguments to filter Inventories to delete.
     * @example
     * // Delete a few Inventories
     * const { count } = await prisma.inventory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InventoryDeleteManyArgs>(args?: SelectSubset<T, InventoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inventories
     * const inventory = await prisma.inventory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InventoryUpdateManyArgs>(args: SelectSubset<T, InventoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventories and returns the data updated in the database.
     * @param {InventoryUpdateManyAndReturnArgs} args - Arguments to update many Inventories.
     * @example
     * // Update many Inventories
     * const inventory = await prisma.inventory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inventories and only return the `id`
     * const inventoryWithIdOnly = await prisma.inventory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InventoryUpdateManyAndReturnArgs>(args: SelectSubset<T, InventoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inventory.
     * @param {InventoryUpsertArgs} args - Arguments to update or create a Inventory.
     * @example
     * // Update or create a Inventory
     * const inventory = await prisma.inventory.upsert({
     *   create: {
     *     // ... data to create a Inventory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inventory we want to update
     *   }
     * })
     */
    upsert<T extends InventoryUpsertArgs>(args: SelectSubset<T, InventoryUpsertArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inventories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryCountArgs} args - Arguments to filter Inventories to count.
     * @example
     * // Count the number of Inventories
     * const count = await prisma.inventory.count({
     *   where: {
     *     // ... the filter for the Inventories we want to count
     *   }
     * })
    **/
    count<T extends InventoryCountArgs>(
      args?: Subset<T, InventoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventoryAggregateArgs>(args: Subset<T, InventoryAggregateArgs>): Prisma.PrismaPromise<GetInventoryAggregateType<T>>

    /**
     * Group by Inventory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InventoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryGroupByArgs['orderBy'] }
        : { orderBy?: InventoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InventoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inventory model
   */
  readonly fields: InventoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inventory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InventoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    InventoryPlacement<T extends Inventory$InventoryPlacementArgs<ExtArgs> = {}>(args?: Subset<T, Inventory$InventoryPlacementArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inventory model
   */
  interface InventoryFieldRefs {
    readonly id: FieldRef<"Inventory", 'Int'>
    readonly name: FieldRef<"Inventory", 'String'>
    readonly description: FieldRef<"Inventory", 'String'>
    readonly quantity: FieldRef<"Inventory", 'Int'>
    readonly width: FieldRef<"Inventory", 'Float'>
    readonly height: FieldRef<"Inventory", 'Float'>
    readonly depth: FieldRef<"Inventory", 'Float'>
    readonly price: FieldRef<"Inventory", 'Float'>
    readonly weight: FieldRef<"Inventory", 'Float'>
    readonly createdAt: FieldRef<"Inventory", 'DateTime'>
    readonly updatedAt: FieldRef<"Inventory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inventory findUnique
   */
  export type InventoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * Filter, which Inventory to fetch.
     */
    where: InventoryWhereUniqueInput
  }

  /**
   * Inventory findUniqueOrThrow
   */
  export type InventoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * Filter, which Inventory to fetch.
     */
    where: InventoryWhereUniqueInput
  }

  /**
   * Inventory findFirst
   */
  export type InventoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * Filter, which Inventory to fetch.
     */
    where?: InventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventories to fetch.
     */
    orderBy?: InventoryOrderByWithRelationInput | InventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inventories.
     */
    cursor?: InventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inventories.
     */
    distinct?: InventoryScalarFieldEnum | InventoryScalarFieldEnum[]
  }

  /**
   * Inventory findFirstOrThrow
   */
  export type InventoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * Filter, which Inventory to fetch.
     */
    where?: InventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventories to fetch.
     */
    orderBy?: InventoryOrderByWithRelationInput | InventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inventories.
     */
    cursor?: InventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inventories.
     */
    distinct?: InventoryScalarFieldEnum | InventoryScalarFieldEnum[]
  }

  /**
   * Inventory findMany
   */
  export type InventoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * Filter, which Inventories to fetch.
     */
    where?: InventoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inventories to fetch.
     */
    orderBy?: InventoryOrderByWithRelationInput | InventoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inventories.
     */
    cursor?: InventoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inventories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inventories.
     */
    skip?: number
    distinct?: InventoryScalarFieldEnum | InventoryScalarFieldEnum[]
  }

  /**
   * Inventory create
   */
  export type InventoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Inventory.
     */
    data: XOR<InventoryCreateInput, InventoryUncheckedCreateInput>
  }

  /**
   * Inventory createMany
   */
  export type InventoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inventories.
     */
    data: InventoryCreateManyInput | InventoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inventory createManyAndReturn
   */
  export type InventoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * The data used to create many Inventories.
     */
    data: InventoryCreateManyInput | InventoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inventory update
   */
  export type InventoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Inventory.
     */
    data: XOR<InventoryUpdateInput, InventoryUncheckedUpdateInput>
    /**
     * Choose, which Inventory to update.
     */
    where: InventoryWhereUniqueInput
  }

  /**
   * Inventory updateMany
   */
  export type InventoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inventories.
     */
    data: XOR<InventoryUpdateManyMutationInput, InventoryUncheckedUpdateManyInput>
    /**
     * Filter which Inventories to update
     */
    where?: InventoryWhereInput
    /**
     * Limit how many Inventories to update.
     */
    limit?: number
  }

  /**
   * Inventory updateManyAndReturn
   */
  export type InventoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * The data used to update Inventories.
     */
    data: XOR<InventoryUpdateManyMutationInput, InventoryUncheckedUpdateManyInput>
    /**
     * Filter which Inventories to update
     */
    where?: InventoryWhereInput
    /**
     * Limit how many Inventories to update.
     */
    limit?: number
  }

  /**
   * Inventory upsert
   */
  export type InventoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Inventory to update in case it exists.
     */
    where: InventoryWhereUniqueInput
    /**
     * In case the Inventory found by the `where` argument doesn't exist, create a new Inventory with this data.
     */
    create: XOR<InventoryCreateInput, InventoryUncheckedCreateInput>
    /**
     * In case the Inventory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryUpdateInput, InventoryUncheckedUpdateInput>
  }

  /**
   * Inventory delete
   */
  export type InventoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
    /**
     * Filter which Inventory to delete.
     */
    where: InventoryWhereUniqueInput
  }

  /**
   * Inventory deleteMany
   */
  export type InventoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inventories to delete
     */
    where?: InventoryWhereInput
    /**
     * Limit how many Inventories to delete.
     */
    limit?: number
  }

  /**
   * Inventory.InventoryPlacement
   */
  export type Inventory$InventoryPlacementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    where?: InventoryPlacementWhereInput
    orderBy?: InventoryPlacementOrderByWithRelationInput | InventoryPlacementOrderByWithRelationInput[]
    cursor?: InventoryPlacementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryPlacementScalarFieldEnum | InventoryPlacementScalarFieldEnum[]
  }

  /**
   * Inventory without action
   */
  export type InventoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inventory
     */
    omit?: InventoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryInclude<ExtArgs> | null
  }


  /**
   * Model InventoryPlacement
   */

  export type AggregateInventoryPlacement = {
    _count: InventoryPlacementCountAggregateOutputType | null
    _avg: InventoryPlacementAvgAggregateOutputType | null
    _sum: InventoryPlacementSumAggregateOutputType | null
    _min: InventoryPlacementMinAggregateOutputType | null
    _max: InventoryPlacementMaxAggregateOutputType | null
  }

  export type InventoryPlacementAvgAggregateOutputType = {
    inventoryId: number | null
    shelfId: number | null
  }

  export type InventoryPlacementSumAggregateOutputType = {
    inventoryId: number | null
    shelfId: number | null
  }

  export type InventoryPlacementMinAggregateOutputType = {
    id: string | null
    inventoryId: number | null
    shelfId: number | null
  }

  export type InventoryPlacementMaxAggregateOutputType = {
    id: string | null
    inventoryId: number | null
    shelfId: number | null
  }

  export type InventoryPlacementCountAggregateOutputType = {
    id: number
    inventoryId: number
    shelfId: number
    _all: number
  }


  export type InventoryPlacementAvgAggregateInputType = {
    inventoryId?: true
    shelfId?: true
  }

  export type InventoryPlacementSumAggregateInputType = {
    inventoryId?: true
    shelfId?: true
  }

  export type InventoryPlacementMinAggregateInputType = {
    id?: true
    inventoryId?: true
    shelfId?: true
  }

  export type InventoryPlacementMaxAggregateInputType = {
    id?: true
    inventoryId?: true
    shelfId?: true
  }

  export type InventoryPlacementCountAggregateInputType = {
    id?: true
    inventoryId?: true
    shelfId?: true
    _all?: true
  }

  export type InventoryPlacementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryPlacement to aggregate.
     */
    where?: InventoryPlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryPlacements to fetch.
     */
    orderBy?: InventoryPlacementOrderByWithRelationInput | InventoryPlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InventoryPlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryPlacements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryPlacements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InventoryPlacements
    **/
    _count?: true | InventoryPlacementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InventoryPlacementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InventoryPlacementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InventoryPlacementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InventoryPlacementMaxAggregateInputType
  }

  export type GetInventoryPlacementAggregateType<T extends InventoryPlacementAggregateArgs> = {
        [P in keyof T & keyof AggregateInventoryPlacement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventoryPlacement[P]>
      : GetScalarType<T[P], AggregateInventoryPlacement[P]>
  }




  export type InventoryPlacementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InventoryPlacementWhereInput
    orderBy?: InventoryPlacementOrderByWithAggregationInput | InventoryPlacementOrderByWithAggregationInput[]
    by: InventoryPlacementScalarFieldEnum[] | InventoryPlacementScalarFieldEnum
    having?: InventoryPlacementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InventoryPlacementCountAggregateInputType | true
    _avg?: InventoryPlacementAvgAggregateInputType
    _sum?: InventoryPlacementSumAggregateInputType
    _min?: InventoryPlacementMinAggregateInputType
    _max?: InventoryPlacementMaxAggregateInputType
  }

  export type InventoryPlacementGroupByOutputType = {
    id: string
    inventoryId: number
    shelfId: number
    _count: InventoryPlacementCountAggregateOutputType | null
    _avg: InventoryPlacementAvgAggregateOutputType | null
    _sum: InventoryPlacementSumAggregateOutputType | null
    _min: InventoryPlacementMinAggregateOutputType | null
    _max: InventoryPlacementMaxAggregateOutputType | null
  }

  type GetInventoryPlacementGroupByPayload<T extends InventoryPlacementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InventoryPlacementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InventoryPlacementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InventoryPlacementGroupByOutputType[P]>
            : GetScalarType<T[P], InventoryPlacementGroupByOutputType[P]>
        }
      >
    >


  export type InventoryPlacementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inventoryId?: boolean
    shelfId?: boolean
    inventory?: boolean | InventoryDefaultArgs<ExtArgs>
    shelf?: boolean | shelvesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryPlacement"]>

  export type InventoryPlacementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inventoryId?: boolean
    shelfId?: boolean
    inventory?: boolean | InventoryDefaultArgs<ExtArgs>
    shelf?: boolean | shelvesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryPlacement"]>

  export type InventoryPlacementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inventoryId?: boolean
    shelfId?: boolean
    inventory?: boolean | InventoryDefaultArgs<ExtArgs>
    shelf?: boolean | shelvesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventoryPlacement"]>

  export type InventoryPlacementSelectScalar = {
    id?: boolean
    inventoryId?: boolean
    shelfId?: boolean
  }

  export type InventoryPlacementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inventoryId" | "shelfId", ExtArgs["result"]["inventoryPlacement"]>
  export type InventoryPlacementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventory?: boolean | InventoryDefaultArgs<ExtArgs>
    shelf?: boolean | shelvesDefaultArgs<ExtArgs>
  }
  export type InventoryPlacementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventory?: boolean | InventoryDefaultArgs<ExtArgs>
    shelf?: boolean | shelvesDefaultArgs<ExtArgs>
  }
  export type InventoryPlacementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventory?: boolean | InventoryDefaultArgs<ExtArgs>
    shelf?: boolean | shelvesDefaultArgs<ExtArgs>
  }

  export type $InventoryPlacementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InventoryPlacement"
    objects: {
      inventory: Prisma.$InventoryPayload<ExtArgs>
      shelf: Prisma.$shelvesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inventoryId: number
      shelfId: number
    }, ExtArgs["result"]["inventoryPlacement"]>
    composites: {}
  }

  type InventoryPlacementGetPayload<S extends boolean | null | undefined | InventoryPlacementDefaultArgs> = $Result.GetResult<Prisma.$InventoryPlacementPayload, S>

  type InventoryPlacementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InventoryPlacementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InventoryPlacementCountAggregateInputType | true
    }

  export interface InventoryPlacementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InventoryPlacement'], meta: { name: 'InventoryPlacement' } }
    /**
     * Find zero or one InventoryPlacement that matches the filter.
     * @param {InventoryPlacementFindUniqueArgs} args - Arguments to find a InventoryPlacement
     * @example
     * // Get one InventoryPlacement
     * const inventoryPlacement = await prisma.inventoryPlacement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InventoryPlacementFindUniqueArgs>(args: SelectSubset<T, InventoryPlacementFindUniqueArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InventoryPlacement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InventoryPlacementFindUniqueOrThrowArgs} args - Arguments to find a InventoryPlacement
     * @example
     * // Get one InventoryPlacement
     * const inventoryPlacement = await prisma.inventoryPlacement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InventoryPlacementFindUniqueOrThrowArgs>(args: SelectSubset<T, InventoryPlacementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InventoryPlacement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryPlacementFindFirstArgs} args - Arguments to find a InventoryPlacement
     * @example
     * // Get one InventoryPlacement
     * const inventoryPlacement = await prisma.inventoryPlacement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InventoryPlacementFindFirstArgs>(args?: SelectSubset<T, InventoryPlacementFindFirstArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InventoryPlacement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryPlacementFindFirstOrThrowArgs} args - Arguments to find a InventoryPlacement
     * @example
     * // Get one InventoryPlacement
     * const inventoryPlacement = await prisma.inventoryPlacement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InventoryPlacementFindFirstOrThrowArgs>(args?: SelectSubset<T, InventoryPlacementFindFirstOrThrowArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InventoryPlacements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryPlacementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InventoryPlacements
     * const inventoryPlacements = await prisma.inventoryPlacement.findMany()
     * 
     * // Get first 10 InventoryPlacements
     * const inventoryPlacements = await prisma.inventoryPlacement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inventoryPlacementWithIdOnly = await prisma.inventoryPlacement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InventoryPlacementFindManyArgs>(args?: SelectSubset<T, InventoryPlacementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InventoryPlacement.
     * @param {InventoryPlacementCreateArgs} args - Arguments to create a InventoryPlacement.
     * @example
     * // Create one InventoryPlacement
     * const InventoryPlacement = await prisma.inventoryPlacement.create({
     *   data: {
     *     // ... data to create a InventoryPlacement
     *   }
     * })
     * 
     */
    create<T extends InventoryPlacementCreateArgs>(args: SelectSubset<T, InventoryPlacementCreateArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InventoryPlacements.
     * @param {InventoryPlacementCreateManyArgs} args - Arguments to create many InventoryPlacements.
     * @example
     * // Create many InventoryPlacements
     * const inventoryPlacement = await prisma.inventoryPlacement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InventoryPlacementCreateManyArgs>(args?: SelectSubset<T, InventoryPlacementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InventoryPlacements and returns the data saved in the database.
     * @param {InventoryPlacementCreateManyAndReturnArgs} args - Arguments to create many InventoryPlacements.
     * @example
     * // Create many InventoryPlacements
     * const inventoryPlacement = await prisma.inventoryPlacement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InventoryPlacements and only return the `id`
     * const inventoryPlacementWithIdOnly = await prisma.inventoryPlacement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InventoryPlacementCreateManyAndReturnArgs>(args?: SelectSubset<T, InventoryPlacementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InventoryPlacement.
     * @param {InventoryPlacementDeleteArgs} args - Arguments to delete one InventoryPlacement.
     * @example
     * // Delete one InventoryPlacement
     * const InventoryPlacement = await prisma.inventoryPlacement.delete({
     *   where: {
     *     // ... filter to delete one InventoryPlacement
     *   }
     * })
     * 
     */
    delete<T extends InventoryPlacementDeleteArgs>(args: SelectSubset<T, InventoryPlacementDeleteArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InventoryPlacement.
     * @param {InventoryPlacementUpdateArgs} args - Arguments to update one InventoryPlacement.
     * @example
     * // Update one InventoryPlacement
     * const inventoryPlacement = await prisma.inventoryPlacement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InventoryPlacementUpdateArgs>(args: SelectSubset<T, InventoryPlacementUpdateArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InventoryPlacements.
     * @param {InventoryPlacementDeleteManyArgs} args - Arguments to filter InventoryPlacements to delete.
     * @example
     * // Delete a few InventoryPlacements
     * const { count } = await prisma.inventoryPlacement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InventoryPlacementDeleteManyArgs>(args?: SelectSubset<T, InventoryPlacementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryPlacements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryPlacementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InventoryPlacements
     * const inventoryPlacement = await prisma.inventoryPlacement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InventoryPlacementUpdateManyArgs>(args: SelectSubset<T, InventoryPlacementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InventoryPlacements and returns the data updated in the database.
     * @param {InventoryPlacementUpdateManyAndReturnArgs} args - Arguments to update many InventoryPlacements.
     * @example
     * // Update many InventoryPlacements
     * const inventoryPlacement = await prisma.inventoryPlacement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InventoryPlacements and only return the `id`
     * const inventoryPlacementWithIdOnly = await prisma.inventoryPlacement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InventoryPlacementUpdateManyAndReturnArgs>(args: SelectSubset<T, InventoryPlacementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InventoryPlacement.
     * @param {InventoryPlacementUpsertArgs} args - Arguments to update or create a InventoryPlacement.
     * @example
     * // Update or create a InventoryPlacement
     * const inventoryPlacement = await prisma.inventoryPlacement.upsert({
     *   create: {
     *     // ... data to create a InventoryPlacement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InventoryPlacement we want to update
     *   }
     * })
     */
    upsert<T extends InventoryPlacementUpsertArgs>(args: SelectSubset<T, InventoryPlacementUpsertArgs<ExtArgs>>): Prisma__InventoryPlacementClient<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InventoryPlacements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryPlacementCountArgs} args - Arguments to filter InventoryPlacements to count.
     * @example
     * // Count the number of InventoryPlacements
     * const count = await prisma.inventoryPlacement.count({
     *   where: {
     *     // ... the filter for the InventoryPlacements we want to count
     *   }
     * })
    **/
    count<T extends InventoryPlacementCountArgs>(
      args?: Subset<T, InventoryPlacementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InventoryPlacementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InventoryPlacement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryPlacementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InventoryPlacementAggregateArgs>(args: Subset<T, InventoryPlacementAggregateArgs>): Prisma.PrismaPromise<GetInventoryPlacementAggregateType<T>>

    /**
     * Group by InventoryPlacement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InventoryPlacementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InventoryPlacementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InventoryPlacementGroupByArgs['orderBy'] }
        : { orderBy?: InventoryPlacementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InventoryPlacementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventoryPlacementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InventoryPlacement model
   */
  readonly fields: InventoryPlacementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InventoryPlacement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InventoryPlacementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventory<T extends InventoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InventoryDefaultArgs<ExtArgs>>): Prisma__InventoryClient<$Result.GetResult<Prisma.$InventoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    shelf<T extends shelvesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, shelvesDefaultArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InventoryPlacement model
   */
  interface InventoryPlacementFieldRefs {
    readonly id: FieldRef<"InventoryPlacement", 'String'>
    readonly inventoryId: FieldRef<"InventoryPlacement", 'Int'>
    readonly shelfId: FieldRef<"InventoryPlacement", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * InventoryPlacement findUnique
   */
  export type InventoryPlacementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryPlacement to fetch.
     */
    where: InventoryPlacementWhereUniqueInput
  }

  /**
   * InventoryPlacement findUniqueOrThrow
   */
  export type InventoryPlacementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryPlacement to fetch.
     */
    where: InventoryPlacementWhereUniqueInput
  }

  /**
   * InventoryPlacement findFirst
   */
  export type InventoryPlacementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryPlacement to fetch.
     */
    where?: InventoryPlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryPlacements to fetch.
     */
    orderBy?: InventoryPlacementOrderByWithRelationInput | InventoryPlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryPlacements.
     */
    cursor?: InventoryPlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryPlacements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryPlacements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryPlacements.
     */
    distinct?: InventoryPlacementScalarFieldEnum | InventoryPlacementScalarFieldEnum[]
  }

  /**
   * InventoryPlacement findFirstOrThrow
   */
  export type InventoryPlacementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryPlacement to fetch.
     */
    where?: InventoryPlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryPlacements to fetch.
     */
    orderBy?: InventoryPlacementOrderByWithRelationInput | InventoryPlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InventoryPlacements.
     */
    cursor?: InventoryPlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryPlacements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryPlacements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InventoryPlacements.
     */
    distinct?: InventoryPlacementScalarFieldEnum | InventoryPlacementScalarFieldEnum[]
  }

  /**
   * InventoryPlacement findMany
   */
  export type InventoryPlacementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * Filter, which InventoryPlacements to fetch.
     */
    where?: InventoryPlacementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InventoryPlacements to fetch.
     */
    orderBy?: InventoryPlacementOrderByWithRelationInput | InventoryPlacementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InventoryPlacements.
     */
    cursor?: InventoryPlacementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InventoryPlacements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InventoryPlacements.
     */
    skip?: number
    distinct?: InventoryPlacementScalarFieldEnum | InventoryPlacementScalarFieldEnum[]
  }

  /**
   * InventoryPlacement create
   */
  export type InventoryPlacementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * The data needed to create a InventoryPlacement.
     */
    data: XOR<InventoryPlacementCreateInput, InventoryPlacementUncheckedCreateInput>
  }

  /**
   * InventoryPlacement createMany
   */
  export type InventoryPlacementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InventoryPlacements.
     */
    data: InventoryPlacementCreateManyInput | InventoryPlacementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InventoryPlacement createManyAndReturn
   */
  export type InventoryPlacementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * The data used to create many InventoryPlacements.
     */
    data: InventoryPlacementCreateManyInput | InventoryPlacementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InventoryPlacement update
   */
  export type InventoryPlacementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * The data needed to update a InventoryPlacement.
     */
    data: XOR<InventoryPlacementUpdateInput, InventoryPlacementUncheckedUpdateInput>
    /**
     * Choose, which InventoryPlacement to update.
     */
    where: InventoryPlacementWhereUniqueInput
  }

  /**
   * InventoryPlacement updateMany
   */
  export type InventoryPlacementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InventoryPlacements.
     */
    data: XOR<InventoryPlacementUpdateManyMutationInput, InventoryPlacementUncheckedUpdateManyInput>
    /**
     * Filter which InventoryPlacements to update
     */
    where?: InventoryPlacementWhereInput
    /**
     * Limit how many InventoryPlacements to update.
     */
    limit?: number
  }

  /**
   * InventoryPlacement updateManyAndReturn
   */
  export type InventoryPlacementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * The data used to update InventoryPlacements.
     */
    data: XOR<InventoryPlacementUpdateManyMutationInput, InventoryPlacementUncheckedUpdateManyInput>
    /**
     * Filter which InventoryPlacements to update
     */
    where?: InventoryPlacementWhereInput
    /**
     * Limit how many InventoryPlacements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InventoryPlacement upsert
   */
  export type InventoryPlacementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * The filter to search for the InventoryPlacement to update in case it exists.
     */
    where: InventoryPlacementWhereUniqueInput
    /**
     * In case the InventoryPlacement found by the `where` argument doesn't exist, create a new InventoryPlacement with this data.
     */
    create: XOR<InventoryPlacementCreateInput, InventoryPlacementUncheckedCreateInput>
    /**
     * In case the InventoryPlacement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InventoryPlacementUpdateInput, InventoryPlacementUncheckedUpdateInput>
  }

  /**
   * InventoryPlacement delete
   */
  export type InventoryPlacementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    /**
     * Filter which InventoryPlacement to delete.
     */
    where: InventoryPlacementWhereUniqueInput
  }

  /**
   * InventoryPlacement deleteMany
   */
  export type InventoryPlacementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InventoryPlacements to delete
     */
    where?: InventoryPlacementWhereInput
    /**
     * Limit how many InventoryPlacements to delete.
     */
    limit?: number
  }

  /**
   * InventoryPlacement without action
   */
  export type InventoryPlacementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
  }


  /**
   * Model optimization_runs
   */

  export type AggregateOptimization_runs = {
    _count: Optimization_runsCountAggregateOutputType | null
    _avg: Optimization_runsAvgAggregateOutputType | null
    _sum: Optimization_runsSumAggregateOutputType | null
    _min: Optimization_runsMinAggregateOutputType | null
    _max: Optimization_runsMaxAggregateOutputType | null
  }

  export type Optimization_runsAvgAggregateOutputType = {
    id: number | null
    total_objective: number | null
    execution_time: number | null
  }

  export type Optimization_runsSumAggregateOutputType = {
    id: number | null
    total_objective: number | null
    execution_time: number | null
  }

  export type Optimization_runsMinAggregateOutputType = {
    id: number | null
    run_id: string | null
    status: string | null
    total_objective: number | null
    execution_time: number | null
    parameters: string | null
    created_at: Date | null
    completed_at: Date | null
  }

  export type Optimization_runsMaxAggregateOutputType = {
    id: number | null
    run_id: string | null
    status: string | null
    total_objective: number | null
    execution_time: number | null
    parameters: string | null
    created_at: Date | null
    completed_at: Date | null
  }

  export type Optimization_runsCountAggregateOutputType = {
    id: number
    run_id: number
    status: number
    total_objective: number
    execution_time: number
    parameters: number
    created_at: number
    completed_at: number
    _all: number
  }


  export type Optimization_runsAvgAggregateInputType = {
    id?: true
    total_objective?: true
    execution_time?: true
  }

  export type Optimization_runsSumAggregateInputType = {
    id?: true
    total_objective?: true
    execution_time?: true
  }

  export type Optimization_runsMinAggregateInputType = {
    id?: true
    run_id?: true
    status?: true
    total_objective?: true
    execution_time?: true
    parameters?: true
    created_at?: true
    completed_at?: true
  }

  export type Optimization_runsMaxAggregateInputType = {
    id?: true
    run_id?: true
    status?: true
    total_objective?: true
    execution_time?: true
    parameters?: true
    created_at?: true
    completed_at?: true
  }

  export type Optimization_runsCountAggregateInputType = {
    id?: true
    run_id?: true
    status?: true
    total_objective?: true
    execution_time?: true
    parameters?: true
    created_at?: true
    completed_at?: true
    _all?: true
  }

  export type Optimization_runsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which optimization_runs to aggregate.
     */
    where?: optimization_runsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of optimization_runs to fetch.
     */
    orderBy?: optimization_runsOrderByWithRelationInput | optimization_runsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: optimization_runsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` optimization_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` optimization_runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned optimization_runs
    **/
    _count?: true | Optimization_runsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Optimization_runsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Optimization_runsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Optimization_runsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Optimization_runsMaxAggregateInputType
  }

  export type GetOptimization_runsAggregateType<T extends Optimization_runsAggregateArgs> = {
        [P in keyof T & keyof AggregateOptimization_runs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOptimization_runs[P]>
      : GetScalarType<T[P], AggregateOptimization_runs[P]>
  }




  export type optimization_runsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: optimization_runsWhereInput
    orderBy?: optimization_runsOrderByWithAggregationInput | optimization_runsOrderByWithAggregationInput[]
    by: Optimization_runsScalarFieldEnum[] | Optimization_runsScalarFieldEnum
    having?: optimization_runsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Optimization_runsCountAggregateInputType | true
    _avg?: Optimization_runsAvgAggregateInputType
    _sum?: Optimization_runsSumAggregateInputType
    _min?: Optimization_runsMinAggregateInputType
    _max?: Optimization_runsMaxAggregateInputType
  }

  export type Optimization_runsGroupByOutputType = {
    id: number
    run_id: string
    status: string | null
    total_objective: number | null
    execution_time: number | null
    parameters: string | null
    created_at: Date | null
    completed_at: Date | null
    _count: Optimization_runsCountAggregateOutputType | null
    _avg: Optimization_runsAvgAggregateOutputType | null
    _sum: Optimization_runsSumAggregateOutputType | null
    _min: Optimization_runsMinAggregateOutputType | null
    _max: Optimization_runsMaxAggregateOutputType | null
  }

  type GetOptimization_runsGroupByPayload<T extends optimization_runsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Optimization_runsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Optimization_runsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Optimization_runsGroupByOutputType[P]>
            : GetScalarType<T[P], Optimization_runsGroupByOutputType[P]>
        }
      >
    >


  export type optimization_runsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    run_id?: boolean
    status?: boolean
    total_objective?: boolean
    execution_time?: boolean
    parameters?: boolean
    created_at?: boolean
    completed_at?: boolean
  }, ExtArgs["result"]["optimization_runs"]>

  export type optimization_runsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    run_id?: boolean
    status?: boolean
    total_objective?: boolean
    execution_time?: boolean
    parameters?: boolean
    created_at?: boolean
    completed_at?: boolean
  }, ExtArgs["result"]["optimization_runs"]>

  export type optimization_runsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    run_id?: boolean
    status?: boolean
    total_objective?: boolean
    execution_time?: boolean
    parameters?: boolean
    created_at?: boolean
    completed_at?: boolean
  }, ExtArgs["result"]["optimization_runs"]>

  export type optimization_runsSelectScalar = {
    id?: boolean
    run_id?: boolean
    status?: boolean
    total_objective?: boolean
    execution_time?: boolean
    parameters?: boolean
    created_at?: boolean
    completed_at?: boolean
  }

  export type optimization_runsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "run_id" | "status" | "total_objective" | "execution_time" | "parameters" | "created_at" | "completed_at", ExtArgs["result"]["optimization_runs"]>

  export type $optimization_runsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "optimization_runs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      run_id: string
      status: string | null
      total_objective: number | null
      execution_time: number | null
      parameters: string | null
      created_at: Date | null
      completed_at: Date | null
    }, ExtArgs["result"]["optimization_runs"]>
    composites: {}
  }

  type optimization_runsGetPayload<S extends boolean | null | undefined | optimization_runsDefaultArgs> = $Result.GetResult<Prisma.$optimization_runsPayload, S>

  type optimization_runsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<optimization_runsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Optimization_runsCountAggregateInputType | true
    }

  export interface optimization_runsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['optimization_runs'], meta: { name: 'optimization_runs' } }
    /**
     * Find zero or one Optimization_runs that matches the filter.
     * @param {optimization_runsFindUniqueArgs} args - Arguments to find a Optimization_runs
     * @example
     * // Get one Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends optimization_runsFindUniqueArgs>(args: SelectSubset<T, optimization_runsFindUniqueArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Optimization_runs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {optimization_runsFindUniqueOrThrowArgs} args - Arguments to find a Optimization_runs
     * @example
     * // Get one Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends optimization_runsFindUniqueOrThrowArgs>(args: SelectSubset<T, optimization_runsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Optimization_runs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optimization_runsFindFirstArgs} args - Arguments to find a Optimization_runs
     * @example
     * // Get one Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends optimization_runsFindFirstArgs>(args?: SelectSubset<T, optimization_runsFindFirstArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Optimization_runs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optimization_runsFindFirstOrThrowArgs} args - Arguments to find a Optimization_runs
     * @example
     * // Get one Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends optimization_runsFindFirstOrThrowArgs>(args?: SelectSubset<T, optimization_runsFindFirstOrThrowArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Optimization_runs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optimization_runsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.findMany()
     * 
     * // Get first 10 Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const optimization_runsWithIdOnly = await prisma.optimization_runs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends optimization_runsFindManyArgs>(args?: SelectSubset<T, optimization_runsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Optimization_runs.
     * @param {optimization_runsCreateArgs} args - Arguments to create a Optimization_runs.
     * @example
     * // Create one Optimization_runs
     * const Optimization_runs = await prisma.optimization_runs.create({
     *   data: {
     *     // ... data to create a Optimization_runs
     *   }
     * })
     * 
     */
    create<T extends optimization_runsCreateArgs>(args: SelectSubset<T, optimization_runsCreateArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Optimization_runs.
     * @param {optimization_runsCreateManyArgs} args - Arguments to create many Optimization_runs.
     * @example
     * // Create many Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends optimization_runsCreateManyArgs>(args?: SelectSubset<T, optimization_runsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Optimization_runs and returns the data saved in the database.
     * @param {optimization_runsCreateManyAndReturnArgs} args - Arguments to create many Optimization_runs.
     * @example
     * // Create many Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Optimization_runs and only return the `id`
     * const optimization_runsWithIdOnly = await prisma.optimization_runs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends optimization_runsCreateManyAndReturnArgs>(args?: SelectSubset<T, optimization_runsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Optimization_runs.
     * @param {optimization_runsDeleteArgs} args - Arguments to delete one Optimization_runs.
     * @example
     * // Delete one Optimization_runs
     * const Optimization_runs = await prisma.optimization_runs.delete({
     *   where: {
     *     // ... filter to delete one Optimization_runs
     *   }
     * })
     * 
     */
    delete<T extends optimization_runsDeleteArgs>(args: SelectSubset<T, optimization_runsDeleteArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Optimization_runs.
     * @param {optimization_runsUpdateArgs} args - Arguments to update one Optimization_runs.
     * @example
     * // Update one Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends optimization_runsUpdateArgs>(args: SelectSubset<T, optimization_runsUpdateArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Optimization_runs.
     * @param {optimization_runsDeleteManyArgs} args - Arguments to filter Optimization_runs to delete.
     * @example
     * // Delete a few Optimization_runs
     * const { count } = await prisma.optimization_runs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends optimization_runsDeleteManyArgs>(args?: SelectSubset<T, optimization_runsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Optimization_runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optimization_runsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends optimization_runsUpdateManyArgs>(args: SelectSubset<T, optimization_runsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Optimization_runs and returns the data updated in the database.
     * @param {optimization_runsUpdateManyAndReturnArgs} args - Arguments to update many Optimization_runs.
     * @example
     * // Update many Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Optimization_runs and only return the `id`
     * const optimization_runsWithIdOnly = await prisma.optimization_runs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends optimization_runsUpdateManyAndReturnArgs>(args: SelectSubset<T, optimization_runsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Optimization_runs.
     * @param {optimization_runsUpsertArgs} args - Arguments to update or create a Optimization_runs.
     * @example
     * // Update or create a Optimization_runs
     * const optimization_runs = await prisma.optimization_runs.upsert({
     *   create: {
     *     // ... data to create a Optimization_runs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Optimization_runs we want to update
     *   }
     * })
     */
    upsert<T extends optimization_runsUpsertArgs>(args: SelectSubset<T, optimization_runsUpsertArgs<ExtArgs>>): Prisma__optimization_runsClient<$Result.GetResult<Prisma.$optimization_runsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Optimization_runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optimization_runsCountArgs} args - Arguments to filter Optimization_runs to count.
     * @example
     * // Count the number of Optimization_runs
     * const count = await prisma.optimization_runs.count({
     *   where: {
     *     // ... the filter for the Optimization_runs we want to count
     *   }
     * })
    **/
    count<T extends optimization_runsCountArgs>(
      args?: Subset<T, optimization_runsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Optimization_runsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Optimization_runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Optimization_runsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Optimization_runsAggregateArgs>(args: Subset<T, Optimization_runsAggregateArgs>): Prisma.PrismaPromise<GetOptimization_runsAggregateType<T>>

    /**
     * Group by Optimization_runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {optimization_runsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends optimization_runsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: optimization_runsGroupByArgs['orderBy'] }
        : { orderBy?: optimization_runsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, optimization_runsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOptimization_runsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the optimization_runs model
   */
  readonly fields: optimization_runsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for optimization_runs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__optimization_runsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the optimization_runs model
   */
  interface optimization_runsFieldRefs {
    readonly id: FieldRef<"optimization_runs", 'Int'>
    readonly run_id: FieldRef<"optimization_runs", 'String'>
    readonly status: FieldRef<"optimization_runs", 'String'>
    readonly total_objective: FieldRef<"optimization_runs", 'Float'>
    readonly execution_time: FieldRef<"optimization_runs", 'Float'>
    readonly parameters: FieldRef<"optimization_runs", 'String'>
    readonly created_at: FieldRef<"optimization_runs", 'DateTime'>
    readonly completed_at: FieldRef<"optimization_runs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * optimization_runs findUnique
   */
  export type optimization_runsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * Filter, which optimization_runs to fetch.
     */
    where: optimization_runsWhereUniqueInput
  }

  /**
   * optimization_runs findUniqueOrThrow
   */
  export type optimization_runsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * Filter, which optimization_runs to fetch.
     */
    where: optimization_runsWhereUniqueInput
  }

  /**
   * optimization_runs findFirst
   */
  export type optimization_runsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * Filter, which optimization_runs to fetch.
     */
    where?: optimization_runsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of optimization_runs to fetch.
     */
    orderBy?: optimization_runsOrderByWithRelationInput | optimization_runsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for optimization_runs.
     */
    cursor?: optimization_runsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` optimization_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` optimization_runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of optimization_runs.
     */
    distinct?: Optimization_runsScalarFieldEnum | Optimization_runsScalarFieldEnum[]
  }

  /**
   * optimization_runs findFirstOrThrow
   */
  export type optimization_runsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * Filter, which optimization_runs to fetch.
     */
    where?: optimization_runsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of optimization_runs to fetch.
     */
    orderBy?: optimization_runsOrderByWithRelationInput | optimization_runsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for optimization_runs.
     */
    cursor?: optimization_runsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` optimization_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` optimization_runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of optimization_runs.
     */
    distinct?: Optimization_runsScalarFieldEnum | Optimization_runsScalarFieldEnum[]
  }

  /**
   * optimization_runs findMany
   */
  export type optimization_runsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * Filter, which optimization_runs to fetch.
     */
    where?: optimization_runsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of optimization_runs to fetch.
     */
    orderBy?: optimization_runsOrderByWithRelationInput | optimization_runsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing optimization_runs.
     */
    cursor?: optimization_runsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` optimization_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` optimization_runs.
     */
    skip?: number
    distinct?: Optimization_runsScalarFieldEnum | Optimization_runsScalarFieldEnum[]
  }

  /**
   * optimization_runs create
   */
  export type optimization_runsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * The data needed to create a optimization_runs.
     */
    data: XOR<optimization_runsCreateInput, optimization_runsUncheckedCreateInput>
  }

  /**
   * optimization_runs createMany
   */
  export type optimization_runsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many optimization_runs.
     */
    data: optimization_runsCreateManyInput | optimization_runsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * optimization_runs createManyAndReturn
   */
  export type optimization_runsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * The data used to create many optimization_runs.
     */
    data: optimization_runsCreateManyInput | optimization_runsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * optimization_runs update
   */
  export type optimization_runsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * The data needed to update a optimization_runs.
     */
    data: XOR<optimization_runsUpdateInput, optimization_runsUncheckedUpdateInput>
    /**
     * Choose, which optimization_runs to update.
     */
    where: optimization_runsWhereUniqueInput
  }

  /**
   * optimization_runs updateMany
   */
  export type optimization_runsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update optimization_runs.
     */
    data: XOR<optimization_runsUpdateManyMutationInput, optimization_runsUncheckedUpdateManyInput>
    /**
     * Filter which optimization_runs to update
     */
    where?: optimization_runsWhereInput
    /**
     * Limit how many optimization_runs to update.
     */
    limit?: number
  }

  /**
   * optimization_runs updateManyAndReturn
   */
  export type optimization_runsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * The data used to update optimization_runs.
     */
    data: XOR<optimization_runsUpdateManyMutationInput, optimization_runsUncheckedUpdateManyInput>
    /**
     * Filter which optimization_runs to update
     */
    where?: optimization_runsWhereInput
    /**
     * Limit how many optimization_runs to update.
     */
    limit?: number
  }

  /**
   * optimization_runs upsert
   */
  export type optimization_runsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * The filter to search for the optimization_runs to update in case it exists.
     */
    where: optimization_runsWhereUniqueInput
    /**
     * In case the optimization_runs found by the `where` argument doesn't exist, create a new optimization_runs with this data.
     */
    create: XOR<optimization_runsCreateInput, optimization_runsUncheckedCreateInput>
    /**
     * In case the optimization_runs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<optimization_runsUpdateInput, optimization_runsUncheckedUpdateInput>
  }

  /**
   * optimization_runs delete
   */
  export type optimization_runsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
    /**
     * Filter which optimization_runs to delete.
     */
    where: optimization_runsWhereUniqueInput
  }

  /**
   * optimization_runs deleteMany
   */
  export type optimization_runsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which optimization_runs to delete
     */
    where?: optimization_runsWhereInput
    /**
     * Limit how many optimization_runs to delete.
     */
    limit?: number
  }

  /**
   * optimization_runs without action
   */
  export type optimization_runsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the optimization_runs
     */
    select?: optimization_runsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the optimization_runs
     */
    omit?: optimization_runsOmit<ExtArgs> | null
  }


  /**
   * Model shelves
   */

  export type AggregateShelves = {
    _count: ShelvesCountAggregateOutputType | null
    _avg: ShelvesAvgAggregateOutputType | null
    _sum: ShelvesSumAggregateOutputType | null
    _min: ShelvesMinAggregateOutputType | null
    _max: ShelvesMaxAggregateOutputType | null
  }

  export type ShelvesAvgAggregateOutputType = {
    id: number | null
    shelf_id: number | null
    width: number | null
    height: number | null
    depth: number | null
    weight: number | null
  }

  export type ShelvesSumAggregateOutputType = {
    id: number | null
    shelf_id: number | null
    width: number | null
    height: number | null
    depth: number | null
    weight: number | null
  }

  export type ShelvesMinAggregateOutputType = {
    id: number | null
    shelf_id: number | null
    width: number | null
    height: number | null
    depth: number | null
    weight: number | null
    eye_level: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ShelvesMaxAggregateOutputType = {
    id: number | null
    shelf_id: number | null
    width: number | null
    height: number | null
    depth: number | null
    weight: number | null
    eye_level: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ShelvesCountAggregateOutputType = {
    id: number
    shelf_id: number
    width: number
    height: number
    depth: number
    weight: number
    eye_level: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ShelvesAvgAggregateInputType = {
    id?: true
    shelf_id?: true
    width?: true
    height?: true
    depth?: true
    weight?: true
  }

  export type ShelvesSumAggregateInputType = {
    id?: true
    shelf_id?: true
    width?: true
    height?: true
    depth?: true
    weight?: true
  }

  export type ShelvesMinAggregateInputType = {
    id?: true
    shelf_id?: true
    width?: true
    height?: true
    depth?: true
    weight?: true
    eye_level?: true
    created_at?: true
    updated_at?: true
  }

  export type ShelvesMaxAggregateInputType = {
    id?: true
    shelf_id?: true
    width?: true
    height?: true
    depth?: true
    weight?: true
    eye_level?: true
    created_at?: true
    updated_at?: true
  }

  export type ShelvesCountAggregateInputType = {
    id?: true
    shelf_id?: true
    width?: true
    height?: true
    depth?: true
    weight?: true
    eye_level?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ShelvesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which shelves to aggregate.
     */
    where?: shelvesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shelves to fetch.
     */
    orderBy?: shelvesOrderByWithRelationInput | shelvesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: shelvesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shelves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shelves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned shelves
    **/
    _count?: true | ShelvesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShelvesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShelvesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShelvesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShelvesMaxAggregateInputType
  }

  export type GetShelvesAggregateType<T extends ShelvesAggregateArgs> = {
        [P in keyof T & keyof AggregateShelves]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShelves[P]>
      : GetScalarType<T[P], AggregateShelves[P]>
  }




  export type shelvesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: shelvesWhereInput
    orderBy?: shelvesOrderByWithAggregationInput | shelvesOrderByWithAggregationInput[]
    by: ShelvesScalarFieldEnum[] | ShelvesScalarFieldEnum
    having?: shelvesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShelvesCountAggregateInputType | true
    _avg?: ShelvesAvgAggregateInputType
    _sum?: ShelvesSumAggregateInputType
    _min?: ShelvesMinAggregateInputType
    _max?: ShelvesMaxAggregateInputType
  }

  export type ShelvesGroupByOutputType = {
    id: number
    shelf_id: number
    width: number
    height: number
    depth: number
    weight: number
    eye_level: boolean | null
    created_at: Date | null
    updated_at: Date | null
    _count: ShelvesCountAggregateOutputType | null
    _avg: ShelvesAvgAggregateOutputType | null
    _sum: ShelvesSumAggregateOutputType | null
    _min: ShelvesMinAggregateOutputType | null
    _max: ShelvesMaxAggregateOutputType | null
  }

  type GetShelvesGroupByPayload<T extends shelvesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShelvesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShelvesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShelvesGroupByOutputType[P]>
            : GetScalarType<T[P], ShelvesGroupByOutputType[P]>
        }
      >
    >


  export type shelvesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shelf_id?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    weight?: boolean
    eye_level?: boolean
    created_at?: boolean
    updated_at?: boolean
    InventoryPlacement?: boolean | shelves$InventoryPlacementArgs<ExtArgs>
    _count?: boolean | ShelvesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shelves"]>

  export type shelvesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shelf_id?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    weight?: boolean
    eye_level?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["shelves"]>

  export type shelvesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    shelf_id?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    weight?: boolean
    eye_level?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["shelves"]>

  export type shelvesSelectScalar = {
    id?: boolean
    shelf_id?: boolean
    width?: boolean
    height?: boolean
    depth?: boolean
    weight?: boolean
    eye_level?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type shelvesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "shelf_id" | "width" | "height" | "depth" | "weight" | "eye_level" | "created_at" | "updated_at", ExtArgs["result"]["shelves"]>
  export type shelvesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InventoryPlacement?: boolean | shelves$InventoryPlacementArgs<ExtArgs>
    _count?: boolean | ShelvesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type shelvesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type shelvesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $shelvesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "shelves"
    objects: {
      InventoryPlacement: Prisma.$InventoryPlacementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      shelf_id: number
      width: number
      height: number
      depth: number
      weight: number
      eye_level: boolean | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["shelves"]>
    composites: {}
  }

  type shelvesGetPayload<S extends boolean | null | undefined | shelvesDefaultArgs> = $Result.GetResult<Prisma.$shelvesPayload, S>

  type shelvesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<shelvesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShelvesCountAggregateInputType | true
    }

  export interface shelvesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['shelves'], meta: { name: 'shelves' } }
    /**
     * Find zero or one Shelves that matches the filter.
     * @param {shelvesFindUniqueArgs} args - Arguments to find a Shelves
     * @example
     * // Get one Shelves
     * const shelves = await prisma.shelves.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends shelvesFindUniqueArgs>(args: SelectSubset<T, shelvesFindUniqueArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shelves that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {shelvesFindUniqueOrThrowArgs} args - Arguments to find a Shelves
     * @example
     * // Get one Shelves
     * const shelves = await prisma.shelves.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends shelvesFindUniqueOrThrowArgs>(args: SelectSubset<T, shelvesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shelves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shelvesFindFirstArgs} args - Arguments to find a Shelves
     * @example
     * // Get one Shelves
     * const shelves = await prisma.shelves.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends shelvesFindFirstArgs>(args?: SelectSubset<T, shelvesFindFirstArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shelves that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shelvesFindFirstOrThrowArgs} args - Arguments to find a Shelves
     * @example
     * // Get one Shelves
     * const shelves = await prisma.shelves.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends shelvesFindFirstOrThrowArgs>(args?: SelectSubset<T, shelvesFindFirstOrThrowArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shelves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shelvesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shelves
     * const shelves = await prisma.shelves.findMany()
     * 
     * // Get first 10 Shelves
     * const shelves = await prisma.shelves.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shelvesWithIdOnly = await prisma.shelves.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends shelvesFindManyArgs>(args?: SelectSubset<T, shelvesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shelves.
     * @param {shelvesCreateArgs} args - Arguments to create a Shelves.
     * @example
     * // Create one Shelves
     * const Shelves = await prisma.shelves.create({
     *   data: {
     *     // ... data to create a Shelves
     *   }
     * })
     * 
     */
    create<T extends shelvesCreateArgs>(args: SelectSubset<T, shelvesCreateArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shelves.
     * @param {shelvesCreateManyArgs} args - Arguments to create many Shelves.
     * @example
     * // Create many Shelves
     * const shelves = await prisma.shelves.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends shelvesCreateManyArgs>(args?: SelectSubset<T, shelvesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shelves and returns the data saved in the database.
     * @param {shelvesCreateManyAndReturnArgs} args - Arguments to create many Shelves.
     * @example
     * // Create many Shelves
     * const shelves = await prisma.shelves.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shelves and only return the `id`
     * const shelvesWithIdOnly = await prisma.shelves.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends shelvesCreateManyAndReturnArgs>(args?: SelectSubset<T, shelvesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Shelves.
     * @param {shelvesDeleteArgs} args - Arguments to delete one Shelves.
     * @example
     * // Delete one Shelves
     * const Shelves = await prisma.shelves.delete({
     *   where: {
     *     // ... filter to delete one Shelves
     *   }
     * })
     * 
     */
    delete<T extends shelvesDeleteArgs>(args: SelectSubset<T, shelvesDeleteArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shelves.
     * @param {shelvesUpdateArgs} args - Arguments to update one Shelves.
     * @example
     * // Update one Shelves
     * const shelves = await prisma.shelves.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends shelvesUpdateArgs>(args: SelectSubset<T, shelvesUpdateArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shelves.
     * @param {shelvesDeleteManyArgs} args - Arguments to filter Shelves to delete.
     * @example
     * // Delete a few Shelves
     * const { count } = await prisma.shelves.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends shelvesDeleteManyArgs>(args?: SelectSubset<T, shelvesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shelves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shelvesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shelves
     * const shelves = await prisma.shelves.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends shelvesUpdateManyArgs>(args: SelectSubset<T, shelvesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shelves and returns the data updated in the database.
     * @param {shelvesUpdateManyAndReturnArgs} args - Arguments to update many Shelves.
     * @example
     * // Update many Shelves
     * const shelves = await prisma.shelves.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shelves and only return the `id`
     * const shelvesWithIdOnly = await prisma.shelves.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends shelvesUpdateManyAndReturnArgs>(args: SelectSubset<T, shelvesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Shelves.
     * @param {shelvesUpsertArgs} args - Arguments to update or create a Shelves.
     * @example
     * // Update or create a Shelves
     * const shelves = await prisma.shelves.upsert({
     *   create: {
     *     // ... data to create a Shelves
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shelves we want to update
     *   }
     * })
     */
    upsert<T extends shelvesUpsertArgs>(args: SelectSubset<T, shelvesUpsertArgs<ExtArgs>>): Prisma__shelvesClient<$Result.GetResult<Prisma.$shelvesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shelves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shelvesCountArgs} args - Arguments to filter Shelves to count.
     * @example
     * // Count the number of Shelves
     * const count = await prisma.shelves.count({
     *   where: {
     *     // ... the filter for the Shelves we want to count
     *   }
     * })
    **/
    count<T extends shelvesCountArgs>(
      args?: Subset<T, shelvesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShelvesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shelves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShelvesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShelvesAggregateArgs>(args: Subset<T, ShelvesAggregateArgs>): Prisma.PrismaPromise<GetShelvesAggregateType<T>>

    /**
     * Group by Shelves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shelvesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends shelvesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: shelvesGroupByArgs['orderBy'] }
        : { orderBy?: shelvesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, shelvesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShelvesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the shelves model
   */
  readonly fields: shelvesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for shelves.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__shelvesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    InventoryPlacement<T extends shelves$InventoryPlacementArgs<ExtArgs> = {}>(args?: Subset<T, shelves$InventoryPlacementArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InventoryPlacementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the shelves model
   */
  interface shelvesFieldRefs {
    readonly id: FieldRef<"shelves", 'Int'>
    readonly shelf_id: FieldRef<"shelves", 'Int'>
    readonly width: FieldRef<"shelves", 'Float'>
    readonly height: FieldRef<"shelves", 'Float'>
    readonly depth: FieldRef<"shelves", 'Float'>
    readonly weight: FieldRef<"shelves", 'Float'>
    readonly eye_level: FieldRef<"shelves", 'Boolean'>
    readonly created_at: FieldRef<"shelves", 'DateTime'>
    readonly updated_at: FieldRef<"shelves", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * shelves findUnique
   */
  export type shelvesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * Filter, which shelves to fetch.
     */
    where: shelvesWhereUniqueInput
  }

  /**
   * shelves findUniqueOrThrow
   */
  export type shelvesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * Filter, which shelves to fetch.
     */
    where: shelvesWhereUniqueInput
  }

  /**
   * shelves findFirst
   */
  export type shelvesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * Filter, which shelves to fetch.
     */
    where?: shelvesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shelves to fetch.
     */
    orderBy?: shelvesOrderByWithRelationInput | shelvesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shelves.
     */
    cursor?: shelvesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shelves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shelves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shelves.
     */
    distinct?: ShelvesScalarFieldEnum | ShelvesScalarFieldEnum[]
  }

  /**
   * shelves findFirstOrThrow
   */
  export type shelvesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * Filter, which shelves to fetch.
     */
    where?: shelvesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shelves to fetch.
     */
    orderBy?: shelvesOrderByWithRelationInput | shelvesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shelves.
     */
    cursor?: shelvesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shelves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shelves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shelves.
     */
    distinct?: ShelvesScalarFieldEnum | ShelvesScalarFieldEnum[]
  }

  /**
   * shelves findMany
   */
  export type shelvesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * Filter, which shelves to fetch.
     */
    where?: shelvesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shelves to fetch.
     */
    orderBy?: shelvesOrderByWithRelationInput | shelvesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing shelves.
     */
    cursor?: shelvesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shelves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shelves.
     */
    skip?: number
    distinct?: ShelvesScalarFieldEnum | ShelvesScalarFieldEnum[]
  }

  /**
   * shelves create
   */
  export type shelvesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * The data needed to create a shelves.
     */
    data: XOR<shelvesCreateInput, shelvesUncheckedCreateInput>
  }

  /**
   * shelves createMany
   */
  export type shelvesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many shelves.
     */
    data: shelvesCreateManyInput | shelvesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * shelves createManyAndReturn
   */
  export type shelvesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * The data used to create many shelves.
     */
    data: shelvesCreateManyInput | shelvesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * shelves update
   */
  export type shelvesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * The data needed to update a shelves.
     */
    data: XOR<shelvesUpdateInput, shelvesUncheckedUpdateInput>
    /**
     * Choose, which shelves to update.
     */
    where: shelvesWhereUniqueInput
  }

  /**
   * shelves updateMany
   */
  export type shelvesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update shelves.
     */
    data: XOR<shelvesUpdateManyMutationInput, shelvesUncheckedUpdateManyInput>
    /**
     * Filter which shelves to update
     */
    where?: shelvesWhereInput
    /**
     * Limit how many shelves to update.
     */
    limit?: number
  }

  /**
   * shelves updateManyAndReturn
   */
  export type shelvesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * The data used to update shelves.
     */
    data: XOR<shelvesUpdateManyMutationInput, shelvesUncheckedUpdateManyInput>
    /**
     * Filter which shelves to update
     */
    where?: shelvesWhereInput
    /**
     * Limit how many shelves to update.
     */
    limit?: number
  }

  /**
   * shelves upsert
   */
  export type shelvesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * The filter to search for the shelves to update in case it exists.
     */
    where: shelvesWhereUniqueInput
    /**
     * In case the shelves found by the `where` argument doesn't exist, create a new shelves with this data.
     */
    create: XOR<shelvesCreateInput, shelvesUncheckedCreateInput>
    /**
     * In case the shelves was found with the provided `where` argument, update it with this data.
     */
    update: XOR<shelvesUpdateInput, shelvesUncheckedUpdateInput>
  }

  /**
   * shelves delete
   */
  export type shelvesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
    /**
     * Filter which shelves to delete.
     */
    where: shelvesWhereUniqueInput
  }

  /**
   * shelves deleteMany
   */
  export type shelvesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which shelves to delete
     */
    where?: shelvesWhereInput
    /**
     * Limit how many shelves to delete.
     */
    limit?: number
  }

  /**
   * shelves.InventoryPlacement
   */
  export type shelves$InventoryPlacementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryPlacement
     */
    select?: InventoryPlacementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InventoryPlacement
     */
    omit?: InventoryPlacementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InventoryPlacementInclude<ExtArgs> | null
    where?: InventoryPlacementWhereInput
    orderBy?: InventoryPlacementOrderByWithRelationInput | InventoryPlacementOrderByWithRelationInput[]
    cursor?: InventoryPlacementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InventoryPlacementScalarFieldEnum | InventoryPlacementScalarFieldEnum[]
  }

  /**
   * shelves without action
   */
  export type shelvesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shelves
     */
    select?: shelvesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shelves
     */
    omit?: shelvesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shelvesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const InventoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    quantity: 'quantity',
    width: 'width',
    height: 'height',
    depth: 'depth',
    price: 'price',
    weight: 'weight',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InventoryScalarFieldEnum = (typeof InventoryScalarFieldEnum)[keyof typeof InventoryScalarFieldEnum]


  export const InventoryPlacementScalarFieldEnum: {
    id: 'id',
    inventoryId: 'inventoryId',
    shelfId: 'shelfId'
  };

  export type InventoryPlacementScalarFieldEnum = (typeof InventoryPlacementScalarFieldEnum)[keyof typeof InventoryPlacementScalarFieldEnum]


  export const Optimization_runsScalarFieldEnum: {
    id: 'id',
    run_id: 'run_id',
    status: 'status',
    total_objective: 'total_objective',
    execution_time: 'execution_time',
    parameters: 'parameters',
    created_at: 'created_at',
    completed_at: 'completed_at'
  };

  export type Optimization_runsScalarFieldEnum = (typeof Optimization_runsScalarFieldEnum)[keyof typeof Optimization_runsScalarFieldEnum]


  export const ShelvesScalarFieldEnum: {
    id: 'id',
    shelf_id: 'shelf_id',
    width: 'width',
    height: 'height',
    depth: 'depth',
    weight: 'weight',
    eye_level: 'eye_level',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ShelvesScalarFieldEnum = (typeof ShelvesScalarFieldEnum)[keyof typeof ShelvesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type InventoryWhereInput = {
    AND?: InventoryWhereInput | InventoryWhereInput[]
    OR?: InventoryWhereInput[]
    NOT?: InventoryWhereInput | InventoryWhereInput[]
    id?: IntFilter<"Inventory"> | number
    name?: StringFilter<"Inventory"> | string
    description?: StringFilter<"Inventory"> | string
    quantity?: IntFilter<"Inventory"> | number
    width?: FloatFilter<"Inventory"> | number
    height?: FloatFilter<"Inventory"> | number
    depth?: FloatFilter<"Inventory"> | number
    price?: FloatFilter<"Inventory"> | number
    weight?: FloatFilter<"Inventory"> | number
    createdAt?: DateTimeFilter<"Inventory"> | Date | string
    updatedAt?: DateTimeFilter<"Inventory"> | Date | string
    InventoryPlacement?: InventoryPlacementListRelationFilter
  }

  export type InventoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    price?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    InventoryPlacement?: InventoryPlacementOrderByRelationAggregateInput
  }

  export type InventoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InventoryWhereInput | InventoryWhereInput[]
    OR?: InventoryWhereInput[]
    NOT?: InventoryWhereInput | InventoryWhereInput[]
    name?: StringFilter<"Inventory"> | string
    description?: StringFilter<"Inventory"> | string
    quantity?: IntFilter<"Inventory"> | number
    width?: FloatFilter<"Inventory"> | number
    height?: FloatFilter<"Inventory"> | number
    depth?: FloatFilter<"Inventory"> | number
    price?: FloatFilter<"Inventory"> | number
    weight?: FloatFilter<"Inventory"> | number
    createdAt?: DateTimeFilter<"Inventory"> | Date | string
    updatedAt?: DateTimeFilter<"Inventory"> | Date | string
    InventoryPlacement?: InventoryPlacementListRelationFilter
  }, "id">

  export type InventoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    price?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InventoryCountOrderByAggregateInput
    _avg?: InventoryAvgOrderByAggregateInput
    _max?: InventoryMaxOrderByAggregateInput
    _min?: InventoryMinOrderByAggregateInput
    _sum?: InventorySumOrderByAggregateInput
  }

  export type InventoryScalarWhereWithAggregatesInput = {
    AND?: InventoryScalarWhereWithAggregatesInput | InventoryScalarWhereWithAggregatesInput[]
    OR?: InventoryScalarWhereWithAggregatesInput[]
    NOT?: InventoryScalarWhereWithAggregatesInput | InventoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Inventory"> | number
    name?: StringWithAggregatesFilter<"Inventory"> | string
    description?: StringWithAggregatesFilter<"Inventory"> | string
    quantity?: IntWithAggregatesFilter<"Inventory"> | number
    width?: FloatWithAggregatesFilter<"Inventory"> | number
    height?: FloatWithAggregatesFilter<"Inventory"> | number
    depth?: FloatWithAggregatesFilter<"Inventory"> | number
    price?: FloatWithAggregatesFilter<"Inventory"> | number
    weight?: FloatWithAggregatesFilter<"Inventory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Inventory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Inventory"> | Date | string
  }

  export type InventoryPlacementWhereInput = {
    AND?: InventoryPlacementWhereInput | InventoryPlacementWhereInput[]
    OR?: InventoryPlacementWhereInput[]
    NOT?: InventoryPlacementWhereInput | InventoryPlacementWhereInput[]
    id?: StringFilter<"InventoryPlacement"> | string
    inventoryId?: IntFilter<"InventoryPlacement"> | number
    shelfId?: IntFilter<"InventoryPlacement"> | number
    inventory?: XOR<InventoryScalarRelationFilter, InventoryWhereInput>
    shelf?: XOR<ShelvesScalarRelationFilter, shelvesWhereInput>
  }

  export type InventoryPlacementOrderByWithRelationInput = {
    id?: SortOrder
    inventoryId?: SortOrder
    shelfId?: SortOrder
    inventory?: InventoryOrderByWithRelationInput
    shelf?: shelvesOrderByWithRelationInput
  }

  export type InventoryPlacementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InventoryPlacementWhereInput | InventoryPlacementWhereInput[]
    OR?: InventoryPlacementWhereInput[]
    NOT?: InventoryPlacementWhereInput | InventoryPlacementWhereInput[]
    inventoryId?: IntFilter<"InventoryPlacement"> | number
    shelfId?: IntFilter<"InventoryPlacement"> | number
    inventory?: XOR<InventoryScalarRelationFilter, InventoryWhereInput>
    shelf?: XOR<ShelvesScalarRelationFilter, shelvesWhereInput>
  }, "id">

  export type InventoryPlacementOrderByWithAggregationInput = {
    id?: SortOrder
    inventoryId?: SortOrder
    shelfId?: SortOrder
    _count?: InventoryPlacementCountOrderByAggregateInput
    _avg?: InventoryPlacementAvgOrderByAggregateInput
    _max?: InventoryPlacementMaxOrderByAggregateInput
    _min?: InventoryPlacementMinOrderByAggregateInput
    _sum?: InventoryPlacementSumOrderByAggregateInput
  }

  export type InventoryPlacementScalarWhereWithAggregatesInput = {
    AND?: InventoryPlacementScalarWhereWithAggregatesInput | InventoryPlacementScalarWhereWithAggregatesInput[]
    OR?: InventoryPlacementScalarWhereWithAggregatesInput[]
    NOT?: InventoryPlacementScalarWhereWithAggregatesInput | InventoryPlacementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InventoryPlacement"> | string
    inventoryId?: IntWithAggregatesFilter<"InventoryPlacement"> | number
    shelfId?: IntWithAggregatesFilter<"InventoryPlacement"> | number
  }

  export type optimization_runsWhereInput = {
    AND?: optimization_runsWhereInput | optimization_runsWhereInput[]
    OR?: optimization_runsWhereInput[]
    NOT?: optimization_runsWhereInput | optimization_runsWhereInput[]
    id?: IntFilter<"optimization_runs"> | number
    run_id?: StringFilter<"optimization_runs"> | string
    status?: StringNullableFilter<"optimization_runs"> | string | null
    total_objective?: FloatNullableFilter<"optimization_runs"> | number | null
    execution_time?: FloatNullableFilter<"optimization_runs"> | number | null
    parameters?: StringNullableFilter<"optimization_runs"> | string | null
    created_at?: DateTimeNullableFilter<"optimization_runs"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"optimization_runs"> | Date | string | null
  }

  export type optimization_runsOrderByWithRelationInput = {
    id?: SortOrder
    run_id?: SortOrder
    status?: SortOrderInput | SortOrder
    total_objective?: SortOrderInput | SortOrder
    execution_time?: SortOrderInput | SortOrder
    parameters?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
  }

  export type optimization_runsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    run_id?: string
    AND?: optimization_runsWhereInput | optimization_runsWhereInput[]
    OR?: optimization_runsWhereInput[]
    NOT?: optimization_runsWhereInput | optimization_runsWhereInput[]
    status?: StringNullableFilter<"optimization_runs"> | string | null
    total_objective?: FloatNullableFilter<"optimization_runs"> | number | null
    execution_time?: FloatNullableFilter<"optimization_runs"> | number | null
    parameters?: StringNullableFilter<"optimization_runs"> | string | null
    created_at?: DateTimeNullableFilter<"optimization_runs"> | Date | string | null
    completed_at?: DateTimeNullableFilter<"optimization_runs"> | Date | string | null
  }, "id" | "run_id">

  export type optimization_runsOrderByWithAggregationInput = {
    id?: SortOrder
    run_id?: SortOrder
    status?: SortOrderInput | SortOrder
    total_objective?: SortOrderInput | SortOrder
    execution_time?: SortOrderInput | SortOrder
    parameters?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    _count?: optimization_runsCountOrderByAggregateInput
    _avg?: optimization_runsAvgOrderByAggregateInput
    _max?: optimization_runsMaxOrderByAggregateInput
    _min?: optimization_runsMinOrderByAggregateInput
    _sum?: optimization_runsSumOrderByAggregateInput
  }

  export type optimization_runsScalarWhereWithAggregatesInput = {
    AND?: optimization_runsScalarWhereWithAggregatesInput | optimization_runsScalarWhereWithAggregatesInput[]
    OR?: optimization_runsScalarWhereWithAggregatesInput[]
    NOT?: optimization_runsScalarWhereWithAggregatesInput | optimization_runsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"optimization_runs"> | number
    run_id?: StringWithAggregatesFilter<"optimization_runs"> | string
    status?: StringNullableWithAggregatesFilter<"optimization_runs"> | string | null
    total_objective?: FloatNullableWithAggregatesFilter<"optimization_runs"> | number | null
    execution_time?: FloatNullableWithAggregatesFilter<"optimization_runs"> | number | null
    parameters?: StringNullableWithAggregatesFilter<"optimization_runs"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"optimization_runs"> | Date | string | null
    completed_at?: DateTimeNullableWithAggregatesFilter<"optimization_runs"> | Date | string | null
  }

  export type shelvesWhereInput = {
    AND?: shelvesWhereInput | shelvesWhereInput[]
    OR?: shelvesWhereInput[]
    NOT?: shelvesWhereInput | shelvesWhereInput[]
    id?: IntFilter<"shelves"> | number
    shelf_id?: IntFilter<"shelves"> | number
    width?: FloatFilter<"shelves"> | number
    height?: FloatFilter<"shelves"> | number
    depth?: FloatFilter<"shelves"> | number
    weight?: FloatFilter<"shelves"> | number
    eye_level?: BoolNullableFilter<"shelves"> | boolean | null
    created_at?: DateTimeNullableFilter<"shelves"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"shelves"> | Date | string | null
    InventoryPlacement?: InventoryPlacementListRelationFilter
  }

  export type shelvesOrderByWithRelationInput = {
    id?: SortOrder
    shelf_id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    weight?: SortOrder
    eye_level?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    InventoryPlacement?: InventoryPlacementOrderByRelationAggregateInput
  }

  export type shelvesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    shelf_id?: number
    AND?: shelvesWhereInput | shelvesWhereInput[]
    OR?: shelvesWhereInput[]
    NOT?: shelvesWhereInput | shelvesWhereInput[]
    width?: FloatFilter<"shelves"> | number
    height?: FloatFilter<"shelves"> | number
    depth?: FloatFilter<"shelves"> | number
    weight?: FloatFilter<"shelves"> | number
    eye_level?: BoolNullableFilter<"shelves"> | boolean | null
    created_at?: DateTimeNullableFilter<"shelves"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"shelves"> | Date | string | null
    InventoryPlacement?: InventoryPlacementListRelationFilter
  }, "id" | "shelf_id">

  export type shelvesOrderByWithAggregationInput = {
    id?: SortOrder
    shelf_id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    weight?: SortOrder
    eye_level?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: shelvesCountOrderByAggregateInput
    _avg?: shelvesAvgOrderByAggregateInput
    _max?: shelvesMaxOrderByAggregateInput
    _min?: shelvesMinOrderByAggregateInput
    _sum?: shelvesSumOrderByAggregateInput
  }

  export type shelvesScalarWhereWithAggregatesInput = {
    AND?: shelvesScalarWhereWithAggregatesInput | shelvesScalarWhereWithAggregatesInput[]
    OR?: shelvesScalarWhereWithAggregatesInput[]
    NOT?: shelvesScalarWhereWithAggregatesInput | shelvesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"shelves"> | number
    shelf_id?: IntWithAggregatesFilter<"shelves"> | number
    width?: FloatWithAggregatesFilter<"shelves"> | number
    height?: FloatWithAggregatesFilter<"shelves"> | number
    depth?: FloatWithAggregatesFilter<"shelves"> | number
    weight?: FloatWithAggregatesFilter<"shelves"> | number
    eye_level?: BoolNullableWithAggregatesFilter<"shelves"> | boolean | null
    created_at?: DateTimeNullableWithAggregatesFilter<"shelves"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"shelves"> | Date | string | null
  }

  export type InventoryCreateInput = {
    name: string
    description: string
    quantity: number
    width: number
    height: number
    depth: number
    price: number
    weight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    InventoryPlacement?: InventoryPlacementCreateNestedManyWithoutInventoryInput
  }

  export type InventoryUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    quantity: number
    width: number
    height: number
    depth: number
    price: number
    weight: number
    createdAt?: Date | string
    updatedAt?: Date | string
    InventoryPlacement?: InventoryPlacementUncheckedCreateNestedManyWithoutInventoryInput
  }

  export type InventoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    InventoryPlacement?: InventoryPlacementUpdateManyWithoutInventoryNestedInput
  }

  export type InventoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    InventoryPlacement?: InventoryPlacementUncheckedUpdateManyWithoutInventoryNestedInput
  }

  export type InventoryCreateManyInput = {
    id?: number
    name: string
    description: string
    quantity: number
    width: number
    height: number
    depth: number
    price: number
    weight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryPlacementCreateInput = {
    id?: string
    inventory: InventoryCreateNestedOneWithoutInventoryPlacementInput
    shelf: shelvesCreateNestedOneWithoutInventoryPlacementInput
  }

  export type InventoryPlacementUncheckedCreateInput = {
    id?: string
    inventoryId: number
    shelfId: number
  }

  export type InventoryPlacementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inventory?: InventoryUpdateOneRequiredWithoutInventoryPlacementNestedInput
    shelf?: shelvesUpdateOneRequiredWithoutInventoryPlacementNestedInput
  }

  export type InventoryPlacementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inventoryId?: IntFieldUpdateOperationsInput | number
    shelfId?: IntFieldUpdateOperationsInput | number
  }

  export type InventoryPlacementCreateManyInput = {
    id?: string
    inventoryId: number
    shelfId: number
  }

  export type InventoryPlacementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type InventoryPlacementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inventoryId?: IntFieldUpdateOperationsInput | number
    shelfId?: IntFieldUpdateOperationsInput | number
  }

  export type optimization_runsCreateInput = {
    run_id: string
    status?: string | null
    total_objective?: number | null
    execution_time?: number | null
    parameters?: string | null
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type optimization_runsUncheckedCreateInput = {
    id?: number
    run_id: string
    status?: string | null
    total_objective?: number | null
    execution_time?: number | null
    parameters?: string | null
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type optimization_runsUpdateInput = {
    run_id?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    total_objective?: NullableFloatFieldUpdateOperationsInput | number | null
    execution_time?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type optimization_runsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    run_id?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    total_objective?: NullableFloatFieldUpdateOperationsInput | number | null
    execution_time?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type optimization_runsCreateManyInput = {
    id?: number
    run_id: string
    status?: string | null
    total_objective?: number | null
    execution_time?: number | null
    parameters?: string | null
    created_at?: Date | string | null
    completed_at?: Date | string | null
  }

  export type optimization_runsUpdateManyMutationInput = {
    run_id?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    total_objective?: NullableFloatFieldUpdateOperationsInput | number | null
    execution_time?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type optimization_runsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    run_id?: StringFieldUpdateOperationsInput | string
    status?: NullableStringFieldUpdateOperationsInput | string | null
    total_objective?: NullableFloatFieldUpdateOperationsInput | number | null
    execution_time?: NullableFloatFieldUpdateOperationsInput | number | null
    parameters?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type shelvesCreateInput = {
    shelf_id: number
    width: number
    height: number
    depth: number
    weight: number
    eye_level?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    InventoryPlacement?: InventoryPlacementCreateNestedManyWithoutShelfInput
  }

  export type shelvesUncheckedCreateInput = {
    id?: number
    shelf_id: number
    width: number
    height: number
    depth: number
    weight: number
    eye_level?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    InventoryPlacement?: InventoryPlacementUncheckedCreateNestedManyWithoutShelfInput
  }

  export type shelvesUpdateInput = {
    shelf_id?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    eye_level?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    InventoryPlacement?: InventoryPlacementUpdateManyWithoutShelfNestedInput
  }

  export type shelvesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    shelf_id?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    eye_level?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    InventoryPlacement?: InventoryPlacementUncheckedUpdateManyWithoutShelfNestedInput
  }

  export type shelvesCreateManyInput = {
    id?: number
    shelf_id: number
    width: number
    height: number
    depth: number
    weight: number
    eye_level?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type shelvesUpdateManyMutationInput = {
    shelf_id?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    eye_level?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type shelvesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    shelf_id?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    eye_level?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InventoryPlacementListRelationFilter = {
    every?: InventoryPlacementWhereInput
    some?: InventoryPlacementWhereInput
    none?: InventoryPlacementWhereInput
  }

  export type InventoryPlacementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InventoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    price?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    price?: SortOrder
    weight?: SortOrder
  }

  export type InventoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    price?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    quantity?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    price?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InventorySumOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    price?: SortOrder
    weight?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type InventoryScalarRelationFilter = {
    is?: InventoryWhereInput
    isNot?: InventoryWhereInput
  }

  export type ShelvesScalarRelationFilter = {
    is?: shelvesWhereInput
    isNot?: shelvesWhereInput
  }

  export type InventoryPlacementCountOrderByAggregateInput = {
    id?: SortOrder
    inventoryId?: SortOrder
    shelfId?: SortOrder
  }

  export type InventoryPlacementAvgOrderByAggregateInput = {
    inventoryId?: SortOrder
    shelfId?: SortOrder
  }

  export type InventoryPlacementMaxOrderByAggregateInput = {
    id?: SortOrder
    inventoryId?: SortOrder
    shelfId?: SortOrder
  }

  export type InventoryPlacementMinOrderByAggregateInput = {
    id?: SortOrder
    inventoryId?: SortOrder
    shelfId?: SortOrder
  }

  export type InventoryPlacementSumOrderByAggregateInput = {
    inventoryId?: SortOrder
    shelfId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type optimization_runsCountOrderByAggregateInput = {
    id?: SortOrder
    run_id?: SortOrder
    status?: SortOrder
    total_objective?: SortOrder
    execution_time?: SortOrder
    parameters?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
  }

  export type optimization_runsAvgOrderByAggregateInput = {
    id?: SortOrder
    total_objective?: SortOrder
    execution_time?: SortOrder
  }

  export type optimization_runsMaxOrderByAggregateInput = {
    id?: SortOrder
    run_id?: SortOrder
    status?: SortOrder
    total_objective?: SortOrder
    execution_time?: SortOrder
    parameters?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
  }

  export type optimization_runsMinOrderByAggregateInput = {
    id?: SortOrder
    run_id?: SortOrder
    status?: SortOrder
    total_objective?: SortOrder
    execution_time?: SortOrder
    parameters?: SortOrder
    created_at?: SortOrder
    completed_at?: SortOrder
  }

  export type optimization_runsSumOrderByAggregateInput = {
    id?: SortOrder
    total_objective?: SortOrder
    execution_time?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type shelvesCountOrderByAggregateInput = {
    id?: SortOrder
    shelf_id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    weight?: SortOrder
    eye_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type shelvesAvgOrderByAggregateInput = {
    id?: SortOrder
    shelf_id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    weight?: SortOrder
  }

  export type shelvesMaxOrderByAggregateInput = {
    id?: SortOrder
    shelf_id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    weight?: SortOrder
    eye_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type shelvesMinOrderByAggregateInput = {
    id?: SortOrder
    shelf_id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    weight?: SortOrder
    eye_level?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type shelvesSumOrderByAggregateInput = {
    id?: SortOrder
    shelf_id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    depth?: SortOrder
    weight?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type InventoryPlacementCreateNestedManyWithoutInventoryInput = {
    create?: XOR<InventoryPlacementCreateWithoutInventoryInput, InventoryPlacementUncheckedCreateWithoutInventoryInput> | InventoryPlacementCreateWithoutInventoryInput[] | InventoryPlacementUncheckedCreateWithoutInventoryInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutInventoryInput | InventoryPlacementCreateOrConnectWithoutInventoryInput[]
    createMany?: InventoryPlacementCreateManyInventoryInputEnvelope
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
  }

  export type InventoryPlacementUncheckedCreateNestedManyWithoutInventoryInput = {
    create?: XOR<InventoryPlacementCreateWithoutInventoryInput, InventoryPlacementUncheckedCreateWithoutInventoryInput> | InventoryPlacementCreateWithoutInventoryInput[] | InventoryPlacementUncheckedCreateWithoutInventoryInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutInventoryInput | InventoryPlacementCreateOrConnectWithoutInventoryInput[]
    createMany?: InventoryPlacementCreateManyInventoryInputEnvelope
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InventoryPlacementUpdateManyWithoutInventoryNestedInput = {
    create?: XOR<InventoryPlacementCreateWithoutInventoryInput, InventoryPlacementUncheckedCreateWithoutInventoryInput> | InventoryPlacementCreateWithoutInventoryInput[] | InventoryPlacementUncheckedCreateWithoutInventoryInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutInventoryInput | InventoryPlacementCreateOrConnectWithoutInventoryInput[]
    upsert?: InventoryPlacementUpsertWithWhereUniqueWithoutInventoryInput | InventoryPlacementUpsertWithWhereUniqueWithoutInventoryInput[]
    createMany?: InventoryPlacementCreateManyInventoryInputEnvelope
    set?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    disconnect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    delete?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    update?: InventoryPlacementUpdateWithWhereUniqueWithoutInventoryInput | InventoryPlacementUpdateWithWhereUniqueWithoutInventoryInput[]
    updateMany?: InventoryPlacementUpdateManyWithWhereWithoutInventoryInput | InventoryPlacementUpdateManyWithWhereWithoutInventoryInput[]
    deleteMany?: InventoryPlacementScalarWhereInput | InventoryPlacementScalarWhereInput[]
  }

  export type InventoryPlacementUncheckedUpdateManyWithoutInventoryNestedInput = {
    create?: XOR<InventoryPlacementCreateWithoutInventoryInput, InventoryPlacementUncheckedCreateWithoutInventoryInput> | InventoryPlacementCreateWithoutInventoryInput[] | InventoryPlacementUncheckedCreateWithoutInventoryInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutInventoryInput | InventoryPlacementCreateOrConnectWithoutInventoryInput[]
    upsert?: InventoryPlacementUpsertWithWhereUniqueWithoutInventoryInput | InventoryPlacementUpsertWithWhereUniqueWithoutInventoryInput[]
    createMany?: InventoryPlacementCreateManyInventoryInputEnvelope
    set?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    disconnect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    delete?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    update?: InventoryPlacementUpdateWithWhereUniqueWithoutInventoryInput | InventoryPlacementUpdateWithWhereUniqueWithoutInventoryInput[]
    updateMany?: InventoryPlacementUpdateManyWithWhereWithoutInventoryInput | InventoryPlacementUpdateManyWithWhereWithoutInventoryInput[]
    deleteMany?: InventoryPlacementScalarWhereInput | InventoryPlacementScalarWhereInput[]
  }

  export type InventoryCreateNestedOneWithoutInventoryPlacementInput = {
    create?: XOR<InventoryCreateWithoutInventoryPlacementInput, InventoryUncheckedCreateWithoutInventoryPlacementInput>
    connectOrCreate?: InventoryCreateOrConnectWithoutInventoryPlacementInput
    connect?: InventoryWhereUniqueInput
  }

  export type shelvesCreateNestedOneWithoutInventoryPlacementInput = {
    create?: XOR<shelvesCreateWithoutInventoryPlacementInput, shelvesUncheckedCreateWithoutInventoryPlacementInput>
    connectOrCreate?: shelvesCreateOrConnectWithoutInventoryPlacementInput
    connect?: shelvesWhereUniqueInput
  }

  export type InventoryUpdateOneRequiredWithoutInventoryPlacementNestedInput = {
    create?: XOR<InventoryCreateWithoutInventoryPlacementInput, InventoryUncheckedCreateWithoutInventoryPlacementInput>
    connectOrCreate?: InventoryCreateOrConnectWithoutInventoryPlacementInput
    upsert?: InventoryUpsertWithoutInventoryPlacementInput
    connect?: InventoryWhereUniqueInput
    update?: XOR<XOR<InventoryUpdateToOneWithWhereWithoutInventoryPlacementInput, InventoryUpdateWithoutInventoryPlacementInput>, InventoryUncheckedUpdateWithoutInventoryPlacementInput>
  }

  export type shelvesUpdateOneRequiredWithoutInventoryPlacementNestedInput = {
    create?: XOR<shelvesCreateWithoutInventoryPlacementInput, shelvesUncheckedCreateWithoutInventoryPlacementInput>
    connectOrCreate?: shelvesCreateOrConnectWithoutInventoryPlacementInput
    upsert?: shelvesUpsertWithoutInventoryPlacementInput
    connect?: shelvesWhereUniqueInput
    update?: XOR<XOR<shelvesUpdateToOneWithWhereWithoutInventoryPlacementInput, shelvesUpdateWithoutInventoryPlacementInput>, shelvesUncheckedUpdateWithoutInventoryPlacementInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type InventoryPlacementCreateNestedManyWithoutShelfInput = {
    create?: XOR<InventoryPlacementCreateWithoutShelfInput, InventoryPlacementUncheckedCreateWithoutShelfInput> | InventoryPlacementCreateWithoutShelfInput[] | InventoryPlacementUncheckedCreateWithoutShelfInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutShelfInput | InventoryPlacementCreateOrConnectWithoutShelfInput[]
    createMany?: InventoryPlacementCreateManyShelfInputEnvelope
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
  }

  export type InventoryPlacementUncheckedCreateNestedManyWithoutShelfInput = {
    create?: XOR<InventoryPlacementCreateWithoutShelfInput, InventoryPlacementUncheckedCreateWithoutShelfInput> | InventoryPlacementCreateWithoutShelfInput[] | InventoryPlacementUncheckedCreateWithoutShelfInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutShelfInput | InventoryPlacementCreateOrConnectWithoutShelfInput[]
    createMany?: InventoryPlacementCreateManyShelfInputEnvelope
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type InventoryPlacementUpdateManyWithoutShelfNestedInput = {
    create?: XOR<InventoryPlacementCreateWithoutShelfInput, InventoryPlacementUncheckedCreateWithoutShelfInput> | InventoryPlacementCreateWithoutShelfInput[] | InventoryPlacementUncheckedCreateWithoutShelfInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutShelfInput | InventoryPlacementCreateOrConnectWithoutShelfInput[]
    upsert?: InventoryPlacementUpsertWithWhereUniqueWithoutShelfInput | InventoryPlacementUpsertWithWhereUniqueWithoutShelfInput[]
    createMany?: InventoryPlacementCreateManyShelfInputEnvelope
    set?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    disconnect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    delete?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    update?: InventoryPlacementUpdateWithWhereUniqueWithoutShelfInput | InventoryPlacementUpdateWithWhereUniqueWithoutShelfInput[]
    updateMany?: InventoryPlacementUpdateManyWithWhereWithoutShelfInput | InventoryPlacementUpdateManyWithWhereWithoutShelfInput[]
    deleteMany?: InventoryPlacementScalarWhereInput | InventoryPlacementScalarWhereInput[]
  }

  export type InventoryPlacementUncheckedUpdateManyWithoutShelfNestedInput = {
    create?: XOR<InventoryPlacementCreateWithoutShelfInput, InventoryPlacementUncheckedCreateWithoutShelfInput> | InventoryPlacementCreateWithoutShelfInput[] | InventoryPlacementUncheckedCreateWithoutShelfInput[]
    connectOrCreate?: InventoryPlacementCreateOrConnectWithoutShelfInput | InventoryPlacementCreateOrConnectWithoutShelfInput[]
    upsert?: InventoryPlacementUpsertWithWhereUniqueWithoutShelfInput | InventoryPlacementUpsertWithWhereUniqueWithoutShelfInput[]
    createMany?: InventoryPlacementCreateManyShelfInputEnvelope
    set?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    disconnect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    delete?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    connect?: InventoryPlacementWhereUniqueInput | InventoryPlacementWhereUniqueInput[]
    update?: InventoryPlacementUpdateWithWhereUniqueWithoutShelfInput | InventoryPlacementUpdateWithWhereUniqueWithoutShelfInput[]
    updateMany?: InventoryPlacementUpdateManyWithWhereWithoutShelfInput | InventoryPlacementUpdateManyWithWhereWithoutShelfInput[]
    deleteMany?: InventoryPlacementScalarWhereInput | InventoryPlacementScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type InventoryPlacementCreateWithoutInventoryInput = {
    id?: string
    shelf: shelvesCreateNestedOneWithoutInventoryPlacementInput
  }

  export type InventoryPlacementUncheckedCreateWithoutInventoryInput = {
    id?: string
    shelfId: number
  }

  export type InventoryPlacementCreateOrConnectWithoutInventoryInput = {
    where: InventoryPlacementWhereUniqueInput
    create: XOR<InventoryPlacementCreateWithoutInventoryInput, InventoryPlacementUncheckedCreateWithoutInventoryInput>
  }

  export type InventoryPlacementCreateManyInventoryInputEnvelope = {
    data: InventoryPlacementCreateManyInventoryInput | InventoryPlacementCreateManyInventoryInput[]
    skipDuplicates?: boolean
  }

  export type InventoryPlacementUpsertWithWhereUniqueWithoutInventoryInput = {
    where: InventoryPlacementWhereUniqueInput
    update: XOR<InventoryPlacementUpdateWithoutInventoryInput, InventoryPlacementUncheckedUpdateWithoutInventoryInput>
    create: XOR<InventoryPlacementCreateWithoutInventoryInput, InventoryPlacementUncheckedCreateWithoutInventoryInput>
  }

  export type InventoryPlacementUpdateWithWhereUniqueWithoutInventoryInput = {
    where: InventoryPlacementWhereUniqueInput
    data: XOR<InventoryPlacementUpdateWithoutInventoryInput, InventoryPlacementUncheckedUpdateWithoutInventoryInput>
  }

  export type InventoryPlacementUpdateManyWithWhereWithoutInventoryInput = {
    where: InventoryPlacementScalarWhereInput
    data: XOR<InventoryPlacementUpdateManyMutationInput, InventoryPlacementUncheckedUpdateManyWithoutInventoryInput>
  }

  export type InventoryPlacementScalarWhereInput = {
    AND?: InventoryPlacementScalarWhereInput | InventoryPlacementScalarWhereInput[]
    OR?: InventoryPlacementScalarWhereInput[]
    NOT?: InventoryPlacementScalarWhereInput | InventoryPlacementScalarWhereInput[]
    id?: StringFilter<"InventoryPlacement"> | string
    inventoryId?: IntFilter<"InventoryPlacement"> | number
    shelfId?: IntFilter<"InventoryPlacement"> | number
  }

  export type InventoryCreateWithoutInventoryPlacementInput = {
    name: string
    description: string
    quantity: number
    width: number
    height: number
    depth: number
    price: number
    weight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryUncheckedCreateWithoutInventoryPlacementInput = {
    id?: number
    name: string
    description: string
    quantity: number
    width: number
    height: number
    depth: number
    price: number
    weight: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InventoryCreateOrConnectWithoutInventoryPlacementInput = {
    where: InventoryWhereUniqueInput
    create: XOR<InventoryCreateWithoutInventoryPlacementInput, InventoryUncheckedCreateWithoutInventoryPlacementInput>
  }

  export type shelvesCreateWithoutInventoryPlacementInput = {
    shelf_id: number
    width: number
    height: number
    depth: number
    weight: number
    eye_level?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type shelvesUncheckedCreateWithoutInventoryPlacementInput = {
    id?: number
    shelf_id: number
    width: number
    height: number
    depth: number
    weight: number
    eye_level?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type shelvesCreateOrConnectWithoutInventoryPlacementInput = {
    where: shelvesWhereUniqueInput
    create: XOR<shelvesCreateWithoutInventoryPlacementInput, shelvesUncheckedCreateWithoutInventoryPlacementInput>
  }

  export type InventoryUpsertWithoutInventoryPlacementInput = {
    update: XOR<InventoryUpdateWithoutInventoryPlacementInput, InventoryUncheckedUpdateWithoutInventoryPlacementInput>
    create: XOR<InventoryCreateWithoutInventoryPlacementInput, InventoryUncheckedCreateWithoutInventoryPlacementInput>
    where?: InventoryWhereInput
  }

  export type InventoryUpdateToOneWithWhereWithoutInventoryPlacementInput = {
    where?: InventoryWhereInput
    data: XOR<InventoryUpdateWithoutInventoryPlacementInput, InventoryUncheckedUpdateWithoutInventoryPlacementInput>
  }

  export type InventoryUpdateWithoutInventoryPlacementInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InventoryUncheckedUpdateWithoutInventoryPlacementInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type shelvesUpsertWithoutInventoryPlacementInput = {
    update: XOR<shelvesUpdateWithoutInventoryPlacementInput, shelvesUncheckedUpdateWithoutInventoryPlacementInput>
    create: XOR<shelvesCreateWithoutInventoryPlacementInput, shelvesUncheckedCreateWithoutInventoryPlacementInput>
    where?: shelvesWhereInput
  }

  export type shelvesUpdateToOneWithWhereWithoutInventoryPlacementInput = {
    where?: shelvesWhereInput
    data: XOR<shelvesUpdateWithoutInventoryPlacementInput, shelvesUncheckedUpdateWithoutInventoryPlacementInput>
  }

  export type shelvesUpdateWithoutInventoryPlacementInput = {
    shelf_id?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    eye_level?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type shelvesUncheckedUpdateWithoutInventoryPlacementInput = {
    id?: IntFieldUpdateOperationsInput | number
    shelf_id?: IntFieldUpdateOperationsInput | number
    width?: FloatFieldUpdateOperationsInput | number
    height?: FloatFieldUpdateOperationsInput | number
    depth?: FloatFieldUpdateOperationsInput | number
    weight?: FloatFieldUpdateOperationsInput | number
    eye_level?: NullableBoolFieldUpdateOperationsInput | boolean | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InventoryPlacementCreateWithoutShelfInput = {
    id?: string
    inventory: InventoryCreateNestedOneWithoutInventoryPlacementInput
  }

  export type InventoryPlacementUncheckedCreateWithoutShelfInput = {
    id?: string
    inventoryId: number
  }

  export type InventoryPlacementCreateOrConnectWithoutShelfInput = {
    where: InventoryPlacementWhereUniqueInput
    create: XOR<InventoryPlacementCreateWithoutShelfInput, InventoryPlacementUncheckedCreateWithoutShelfInput>
  }

  export type InventoryPlacementCreateManyShelfInputEnvelope = {
    data: InventoryPlacementCreateManyShelfInput | InventoryPlacementCreateManyShelfInput[]
    skipDuplicates?: boolean
  }

  export type InventoryPlacementUpsertWithWhereUniqueWithoutShelfInput = {
    where: InventoryPlacementWhereUniqueInput
    update: XOR<InventoryPlacementUpdateWithoutShelfInput, InventoryPlacementUncheckedUpdateWithoutShelfInput>
    create: XOR<InventoryPlacementCreateWithoutShelfInput, InventoryPlacementUncheckedCreateWithoutShelfInput>
  }

  export type InventoryPlacementUpdateWithWhereUniqueWithoutShelfInput = {
    where: InventoryPlacementWhereUniqueInput
    data: XOR<InventoryPlacementUpdateWithoutShelfInput, InventoryPlacementUncheckedUpdateWithoutShelfInput>
  }

  export type InventoryPlacementUpdateManyWithWhereWithoutShelfInput = {
    where: InventoryPlacementScalarWhereInput
    data: XOR<InventoryPlacementUpdateManyMutationInput, InventoryPlacementUncheckedUpdateManyWithoutShelfInput>
  }

  export type InventoryPlacementCreateManyInventoryInput = {
    id?: string
    shelfId: number
  }

  export type InventoryPlacementUpdateWithoutInventoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    shelf?: shelvesUpdateOneRequiredWithoutInventoryPlacementNestedInput
  }

  export type InventoryPlacementUncheckedUpdateWithoutInventoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    shelfId?: IntFieldUpdateOperationsInput | number
  }

  export type InventoryPlacementUncheckedUpdateManyWithoutInventoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    shelfId?: IntFieldUpdateOperationsInput | number
  }

  export type InventoryPlacementCreateManyShelfInput = {
    id?: string
    inventoryId: number
  }

  export type InventoryPlacementUpdateWithoutShelfInput = {
    id?: StringFieldUpdateOperationsInput | string
    inventory?: InventoryUpdateOneRequiredWithoutInventoryPlacementNestedInput
  }

  export type InventoryPlacementUncheckedUpdateWithoutShelfInput = {
    id?: StringFieldUpdateOperationsInput | string
    inventoryId?: IntFieldUpdateOperationsInput | number
  }

  export type InventoryPlacementUncheckedUpdateManyWithoutShelfInput = {
    id?: StringFieldUpdateOperationsInput | string
    inventoryId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}