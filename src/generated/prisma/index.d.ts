
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Package
 * 
 */
export type Package = $Result.DefaultSelection<Prisma.$PackagePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model KiteuhApplication
 * 
 */
export type KiteuhApplication = $Result.DefaultSelection<Prisma.$KiteuhApplicationPayload>
/**
 * Model KiteuhMember
 * 
 */
export type KiteuhMember = $Result.DefaultSelection<Prisma.$KiteuhMemberPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const KiteuhStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
};

export type KiteuhStatus = (typeof KiteuhStatus)[keyof typeof KiteuhStatus]

}

export type KiteuhStatus = $Enums.KiteuhStatus

export const KiteuhStatus: typeof $Enums.KiteuhStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Packages
 * const packages = await prisma.package.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Packages
   * const packages = await prisma.package.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.package`: Exposes CRUD operations for the **Package** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Packages
    * const packages = await prisma.package.findMany()
    * ```
    */
  get package(): Prisma.PackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kiteuhApplication`: Exposes CRUD operations for the **KiteuhApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KiteuhApplications
    * const kiteuhApplications = await prisma.kiteuhApplication.findMany()
    * ```
    */
  get kiteuhApplication(): Prisma.KiteuhApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kiteuhMember`: Exposes CRUD operations for the **KiteuhMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KiteuhMembers
    * const kiteuhMembers = await prisma.kiteuhMember.findMany()
    * ```
    */
  get kiteuhMember(): Prisma.KiteuhMemberDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Package: 'Package',
    Order: 'Order',
    OrderItem: 'OrderItem',
    KiteuhApplication: 'KiteuhApplication',
    KiteuhMember: 'KiteuhMember'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "package" | "order" | "orderItem" | "kiteuhApplication" | "kiteuhMember"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Package: {
        payload: Prisma.$PackagePayload<ExtArgs>
        fields: Prisma.PackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findFirst: {
            args: Prisma.PackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findMany: {
            args: Prisma.PackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          create: {
            args: Prisma.PackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          createMany: {
            args: Prisma.PackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          delete: {
            args: Prisma.PackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          update: {
            args: Prisma.PackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          deleteMany: {
            args: Prisma.PackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          upsert: {
            args: Prisma.PackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          aggregate: {
            args: Prisma.PackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackage>
          }
          groupBy: {
            args: Prisma.PackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageCountArgs<ExtArgs>
            result: $Utils.Optional<PackageCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      KiteuhApplication: {
        payload: Prisma.$KiteuhApplicationPayload<ExtArgs>
        fields: Prisma.KiteuhApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KiteuhApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KiteuhApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>
          }
          findFirst: {
            args: Prisma.KiteuhApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KiteuhApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>
          }
          findMany: {
            args: Prisma.KiteuhApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>[]
          }
          create: {
            args: Prisma.KiteuhApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>
          }
          createMany: {
            args: Prisma.KiteuhApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KiteuhApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>[]
          }
          delete: {
            args: Prisma.KiteuhApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>
          }
          update: {
            args: Prisma.KiteuhApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>
          }
          deleteMany: {
            args: Prisma.KiteuhApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KiteuhApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KiteuhApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>[]
          }
          upsert: {
            args: Prisma.KiteuhApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhApplicationPayload>
          }
          aggregate: {
            args: Prisma.KiteuhApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKiteuhApplication>
          }
          groupBy: {
            args: Prisma.KiteuhApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<KiteuhApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.KiteuhApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<KiteuhApplicationCountAggregateOutputType> | number
          }
        }
      }
      KiteuhMember: {
        payload: Prisma.$KiteuhMemberPayload<ExtArgs>
        fields: Prisma.KiteuhMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KiteuhMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KiteuhMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>
          }
          findFirst: {
            args: Prisma.KiteuhMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KiteuhMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>
          }
          findMany: {
            args: Prisma.KiteuhMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>[]
          }
          create: {
            args: Prisma.KiteuhMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>
          }
          createMany: {
            args: Prisma.KiteuhMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KiteuhMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>[]
          }
          delete: {
            args: Prisma.KiteuhMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>
          }
          update: {
            args: Prisma.KiteuhMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>
          }
          deleteMany: {
            args: Prisma.KiteuhMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KiteuhMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KiteuhMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>[]
          }
          upsert: {
            args: Prisma.KiteuhMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KiteuhMemberPayload>
          }
          aggregate: {
            args: Prisma.KiteuhMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKiteuhMember>
          }
          groupBy: {
            args: Prisma.KiteuhMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<KiteuhMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.KiteuhMemberCountArgs<ExtArgs>
            result: $Utils.Optional<KiteuhMemberCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    package?: PackageOmit
    order?: OrderOmit
    orderItem?: OrderItemOmit
    kiteuhApplication?: KiteuhApplicationOmit
    kiteuhMember?: KiteuhMemberOmit
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
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Package
   */

  export type AggregatePackage = {
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  export type PackageAvgAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type PackageSumAggregateOutputType = {
    id: number | null
    price: number | null
  }

  export type PackageMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    category: string | null
    items: string | null
  }

  export type PackageMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: number | null
    category: string | null
    items: string | null
  }

  export type PackageCountAggregateOutputType = {
    id: number
    name: number
    price: number
    category: number
    items: number
    _all: number
  }


  export type PackageAvgAggregateInputType = {
    id?: true
    price?: true
  }

  export type PackageSumAggregateInputType = {
    id?: true
    price?: true
  }

  export type PackageMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    category?: true
    items?: true
  }

  export type PackageMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    category?: true
    items?: true
  }

  export type PackageCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    category?: true
    items?: true
    _all?: true
  }

  export type PackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Package to aggregate.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Packages
    **/
    _count?: true | PackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageMaxAggregateInputType
  }

  export type GetPackageAggregateType<T extends PackageAggregateArgs> = {
        [P in keyof T & keyof AggregatePackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackage[P]>
      : GetScalarType<T[P], AggregatePackage[P]>
  }




  export type PackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
    orderBy?: PackageOrderByWithAggregationInput | PackageOrderByWithAggregationInput[]
    by: PackageScalarFieldEnum[] | PackageScalarFieldEnum
    having?: PackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageCountAggregateInputType | true
    _avg?: PackageAvgAggregateInputType
    _sum?: PackageSumAggregateInputType
    _min?: PackageMinAggregateInputType
    _max?: PackageMaxAggregateInputType
  }

  export type PackageGroupByOutputType = {
    id: number
    name: string
    price: number
    category: string
    items: string
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  type GetPackageGroupByPayload<T extends PackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageGroupByOutputType[P]>
            : GetScalarType<T[P], PackageGroupByOutputType[P]>
        }
      >
    >


  export type PackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    category?: boolean
    items?: boolean
  }, ExtArgs["result"]["package"]>

  export type PackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    category?: boolean
    items?: boolean
  }, ExtArgs["result"]["package"]>

  export type PackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    category?: boolean
    items?: boolean
  }, ExtArgs["result"]["package"]>

  export type PackageSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    category?: boolean
    items?: boolean
  }

  export type PackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "price" | "category" | "items", ExtArgs["result"]["package"]>

  export type $PackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Package"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      price: number
      category: string
      items: string
    }, ExtArgs["result"]["package"]>
    composites: {}
  }

  type PackageGetPayload<S extends boolean | null | undefined | PackageDefaultArgs> = $Result.GetResult<Prisma.$PackagePayload, S>

  type PackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PackageCountAggregateInputType | true
    }

  export interface PackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Package'], meta: { name: 'Package' } }
    /**
     * Find zero or one Package that matches the filter.
     * @param {PackageFindUniqueArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageFindUniqueArgs>(args: SelectSubset<T, PackageFindUniqueArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Package that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PackageFindUniqueOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageFindFirstArgs>(args?: SelectSubset<T, PackageFindFirstArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Packages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Packages
     * const packages = await prisma.package.findMany()
     * 
     * // Get first 10 Packages
     * const packages = await prisma.package.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageWithIdOnly = await prisma.package.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageFindManyArgs>(args?: SelectSubset<T, PackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Package.
     * @param {PackageCreateArgs} args - Arguments to create a Package.
     * @example
     * // Create one Package
     * const Package = await prisma.package.create({
     *   data: {
     *     // ... data to create a Package
     *   }
     * })
     * 
     */
    create<T extends PackageCreateArgs>(args: SelectSubset<T, PackageCreateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Packages.
     * @param {PackageCreateManyArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageCreateManyArgs>(args?: SelectSubset<T, PackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Packages and returns the data saved in the database.
     * @param {PackageCreateManyAndReturnArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Package.
     * @param {PackageDeleteArgs} args - Arguments to delete one Package.
     * @example
     * // Delete one Package
     * const Package = await prisma.package.delete({
     *   where: {
     *     // ... filter to delete one Package
     *   }
     * })
     * 
     */
    delete<T extends PackageDeleteArgs>(args: SelectSubset<T, PackageDeleteArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Package.
     * @param {PackageUpdateArgs} args - Arguments to update one Package.
     * @example
     * // Update one Package
     * const package = await prisma.package.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageUpdateArgs>(args: SelectSubset<T, PackageUpdateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Packages.
     * @param {PackageDeleteManyArgs} args - Arguments to filter Packages to delete.
     * @example
     * // Delete a few Packages
     * const { count } = await prisma.package.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageDeleteManyArgs>(args?: SelectSubset<T, PackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageUpdateManyArgs>(args: SelectSubset<T, PackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages and returns the data updated in the database.
     * @param {PackageUpdateManyAndReturnArgs} args - Arguments to update many Packages.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.updateManyAndReturn({
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
    updateManyAndReturn<T extends PackageUpdateManyAndReturnArgs>(args: SelectSubset<T, PackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Package.
     * @param {PackageUpsertArgs} args - Arguments to update or create a Package.
     * @example
     * // Update or create a Package
     * const package = await prisma.package.upsert({
     *   create: {
     *     // ... data to create a Package
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Package we want to update
     *   }
     * })
     */
    upsert<T extends PackageUpsertArgs>(args: SelectSubset<T, PackageUpsertArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageCountArgs} args - Arguments to filter Packages to count.
     * @example
     * // Count the number of Packages
     * const count = await prisma.package.count({
     *   where: {
     *     // ... the filter for the Packages we want to count
     *   }
     * })
    **/
    count<T extends PackageCountArgs>(
      args?: Subset<T, PackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PackageAggregateArgs>(args: Subset<T, PackageAggregateArgs>): Prisma.PrismaPromise<GetPackageAggregateType<T>>

    /**
     * Group by Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageGroupByArgs} args - Group by arguments.
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
      T extends PackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageGroupByArgs['orderBy'] }
        : { orderBy?: PackageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Package model
   */
  readonly fields: PackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Package.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Package model
   */
  interface PackageFieldRefs {
    readonly id: FieldRef<"Package", 'Int'>
    readonly name: FieldRef<"Package", 'String'>
    readonly price: FieldRef<"Package", 'Float'>
    readonly category: FieldRef<"Package", 'String'>
    readonly items: FieldRef<"Package", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Package findUnique
   */
  export type PackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findUniqueOrThrow
   */
  export type PackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findFirst
   */
  export type PackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findFirstOrThrow
   */
  export type PackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findMany
   */
  export type PackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Filter, which Packages to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package create
   */
  export type PackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data needed to create a Package.
     */
    data: XOR<PackageCreateInput, PackageUncheckedCreateInput>
  }

  /**
   * Package createMany
   */
  export type PackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Package createManyAndReturn
   */
  export type PackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Package update
   */
  export type PackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data needed to update a Package.
     */
    data: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
    /**
     * Choose, which Package to update.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package updateMany
   */
  export type PackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
  }

  /**
   * Package updateManyAndReturn
   */
  export type PackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
  }

  /**
   * Package upsert
   */
  export type PackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The filter to search for the Package to update in case it exists.
     */
    where: PackageWhereUniqueInput
    /**
     * In case the Package found by the `where` argument doesn't exist, create a new Package with this data.
     */
    create: XOR<PackageCreateInput, PackageUncheckedCreateInput>
    /**
     * In case the Package was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
  }

  /**
   * Package delete
   */
  export type PackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Filter which Package to delete.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package deleteMany
   */
  export type PackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Packages to delete
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to delete.
     */
    limit?: number
  }

  /**
   * Package without action
   */
  export type PackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    amount: number | null
  }

  export type OrderSumAggregateOutputType = {
    amount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    stripeSessionId: string | null
    stripePaymentId: string | null
    email: string | null
    amount: number | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    stripeSessionId: string | null
    stripePaymentId: string | null
    email: string | null
    amount: number | null
    currency: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    stripeSessionId: number
    stripePaymentId: number
    email: number
    amount: number
    currency: number
    status: number
    customerInfo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    amount?: true
  }

  export type OrderSumAggregateInputType = {
    amount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    stripeSessionId?: true
    stripePaymentId?: true
    email?: true
    amount?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    stripeSessionId?: true
    stripePaymentId?: true
    email?: true
    amount?: true
    currency?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    stripeSessionId?: true
    stripePaymentId?: true
    email?: true
    amount?: true
    currency?: true
    status?: true
    customerInfo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    stripeSessionId: string
    stripePaymentId: string | null
    email: string
    amount: number
    currency: string
    status: string
    customerInfo: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stripeSessionId?: boolean
    stripePaymentId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customerInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stripeSessionId?: boolean
    stripePaymentId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customerInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    stripeSessionId?: boolean
    stripePaymentId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customerInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    stripeSessionId?: boolean
    stripePaymentId?: boolean
    email?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    customerInfo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "stripeSessionId" | "stripePaymentId" | "email" | "amount" | "currency" | "status" | "customerInfo" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      stripeSessionId: string
      stripePaymentId: string | null
      email: string
      amount: number
      currency: string
      status: string
      customerInfo: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly stripeSessionId: FieldRef<"Order", 'String'>
    readonly stripePaymentId: FieldRef<"Order", 'String'>
    readonly email: FieldRef<"Order", 'String'>
    readonly amount: FieldRef<"Order", 'Int'>
    readonly currency: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly customerInfo: FieldRef<"Order", 'Json'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    productName: string | null
    productCategory: string | null
    createdAt: Date | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    productName: string | null
    productCategory: string | null
    createdAt: Date | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    price: number
    productName: number
    productCategory: number
    tshirtSizes: number
    createdAt: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    productName?: true
    productCategory?: true
    createdAt?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    productName?: true
    productCategory?: true
    createdAt?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    productName?: true
    productCategory?: true
    tshirtSizes?: true
    createdAt?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    quantity: number
    price: number
    productName: string
    productCategory: string | null
    tshirtSizes: JsonValue | null
    createdAt: Date
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    productName?: boolean
    productCategory?: boolean
    tshirtSizes?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    productName?: boolean
    productCategory?: boolean
    tshirtSizes?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    productName?: boolean
    productCategory?: boolean
    tshirtSizes?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    productName?: boolean
    productCategory?: boolean
    tshirtSizes?: boolean
    createdAt?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "productId" | "quantity" | "price" | "productName" | "productCategory" | "tshirtSizes" | "createdAt", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      quantity: number
      price: number
      productName: string
      productCategory: string | null
      tshirtSizes: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly price: FieldRef<"OrderItem", 'Int'>
    readonly productName: FieldRef<"OrderItem", 'String'>
    readonly productCategory: FieldRef<"OrderItem", 'String'>
    readonly tshirtSizes: FieldRef<"OrderItem", 'Json'>
    readonly createdAt: FieldRef<"OrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model KiteuhApplication
   */

  export type AggregateKiteuhApplication = {
    _count: KiteuhApplicationCountAggregateOutputType | null
    _min: KiteuhApplicationMinAggregateOutputType | null
    _max: KiteuhApplicationMaxAggregateOutputType | null
  }

  export type KiteuhApplicationMinAggregateOutputType = {
    id: string | null
    applicationNumber: string | null
    status: $Enums.KiteuhStatus | null
    chapter: string | null
    memberFirstName: string | null
    memberMiddleName: string | null
    memberLastName: string | null
    memberDateOfBirth: Date | null
    memberAddress: string | null
    memberCity: string | null
    memberState: string | null
    memberZipCode: string | null
    memberEmail: string | null
    memberPhone: string | null
    beneficiaryFirstName: string | null
    beneficiaryMiddleName: string | null
    beneficiaryLastName: string | null
    beneficiaryEmail: string | null
    beneficiaryPhone: string | null
    beneficiaryAddress: string | null
    beneficiaryCity: string | null
    beneficiaryState: string | null
    beneficiaryZipCode: string | null
    assignedMemberId: string | null
    assignedBy: string | null
    assignedAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KiteuhApplicationMaxAggregateOutputType = {
    id: string | null
    applicationNumber: string | null
    status: $Enums.KiteuhStatus | null
    chapter: string | null
    memberFirstName: string | null
    memberMiddleName: string | null
    memberLastName: string | null
    memberDateOfBirth: Date | null
    memberAddress: string | null
    memberCity: string | null
    memberState: string | null
    memberZipCode: string | null
    memberEmail: string | null
    memberPhone: string | null
    beneficiaryFirstName: string | null
    beneficiaryMiddleName: string | null
    beneficiaryLastName: string | null
    beneficiaryEmail: string | null
    beneficiaryPhone: string | null
    beneficiaryAddress: string | null
    beneficiaryCity: string | null
    beneficiaryState: string | null
    beneficiaryZipCode: string | null
    assignedMemberId: string | null
    assignedBy: string | null
    assignedAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KiteuhApplicationCountAggregateOutputType = {
    id: number
    applicationNumber: number
    status: number
    chapter: number
    memberFirstName: number
    memberMiddleName: number
    memberLastName: number
    memberDateOfBirth: number
    memberAddress: number
    memberCity: number
    memberState: number
    memberZipCode: number
    memberEmail: number
    memberPhone: number
    beneficiaryFirstName: number
    beneficiaryMiddleName: number
    beneficiaryLastName: number
    beneficiaryEmail: number
    beneficiaryPhone: number
    beneficiaryAddress: number
    beneficiaryCity: number
    beneficiaryState: number
    beneficiaryZipCode: number
    assignedMemberId: number
    assignedBy: number
    assignedAt: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KiteuhApplicationMinAggregateInputType = {
    id?: true
    applicationNumber?: true
    status?: true
    chapter?: true
    memberFirstName?: true
    memberMiddleName?: true
    memberLastName?: true
    memberDateOfBirth?: true
    memberAddress?: true
    memberCity?: true
    memberState?: true
    memberZipCode?: true
    memberEmail?: true
    memberPhone?: true
    beneficiaryFirstName?: true
    beneficiaryMiddleName?: true
    beneficiaryLastName?: true
    beneficiaryEmail?: true
    beneficiaryPhone?: true
    beneficiaryAddress?: true
    beneficiaryCity?: true
    beneficiaryState?: true
    beneficiaryZipCode?: true
    assignedMemberId?: true
    assignedBy?: true
    assignedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KiteuhApplicationMaxAggregateInputType = {
    id?: true
    applicationNumber?: true
    status?: true
    chapter?: true
    memberFirstName?: true
    memberMiddleName?: true
    memberLastName?: true
    memberDateOfBirth?: true
    memberAddress?: true
    memberCity?: true
    memberState?: true
    memberZipCode?: true
    memberEmail?: true
    memberPhone?: true
    beneficiaryFirstName?: true
    beneficiaryMiddleName?: true
    beneficiaryLastName?: true
    beneficiaryEmail?: true
    beneficiaryPhone?: true
    beneficiaryAddress?: true
    beneficiaryCity?: true
    beneficiaryState?: true
    beneficiaryZipCode?: true
    assignedMemberId?: true
    assignedBy?: true
    assignedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KiteuhApplicationCountAggregateInputType = {
    id?: true
    applicationNumber?: true
    status?: true
    chapter?: true
    memberFirstName?: true
    memberMiddleName?: true
    memberLastName?: true
    memberDateOfBirth?: true
    memberAddress?: true
    memberCity?: true
    memberState?: true
    memberZipCode?: true
    memberEmail?: true
    memberPhone?: true
    beneficiaryFirstName?: true
    beneficiaryMiddleName?: true
    beneficiaryLastName?: true
    beneficiaryEmail?: true
    beneficiaryPhone?: true
    beneficiaryAddress?: true
    beneficiaryCity?: true
    beneficiaryState?: true
    beneficiaryZipCode?: true
    assignedMemberId?: true
    assignedBy?: true
    assignedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KiteuhApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KiteuhApplication to aggregate.
     */
    where?: KiteuhApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhApplications to fetch.
     */
    orderBy?: KiteuhApplicationOrderByWithRelationInput | KiteuhApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KiteuhApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KiteuhApplications
    **/
    _count?: true | KiteuhApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KiteuhApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KiteuhApplicationMaxAggregateInputType
  }

  export type GetKiteuhApplicationAggregateType<T extends KiteuhApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateKiteuhApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKiteuhApplication[P]>
      : GetScalarType<T[P], AggregateKiteuhApplication[P]>
  }




  export type KiteuhApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KiteuhApplicationWhereInput
    orderBy?: KiteuhApplicationOrderByWithAggregationInput | KiteuhApplicationOrderByWithAggregationInput[]
    by: KiteuhApplicationScalarFieldEnum[] | KiteuhApplicationScalarFieldEnum
    having?: KiteuhApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KiteuhApplicationCountAggregateInputType | true
    _min?: KiteuhApplicationMinAggregateInputType
    _max?: KiteuhApplicationMaxAggregateInputType
  }

  export type KiteuhApplicationGroupByOutputType = {
    id: string
    applicationNumber: string
    status: $Enums.KiteuhStatus
    chapter: string
    memberFirstName: string
    memberMiddleName: string | null
    memberLastName: string
    memberDateOfBirth: Date
    memberAddress: string | null
    memberCity: string | null
    memberState: string | null
    memberZipCode: string | null
    memberEmail: string
    memberPhone: string
    beneficiaryFirstName: string | null
    beneficiaryMiddleName: string | null
    beneficiaryLastName: string | null
    beneficiaryEmail: string | null
    beneficiaryPhone: string | null
    beneficiaryAddress: string | null
    beneficiaryCity: string | null
    beneficiaryState: string | null
    beneficiaryZipCode: string | null
    assignedMemberId: string | null
    assignedBy: string | null
    assignedAt: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: KiteuhApplicationCountAggregateOutputType | null
    _min: KiteuhApplicationMinAggregateOutputType | null
    _max: KiteuhApplicationMaxAggregateOutputType | null
  }

  type GetKiteuhApplicationGroupByPayload<T extends KiteuhApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KiteuhApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KiteuhApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KiteuhApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], KiteuhApplicationGroupByOutputType[P]>
        }
      >
    >


  export type KiteuhApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationNumber?: boolean
    status?: boolean
    chapter?: boolean
    memberFirstName?: boolean
    memberMiddleName?: boolean
    memberLastName?: boolean
    memberDateOfBirth?: boolean
    memberAddress?: boolean
    memberCity?: boolean
    memberState?: boolean
    memberZipCode?: boolean
    memberEmail?: boolean
    memberPhone?: boolean
    beneficiaryFirstName?: boolean
    beneficiaryMiddleName?: boolean
    beneficiaryLastName?: boolean
    beneficiaryEmail?: boolean
    beneficiaryPhone?: boolean
    beneficiaryAddress?: boolean
    beneficiaryCity?: boolean
    beneficiaryState?: boolean
    beneficiaryZipCode?: boolean
    assignedMemberId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    member?: boolean | KiteuhApplication$memberArgs<ExtArgs>
  }, ExtArgs["result"]["kiteuhApplication"]>

  export type KiteuhApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationNumber?: boolean
    status?: boolean
    chapter?: boolean
    memberFirstName?: boolean
    memberMiddleName?: boolean
    memberLastName?: boolean
    memberDateOfBirth?: boolean
    memberAddress?: boolean
    memberCity?: boolean
    memberState?: boolean
    memberZipCode?: boolean
    memberEmail?: boolean
    memberPhone?: boolean
    beneficiaryFirstName?: boolean
    beneficiaryMiddleName?: boolean
    beneficiaryLastName?: boolean
    beneficiaryEmail?: boolean
    beneficiaryPhone?: boolean
    beneficiaryAddress?: boolean
    beneficiaryCity?: boolean
    beneficiaryState?: boolean
    beneficiaryZipCode?: boolean
    assignedMemberId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["kiteuhApplication"]>

  export type KiteuhApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationNumber?: boolean
    status?: boolean
    chapter?: boolean
    memberFirstName?: boolean
    memberMiddleName?: boolean
    memberLastName?: boolean
    memberDateOfBirth?: boolean
    memberAddress?: boolean
    memberCity?: boolean
    memberState?: boolean
    memberZipCode?: boolean
    memberEmail?: boolean
    memberPhone?: boolean
    beneficiaryFirstName?: boolean
    beneficiaryMiddleName?: boolean
    beneficiaryLastName?: boolean
    beneficiaryEmail?: boolean
    beneficiaryPhone?: boolean
    beneficiaryAddress?: boolean
    beneficiaryCity?: boolean
    beneficiaryState?: boolean
    beneficiaryZipCode?: boolean
    assignedMemberId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["kiteuhApplication"]>

  export type KiteuhApplicationSelectScalar = {
    id?: boolean
    applicationNumber?: boolean
    status?: boolean
    chapter?: boolean
    memberFirstName?: boolean
    memberMiddleName?: boolean
    memberLastName?: boolean
    memberDateOfBirth?: boolean
    memberAddress?: boolean
    memberCity?: boolean
    memberState?: boolean
    memberZipCode?: boolean
    memberEmail?: boolean
    memberPhone?: boolean
    beneficiaryFirstName?: boolean
    beneficiaryMiddleName?: boolean
    beneficiaryLastName?: boolean
    beneficiaryEmail?: boolean
    beneficiaryPhone?: boolean
    beneficiaryAddress?: boolean
    beneficiaryCity?: boolean
    beneficiaryState?: boolean
    beneficiaryZipCode?: boolean
    assignedMemberId?: boolean
    assignedBy?: boolean
    assignedAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KiteuhApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationNumber" | "status" | "chapter" | "memberFirstName" | "memberMiddleName" | "memberLastName" | "memberDateOfBirth" | "memberAddress" | "memberCity" | "memberState" | "memberZipCode" | "memberEmail" | "memberPhone" | "beneficiaryFirstName" | "beneficiaryMiddleName" | "beneficiaryLastName" | "beneficiaryEmail" | "beneficiaryPhone" | "beneficiaryAddress" | "beneficiaryCity" | "beneficiaryState" | "beneficiaryZipCode" | "assignedMemberId" | "assignedBy" | "assignedAt" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["kiteuhApplication"]>
  export type KiteuhApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    member?: boolean | KiteuhApplication$memberArgs<ExtArgs>
  }
  export type KiteuhApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type KiteuhApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $KiteuhApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KiteuhApplication"
    objects: {
      member: Prisma.$KiteuhMemberPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      applicationNumber: string
      status: $Enums.KiteuhStatus
      chapter: string
      memberFirstName: string
      memberMiddleName: string | null
      memberLastName: string
      memberDateOfBirth: Date
      memberAddress: string | null
      memberCity: string | null
      memberState: string | null
      memberZipCode: string | null
      memberEmail: string
      memberPhone: string
      beneficiaryFirstName: string | null
      beneficiaryMiddleName: string | null
      beneficiaryLastName: string | null
      beneficiaryEmail: string | null
      beneficiaryPhone: string | null
      beneficiaryAddress: string | null
      beneficiaryCity: string | null
      beneficiaryState: string | null
      beneficiaryZipCode: string | null
      assignedMemberId: string | null
      assignedBy: string | null
      assignedAt: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["kiteuhApplication"]>
    composites: {}
  }

  type KiteuhApplicationGetPayload<S extends boolean | null | undefined | KiteuhApplicationDefaultArgs> = $Result.GetResult<Prisma.$KiteuhApplicationPayload, S>

  type KiteuhApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KiteuhApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KiteuhApplicationCountAggregateInputType | true
    }

  export interface KiteuhApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KiteuhApplication'], meta: { name: 'KiteuhApplication' } }
    /**
     * Find zero or one KiteuhApplication that matches the filter.
     * @param {KiteuhApplicationFindUniqueArgs} args - Arguments to find a KiteuhApplication
     * @example
     * // Get one KiteuhApplication
     * const kiteuhApplication = await prisma.kiteuhApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KiteuhApplicationFindUniqueArgs>(args: SelectSubset<T, KiteuhApplicationFindUniqueArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KiteuhApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KiteuhApplicationFindUniqueOrThrowArgs} args - Arguments to find a KiteuhApplication
     * @example
     * // Get one KiteuhApplication
     * const kiteuhApplication = await prisma.kiteuhApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KiteuhApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, KiteuhApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KiteuhApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhApplicationFindFirstArgs} args - Arguments to find a KiteuhApplication
     * @example
     * // Get one KiteuhApplication
     * const kiteuhApplication = await prisma.kiteuhApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KiteuhApplicationFindFirstArgs>(args?: SelectSubset<T, KiteuhApplicationFindFirstArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KiteuhApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhApplicationFindFirstOrThrowArgs} args - Arguments to find a KiteuhApplication
     * @example
     * // Get one KiteuhApplication
     * const kiteuhApplication = await prisma.kiteuhApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KiteuhApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, KiteuhApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KiteuhApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KiteuhApplications
     * const kiteuhApplications = await prisma.kiteuhApplication.findMany()
     * 
     * // Get first 10 KiteuhApplications
     * const kiteuhApplications = await prisma.kiteuhApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kiteuhApplicationWithIdOnly = await prisma.kiteuhApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KiteuhApplicationFindManyArgs>(args?: SelectSubset<T, KiteuhApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KiteuhApplication.
     * @param {KiteuhApplicationCreateArgs} args - Arguments to create a KiteuhApplication.
     * @example
     * // Create one KiteuhApplication
     * const KiteuhApplication = await prisma.kiteuhApplication.create({
     *   data: {
     *     // ... data to create a KiteuhApplication
     *   }
     * })
     * 
     */
    create<T extends KiteuhApplicationCreateArgs>(args: SelectSubset<T, KiteuhApplicationCreateArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KiteuhApplications.
     * @param {KiteuhApplicationCreateManyArgs} args - Arguments to create many KiteuhApplications.
     * @example
     * // Create many KiteuhApplications
     * const kiteuhApplication = await prisma.kiteuhApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KiteuhApplicationCreateManyArgs>(args?: SelectSubset<T, KiteuhApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KiteuhApplications and returns the data saved in the database.
     * @param {KiteuhApplicationCreateManyAndReturnArgs} args - Arguments to create many KiteuhApplications.
     * @example
     * // Create many KiteuhApplications
     * const kiteuhApplication = await prisma.kiteuhApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KiteuhApplications and only return the `id`
     * const kiteuhApplicationWithIdOnly = await prisma.kiteuhApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KiteuhApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, KiteuhApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KiteuhApplication.
     * @param {KiteuhApplicationDeleteArgs} args - Arguments to delete one KiteuhApplication.
     * @example
     * // Delete one KiteuhApplication
     * const KiteuhApplication = await prisma.kiteuhApplication.delete({
     *   where: {
     *     // ... filter to delete one KiteuhApplication
     *   }
     * })
     * 
     */
    delete<T extends KiteuhApplicationDeleteArgs>(args: SelectSubset<T, KiteuhApplicationDeleteArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KiteuhApplication.
     * @param {KiteuhApplicationUpdateArgs} args - Arguments to update one KiteuhApplication.
     * @example
     * // Update one KiteuhApplication
     * const kiteuhApplication = await prisma.kiteuhApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KiteuhApplicationUpdateArgs>(args: SelectSubset<T, KiteuhApplicationUpdateArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KiteuhApplications.
     * @param {KiteuhApplicationDeleteManyArgs} args - Arguments to filter KiteuhApplications to delete.
     * @example
     * // Delete a few KiteuhApplications
     * const { count } = await prisma.kiteuhApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KiteuhApplicationDeleteManyArgs>(args?: SelectSubset<T, KiteuhApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KiteuhApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KiteuhApplications
     * const kiteuhApplication = await prisma.kiteuhApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KiteuhApplicationUpdateManyArgs>(args: SelectSubset<T, KiteuhApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KiteuhApplications and returns the data updated in the database.
     * @param {KiteuhApplicationUpdateManyAndReturnArgs} args - Arguments to update many KiteuhApplications.
     * @example
     * // Update many KiteuhApplications
     * const kiteuhApplication = await prisma.kiteuhApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KiteuhApplications and only return the `id`
     * const kiteuhApplicationWithIdOnly = await prisma.kiteuhApplication.updateManyAndReturn({
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
    updateManyAndReturn<T extends KiteuhApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, KiteuhApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KiteuhApplication.
     * @param {KiteuhApplicationUpsertArgs} args - Arguments to update or create a KiteuhApplication.
     * @example
     * // Update or create a KiteuhApplication
     * const kiteuhApplication = await prisma.kiteuhApplication.upsert({
     *   create: {
     *     // ... data to create a KiteuhApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KiteuhApplication we want to update
     *   }
     * })
     */
    upsert<T extends KiteuhApplicationUpsertArgs>(args: SelectSubset<T, KiteuhApplicationUpsertArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KiteuhApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhApplicationCountArgs} args - Arguments to filter KiteuhApplications to count.
     * @example
     * // Count the number of KiteuhApplications
     * const count = await prisma.kiteuhApplication.count({
     *   where: {
     *     // ... the filter for the KiteuhApplications we want to count
     *   }
     * })
    **/
    count<T extends KiteuhApplicationCountArgs>(
      args?: Subset<T, KiteuhApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KiteuhApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KiteuhApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KiteuhApplicationAggregateArgs>(args: Subset<T, KiteuhApplicationAggregateArgs>): Prisma.PrismaPromise<GetKiteuhApplicationAggregateType<T>>

    /**
     * Group by KiteuhApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhApplicationGroupByArgs} args - Group by arguments.
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
      T extends KiteuhApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KiteuhApplicationGroupByArgs['orderBy'] }
        : { orderBy?: KiteuhApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KiteuhApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKiteuhApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KiteuhApplication model
   */
  readonly fields: KiteuhApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KiteuhApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KiteuhApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    member<T extends KiteuhApplication$memberArgs<ExtArgs> = {}>(args?: Subset<T, KiteuhApplication$memberArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the KiteuhApplication model
   */
  interface KiteuhApplicationFieldRefs {
    readonly id: FieldRef<"KiteuhApplication", 'String'>
    readonly applicationNumber: FieldRef<"KiteuhApplication", 'String'>
    readonly status: FieldRef<"KiteuhApplication", 'KiteuhStatus'>
    readonly chapter: FieldRef<"KiteuhApplication", 'String'>
    readonly memberFirstName: FieldRef<"KiteuhApplication", 'String'>
    readonly memberMiddleName: FieldRef<"KiteuhApplication", 'String'>
    readonly memberLastName: FieldRef<"KiteuhApplication", 'String'>
    readonly memberDateOfBirth: FieldRef<"KiteuhApplication", 'DateTime'>
    readonly memberAddress: FieldRef<"KiteuhApplication", 'String'>
    readonly memberCity: FieldRef<"KiteuhApplication", 'String'>
    readonly memberState: FieldRef<"KiteuhApplication", 'String'>
    readonly memberZipCode: FieldRef<"KiteuhApplication", 'String'>
    readonly memberEmail: FieldRef<"KiteuhApplication", 'String'>
    readonly memberPhone: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryFirstName: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryMiddleName: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryLastName: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryEmail: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryPhone: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryAddress: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryCity: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryState: FieldRef<"KiteuhApplication", 'String'>
    readonly beneficiaryZipCode: FieldRef<"KiteuhApplication", 'String'>
    readonly assignedMemberId: FieldRef<"KiteuhApplication", 'String'>
    readonly assignedBy: FieldRef<"KiteuhApplication", 'String'>
    readonly assignedAt: FieldRef<"KiteuhApplication", 'DateTime'>
    readonly notes: FieldRef<"KiteuhApplication", 'String'>
    readonly createdAt: FieldRef<"KiteuhApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"KiteuhApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KiteuhApplication findUnique
   */
  export type KiteuhApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhApplication to fetch.
     */
    where: KiteuhApplicationWhereUniqueInput
  }

  /**
   * KiteuhApplication findUniqueOrThrow
   */
  export type KiteuhApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhApplication to fetch.
     */
    where: KiteuhApplicationWhereUniqueInput
  }

  /**
   * KiteuhApplication findFirst
   */
  export type KiteuhApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhApplication to fetch.
     */
    where?: KiteuhApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhApplications to fetch.
     */
    orderBy?: KiteuhApplicationOrderByWithRelationInput | KiteuhApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KiteuhApplications.
     */
    cursor?: KiteuhApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KiteuhApplications.
     */
    distinct?: KiteuhApplicationScalarFieldEnum | KiteuhApplicationScalarFieldEnum[]
  }

  /**
   * KiteuhApplication findFirstOrThrow
   */
  export type KiteuhApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhApplication to fetch.
     */
    where?: KiteuhApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhApplications to fetch.
     */
    orderBy?: KiteuhApplicationOrderByWithRelationInput | KiteuhApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KiteuhApplications.
     */
    cursor?: KiteuhApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KiteuhApplications.
     */
    distinct?: KiteuhApplicationScalarFieldEnum | KiteuhApplicationScalarFieldEnum[]
  }

  /**
   * KiteuhApplication findMany
   */
  export type KiteuhApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhApplications to fetch.
     */
    where?: KiteuhApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhApplications to fetch.
     */
    orderBy?: KiteuhApplicationOrderByWithRelationInput | KiteuhApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KiteuhApplications.
     */
    cursor?: KiteuhApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KiteuhApplications.
     */
    distinct?: KiteuhApplicationScalarFieldEnum | KiteuhApplicationScalarFieldEnum[]
  }

  /**
   * KiteuhApplication create
   */
  export type KiteuhApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a KiteuhApplication.
     */
    data: XOR<KiteuhApplicationCreateInput, KiteuhApplicationUncheckedCreateInput>
  }

  /**
   * KiteuhApplication createMany
   */
  export type KiteuhApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KiteuhApplications.
     */
    data: KiteuhApplicationCreateManyInput | KiteuhApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KiteuhApplication createManyAndReturn
   */
  export type KiteuhApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many KiteuhApplications.
     */
    data: KiteuhApplicationCreateManyInput | KiteuhApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KiteuhApplication update
   */
  export type KiteuhApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a KiteuhApplication.
     */
    data: XOR<KiteuhApplicationUpdateInput, KiteuhApplicationUncheckedUpdateInput>
    /**
     * Choose, which KiteuhApplication to update.
     */
    where: KiteuhApplicationWhereUniqueInput
  }

  /**
   * KiteuhApplication updateMany
   */
  export type KiteuhApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KiteuhApplications.
     */
    data: XOR<KiteuhApplicationUpdateManyMutationInput, KiteuhApplicationUncheckedUpdateManyInput>
    /**
     * Filter which KiteuhApplications to update
     */
    where?: KiteuhApplicationWhereInput
    /**
     * Limit how many KiteuhApplications to update.
     */
    limit?: number
  }

  /**
   * KiteuhApplication updateManyAndReturn
   */
  export type KiteuhApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * The data used to update KiteuhApplications.
     */
    data: XOR<KiteuhApplicationUpdateManyMutationInput, KiteuhApplicationUncheckedUpdateManyInput>
    /**
     * Filter which KiteuhApplications to update
     */
    where?: KiteuhApplicationWhereInput
    /**
     * Limit how many KiteuhApplications to update.
     */
    limit?: number
  }

  /**
   * KiteuhApplication upsert
   */
  export type KiteuhApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the KiteuhApplication to update in case it exists.
     */
    where: KiteuhApplicationWhereUniqueInput
    /**
     * In case the KiteuhApplication found by the `where` argument doesn't exist, create a new KiteuhApplication with this data.
     */
    create: XOR<KiteuhApplicationCreateInput, KiteuhApplicationUncheckedCreateInput>
    /**
     * In case the KiteuhApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KiteuhApplicationUpdateInput, KiteuhApplicationUncheckedUpdateInput>
  }

  /**
   * KiteuhApplication delete
   */
  export type KiteuhApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    /**
     * Filter which KiteuhApplication to delete.
     */
    where: KiteuhApplicationWhereUniqueInput
  }

  /**
   * KiteuhApplication deleteMany
   */
  export type KiteuhApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KiteuhApplications to delete
     */
    where?: KiteuhApplicationWhereInput
    /**
     * Limit how many KiteuhApplications to delete.
     */
    limit?: number
  }

  /**
   * KiteuhApplication.member
   */
  export type KiteuhApplication$memberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    where?: KiteuhMemberWhereInput
  }

  /**
   * KiteuhApplication without action
   */
  export type KiteuhApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
  }


  /**
   * Model KiteuhMember
   */

  export type AggregateKiteuhMember = {
    _count: KiteuhMemberCountAggregateOutputType | null
    _min: KiteuhMemberMinAggregateOutputType | null
    _max: KiteuhMemberMaxAggregateOutputType | null
  }

  export type KiteuhMemberMinAggregateOutputType = {
    id: string | null
    memberId: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    chapter: string | null
    dateOfBirth: Date | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    status: $Enums.KiteuhStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    applicationId: string | null
  }

  export type KiteuhMemberMaxAggregateOutputType = {
    id: string | null
    memberId: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    chapter: string | null
    dateOfBirth: Date | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    status: $Enums.KiteuhStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    applicationId: string | null
  }

  export type KiteuhMemberCountAggregateOutputType = {
    id: number
    memberId: number
    fullName: number
    email: number
    phone: number
    chapter: number
    dateOfBirth: number
    address: number
    city: number
    state: number
    zipCode: number
    status: number
    createdAt: number
    updatedAt: number
    applicationId: number
    _all: number
  }


  export type KiteuhMemberMinAggregateInputType = {
    id?: true
    memberId?: true
    fullName?: true
    email?: true
    phone?: true
    chapter?: true
    dateOfBirth?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    applicationId?: true
  }

  export type KiteuhMemberMaxAggregateInputType = {
    id?: true
    memberId?: true
    fullName?: true
    email?: true
    phone?: true
    chapter?: true
    dateOfBirth?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    applicationId?: true
  }

  export type KiteuhMemberCountAggregateInputType = {
    id?: true
    memberId?: true
    fullName?: true
    email?: true
    phone?: true
    chapter?: true
    dateOfBirth?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    applicationId?: true
    _all?: true
  }

  export type KiteuhMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KiteuhMember to aggregate.
     */
    where?: KiteuhMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhMembers to fetch.
     */
    orderBy?: KiteuhMemberOrderByWithRelationInput | KiteuhMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KiteuhMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KiteuhMembers
    **/
    _count?: true | KiteuhMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KiteuhMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KiteuhMemberMaxAggregateInputType
  }

  export type GetKiteuhMemberAggregateType<T extends KiteuhMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateKiteuhMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKiteuhMember[P]>
      : GetScalarType<T[P], AggregateKiteuhMember[P]>
  }




  export type KiteuhMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KiteuhMemberWhereInput
    orderBy?: KiteuhMemberOrderByWithAggregationInput | KiteuhMemberOrderByWithAggregationInput[]
    by: KiteuhMemberScalarFieldEnum[] | KiteuhMemberScalarFieldEnum
    having?: KiteuhMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KiteuhMemberCountAggregateInputType | true
    _min?: KiteuhMemberMinAggregateInputType
    _max?: KiteuhMemberMaxAggregateInputType
  }

  export type KiteuhMemberGroupByOutputType = {
    id: string
    memberId: string
    fullName: string
    email: string
    phone: string
    chapter: string
    dateOfBirth: Date
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    status: $Enums.KiteuhStatus
    createdAt: Date
    updatedAt: Date
    applicationId: string | null
    _count: KiteuhMemberCountAggregateOutputType | null
    _min: KiteuhMemberMinAggregateOutputType | null
    _max: KiteuhMemberMaxAggregateOutputType | null
  }

  type GetKiteuhMemberGroupByPayload<T extends KiteuhMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KiteuhMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KiteuhMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KiteuhMemberGroupByOutputType[P]>
            : GetScalarType<T[P], KiteuhMemberGroupByOutputType[P]>
        }
      >
    >


  export type KiteuhMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    chapter?: boolean
    dateOfBirth?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    applicationId?: boolean
    application?: boolean | KiteuhMember$applicationArgs<ExtArgs>
  }, ExtArgs["result"]["kiteuhMember"]>

  export type KiteuhMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    chapter?: boolean
    dateOfBirth?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    applicationId?: boolean
    application?: boolean | KiteuhMember$applicationArgs<ExtArgs>
  }, ExtArgs["result"]["kiteuhMember"]>

  export type KiteuhMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    memberId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    chapter?: boolean
    dateOfBirth?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    applicationId?: boolean
    application?: boolean | KiteuhMember$applicationArgs<ExtArgs>
  }, ExtArgs["result"]["kiteuhMember"]>

  export type KiteuhMemberSelectScalar = {
    id?: boolean
    memberId?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    chapter?: boolean
    dateOfBirth?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    applicationId?: boolean
  }

  export type KiteuhMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "memberId" | "fullName" | "email" | "phone" | "chapter" | "dateOfBirth" | "address" | "city" | "state" | "zipCode" | "status" | "createdAt" | "updatedAt" | "applicationId", ExtArgs["result"]["kiteuhMember"]>
  export type KiteuhMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | KiteuhMember$applicationArgs<ExtArgs>
  }
  export type KiteuhMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | KiteuhMember$applicationArgs<ExtArgs>
  }
  export type KiteuhMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | KiteuhMember$applicationArgs<ExtArgs>
  }

  export type $KiteuhMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KiteuhMember"
    objects: {
      application: Prisma.$KiteuhApplicationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      memberId: string
      fullName: string
      email: string
      phone: string
      chapter: string
      dateOfBirth: Date
      address: string | null
      city: string | null
      state: string | null
      zipCode: string | null
      status: $Enums.KiteuhStatus
      createdAt: Date
      updatedAt: Date
      applicationId: string | null
    }, ExtArgs["result"]["kiteuhMember"]>
    composites: {}
  }

  type KiteuhMemberGetPayload<S extends boolean | null | undefined | KiteuhMemberDefaultArgs> = $Result.GetResult<Prisma.$KiteuhMemberPayload, S>

  type KiteuhMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KiteuhMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KiteuhMemberCountAggregateInputType | true
    }

  export interface KiteuhMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KiteuhMember'], meta: { name: 'KiteuhMember' } }
    /**
     * Find zero or one KiteuhMember that matches the filter.
     * @param {KiteuhMemberFindUniqueArgs} args - Arguments to find a KiteuhMember
     * @example
     * // Get one KiteuhMember
     * const kiteuhMember = await prisma.kiteuhMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KiteuhMemberFindUniqueArgs>(args: SelectSubset<T, KiteuhMemberFindUniqueArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KiteuhMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KiteuhMemberFindUniqueOrThrowArgs} args - Arguments to find a KiteuhMember
     * @example
     * // Get one KiteuhMember
     * const kiteuhMember = await prisma.kiteuhMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KiteuhMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, KiteuhMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KiteuhMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhMemberFindFirstArgs} args - Arguments to find a KiteuhMember
     * @example
     * // Get one KiteuhMember
     * const kiteuhMember = await prisma.kiteuhMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KiteuhMemberFindFirstArgs>(args?: SelectSubset<T, KiteuhMemberFindFirstArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KiteuhMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhMemberFindFirstOrThrowArgs} args - Arguments to find a KiteuhMember
     * @example
     * // Get one KiteuhMember
     * const kiteuhMember = await prisma.kiteuhMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KiteuhMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, KiteuhMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KiteuhMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KiteuhMembers
     * const kiteuhMembers = await prisma.kiteuhMember.findMany()
     * 
     * // Get first 10 KiteuhMembers
     * const kiteuhMembers = await prisma.kiteuhMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kiteuhMemberWithIdOnly = await prisma.kiteuhMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KiteuhMemberFindManyArgs>(args?: SelectSubset<T, KiteuhMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KiteuhMember.
     * @param {KiteuhMemberCreateArgs} args - Arguments to create a KiteuhMember.
     * @example
     * // Create one KiteuhMember
     * const KiteuhMember = await prisma.kiteuhMember.create({
     *   data: {
     *     // ... data to create a KiteuhMember
     *   }
     * })
     * 
     */
    create<T extends KiteuhMemberCreateArgs>(args: SelectSubset<T, KiteuhMemberCreateArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KiteuhMembers.
     * @param {KiteuhMemberCreateManyArgs} args - Arguments to create many KiteuhMembers.
     * @example
     * // Create many KiteuhMembers
     * const kiteuhMember = await prisma.kiteuhMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KiteuhMemberCreateManyArgs>(args?: SelectSubset<T, KiteuhMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KiteuhMembers and returns the data saved in the database.
     * @param {KiteuhMemberCreateManyAndReturnArgs} args - Arguments to create many KiteuhMembers.
     * @example
     * // Create many KiteuhMembers
     * const kiteuhMember = await prisma.kiteuhMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KiteuhMembers and only return the `id`
     * const kiteuhMemberWithIdOnly = await prisma.kiteuhMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KiteuhMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, KiteuhMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KiteuhMember.
     * @param {KiteuhMemberDeleteArgs} args - Arguments to delete one KiteuhMember.
     * @example
     * // Delete one KiteuhMember
     * const KiteuhMember = await prisma.kiteuhMember.delete({
     *   where: {
     *     // ... filter to delete one KiteuhMember
     *   }
     * })
     * 
     */
    delete<T extends KiteuhMemberDeleteArgs>(args: SelectSubset<T, KiteuhMemberDeleteArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KiteuhMember.
     * @param {KiteuhMemberUpdateArgs} args - Arguments to update one KiteuhMember.
     * @example
     * // Update one KiteuhMember
     * const kiteuhMember = await prisma.kiteuhMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KiteuhMemberUpdateArgs>(args: SelectSubset<T, KiteuhMemberUpdateArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KiteuhMembers.
     * @param {KiteuhMemberDeleteManyArgs} args - Arguments to filter KiteuhMembers to delete.
     * @example
     * // Delete a few KiteuhMembers
     * const { count } = await prisma.kiteuhMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KiteuhMemberDeleteManyArgs>(args?: SelectSubset<T, KiteuhMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KiteuhMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KiteuhMembers
     * const kiteuhMember = await prisma.kiteuhMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KiteuhMemberUpdateManyArgs>(args: SelectSubset<T, KiteuhMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KiteuhMembers and returns the data updated in the database.
     * @param {KiteuhMemberUpdateManyAndReturnArgs} args - Arguments to update many KiteuhMembers.
     * @example
     * // Update many KiteuhMembers
     * const kiteuhMember = await prisma.kiteuhMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KiteuhMembers and only return the `id`
     * const kiteuhMemberWithIdOnly = await prisma.kiteuhMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends KiteuhMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, KiteuhMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KiteuhMember.
     * @param {KiteuhMemberUpsertArgs} args - Arguments to update or create a KiteuhMember.
     * @example
     * // Update or create a KiteuhMember
     * const kiteuhMember = await prisma.kiteuhMember.upsert({
     *   create: {
     *     // ... data to create a KiteuhMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KiteuhMember we want to update
     *   }
     * })
     */
    upsert<T extends KiteuhMemberUpsertArgs>(args: SelectSubset<T, KiteuhMemberUpsertArgs<ExtArgs>>): Prisma__KiteuhMemberClient<$Result.GetResult<Prisma.$KiteuhMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KiteuhMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhMemberCountArgs} args - Arguments to filter KiteuhMembers to count.
     * @example
     * // Count the number of KiteuhMembers
     * const count = await prisma.kiteuhMember.count({
     *   where: {
     *     // ... the filter for the KiteuhMembers we want to count
     *   }
     * })
    **/
    count<T extends KiteuhMemberCountArgs>(
      args?: Subset<T, KiteuhMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KiteuhMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KiteuhMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KiteuhMemberAggregateArgs>(args: Subset<T, KiteuhMemberAggregateArgs>): Prisma.PrismaPromise<GetKiteuhMemberAggregateType<T>>

    /**
     * Group by KiteuhMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KiteuhMemberGroupByArgs} args - Group by arguments.
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
      T extends KiteuhMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KiteuhMemberGroupByArgs['orderBy'] }
        : { orderBy?: KiteuhMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KiteuhMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKiteuhMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KiteuhMember model
   */
  readonly fields: KiteuhMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KiteuhMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KiteuhMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    application<T extends KiteuhMember$applicationArgs<ExtArgs> = {}>(args?: Subset<T, KiteuhMember$applicationArgs<ExtArgs>>): Prisma__KiteuhApplicationClient<$Result.GetResult<Prisma.$KiteuhApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the KiteuhMember model
   */
  interface KiteuhMemberFieldRefs {
    readonly id: FieldRef<"KiteuhMember", 'String'>
    readonly memberId: FieldRef<"KiteuhMember", 'String'>
    readonly fullName: FieldRef<"KiteuhMember", 'String'>
    readonly email: FieldRef<"KiteuhMember", 'String'>
    readonly phone: FieldRef<"KiteuhMember", 'String'>
    readonly chapter: FieldRef<"KiteuhMember", 'String'>
    readonly dateOfBirth: FieldRef<"KiteuhMember", 'DateTime'>
    readonly address: FieldRef<"KiteuhMember", 'String'>
    readonly city: FieldRef<"KiteuhMember", 'String'>
    readonly state: FieldRef<"KiteuhMember", 'String'>
    readonly zipCode: FieldRef<"KiteuhMember", 'String'>
    readonly status: FieldRef<"KiteuhMember", 'KiteuhStatus'>
    readonly createdAt: FieldRef<"KiteuhMember", 'DateTime'>
    readonly updatedAt: FieldRef<"KiteuhMember", 'DateTime'>
    readonly applicationId: FieldRef<"KiteuhMember", 'String'>
  }
    

  // Custom InputTypes
  /**
   * KiteuhMember findUnique
   */
  export type KiteuhMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhMember to fetch.
     */
    where: KiteuhMemberWhereUniqueInput
  }

  /**
   * KiteuhMember findUniqueOrThrow
   */
  export type KiteuhMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhMember to fetch.
     */
    where: KiteuhMemberWhereUniqueInput
  }

  /**
   * KiteuhMember findFirst
   */
  export type KiteuhMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhMember to fetch.
     */
    where?: KiteuhMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhMembers to fetch.
     */
    orderBy?: KiteuhMemberOrderByWithRelationInput | KiteuhMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KiteuhMembers.
     */
    cursor?: KiteuhMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KiteuhMembers.
     */
    distinct?: KiteuhMemberScalarFieldEnum | KiteuhMemberScalarFieldEnum[]
  }

  /**
   * KiteuhMember findFirstOrThrow
   */
  export type KiteuhMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhMember to fetch.
     */
    where?: KiteuhMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhMembers to fetch.
     */
    orderBy?: KiteuhMemberOrderByWithRelationInput | KiteuhMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KiteuhMembers.
     */
    cursor?: KiteuhMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KiteuhMembers.
     */
    distinct?: KiteuhMemberScalarFieldEnum | KiteuhMemberScalarFieldEnum[]
  }

  /**
   * KiteuhMember findMany
   */
  export type KiteuhMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * Filter, which KiteuhMembers to fetch.
     */
    where?: KiteuhMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KiteuhMembers to fetch.
     */
    orderBy?: KiteuhMemberOrderByWithRelationInput | KiteuhMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KiteuhMembers.
     */
    cursor?: KiteuhMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KiteuhMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KiteuhMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KiteuhMembers.
     */
    distinct?: KiteuhMemberScalarFieldEnum | KiteuhMemberScalarFieldEnum[]
  }

  /**
   * KiteuhMember create
   */
  export type KiteuhMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a KiteuhMember.
     */
    data: XOR<KiteuhMemberCreateInput, KiteuhMemberUncheckedCreateInput>
  }

  /**
   * KiteuhMember createMany
   */
  export type KiteuhMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KiteuhMembers.
     */
    data: KiteuhMemberCreateManyInput | KiteuhMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KiteuhMember createManyAndReturn
   */
  export type KiteuhMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * The data used to create many KiteuhMembers.
     */
    data: KiteuhMemberCreateManyInput | KiteuhMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KiteuhMember update
   */
  export type KiteuhMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a KiteuhMember.
     */
    data: XOR<KiteuhMemberUpdateInput, KiteuhMemberUncheckedUpdateInput>
    /**
     * Choose, which KiteuhMember to update.
     */
    where: KiteuhMemberWhereUniqueInput
  }

  /**
   * KiteuhMember updateMany
   */
  export type KiteuhMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KiteuhMembers.
     */
    data: XOR<KiteuhMemberUpdateManyMutationInput, KiteuhMemberUncheckedUpdateManyInput>
    /**
     * Filter which KiteuhMembers to update
     */
    where?: KiteuhMemberWhereInput
    /**
     * Limit how many KiteuhMembers to update.
     */
    limit?: number
  }

  /**
   * KiteuhMember updateManyAndReturn
   */
  export type KiteuhMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * The data used to update KiteuhMembers.
     */
    data: XOR<KiteuhMemberUpdateManyMutationInput, KiteuhMemberUncheckedUpdateManyInput>
    /**
     * Filter which KiteuhMembers to update
     */
    where?: KiteuhMemberWhereInput
    /**
     * Limit how many KiteuhMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * KiteuhMember upsert
   */
  export type KiteuhMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the KiteuhMember to update in case it exists.
     */
    where: KiteuhMemberWhereUniqueInput
    /**
     * In case the KiteuhMember found by the `where` argument doesn't exist, create a new KiteuhMember with this data.
     */
    create: XOR<KiteuhMemberCreateInput, KiteuhMemberUncheckedCreateInput>
    /**
     * In case the KiteuhMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KiteuhMemberUpdateInput, KiteuhMemberUncheckedUpdateInput>
  }

  /**
   * KiteuhMember delete
   */
  export type KiteuhMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
    /**
     * Filter which KiteuhMember to delete.
     */
    where: KiteuhMemberWhereUniqueInput
  }

  /**
   * KiteuhMember deleteMany
   */
  export type KiteuhMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KiteuhMembers to delete
     */
    where?: KiteuhMemberWhereInput
    /**
     * Limit how many KiteuhMembers to delete.
     */
    limit?: number
  }

  /**
   * KiteuhMember.application
   */
  export type KiteuhMember$applicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhApplication
     */
    select?: KiteuhApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhApplication
     */
    omit?: KiteuhApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhApplicationInclude<ExtArgs> | null
    where?: KiteuhApplicationWhereInput
  }

  /**
   * KiteuhMember without action
   */
  export type KiteuhMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KiteuhMember
     */
    select?: KiteuhMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KiteuhMember
     */
    omit?: KiteuhMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KiteuhMemberInclude<ExtArgs> | null
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


  export const PackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    category: 'category',
    items: 'items'
  };

  export type PackageScalarFieldEnum = (typeof PackageScalarFieldEnum)[keyof typeof PackageScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    stripeSessionId: 'stripeSessionId',
    stripePaymentId: 'stripePaymentId',
    email: 'email',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    customerInfo: 'customerInfo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    price: 'price',
    productName: 'productName',
    productCategory: 'productCategory',
    tshirtSizes: 'tshirtSizes',
    createdAt: 'createdAt'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const KiteuhApplicationScalarFieldEnum: {
    id: 'id',
    applicationNumber: 'applicationNumber',
    status: 'status',
    chapter: 'chapter',
    memberFirstName: 'memberFirstName',
    memberMiddleName: 'memberMiddleName',
    memberLastName: 'memberLastName',
    memberDateOfBirth: 'memberDateOfBirth',
    memberAddress: 'memberAddress',
    memberCity: 'memberCity',
    memberState: 'memberState',
    memberZipCode: 'memberZipCode',
    memberEmail: 'memberEmail',
    memberPhone: 'memberPhone',
    beneficiaryFirstName: 'beneficiaryFirstName',
    beneficiaryMiddleName: 'beneficiaryMiddleName',
    beneficiaryLastName: 'beneficiaryLastName',
    beneficiaryEmail: 'beneficiaryEmail',
    beneficiaryPhone: 'beneficiaryPhone',
    beneficiaryAddress: 'beneficiaryAddress',
    beneficiaryCity: 'beneficiaryCity',
    beneficiaryState: 'beneficiaryState',
    beneficiaryZipCode: 'beneficiaryZipCode',
    assignedMemberId: 'assignedMemberId',
    assignedBy: 'assignedBy',
    assignedAt: 'assignedAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KiteuhApplicationScalarFieldEnum = (typeof KiteuhApplicationScalarFieldEnum)[keyof typeof KiteuhApplicationScalarFieldEnum]


  export const KiteuhMemberScalarFieldEnum: {
    id: 'id',
    memberId: 'memberId',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    chapter: 'chapter',
    dateOfBirth: 'dateOfBirth',
    address: 'address',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    applicationId: 'applicationId'
  };

  export type KiteuhMemberScalarFieldEnum = (typeof KiteuhMemberScalarFieldEnum)[keyof typeof KiteuhMemberScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'KiteuhStatus'
   */
  export type EnumKiteuhStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KiteuhStatus'>
    


  /**
   * Reference to a field of type 'KiteuhStatus[]'
   */
  export type ListEnumKiteuhStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KiteuhStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type PackageWhereInput = {
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    id?: IntFilter<"Package"> | number
    name?: StringFilter<"Package"> | string
    price?: FloatFilter<"Package"> | number
    category?: StringFilter<"Package"> | string
    items?: StringFilter<"Package"> | string
  }

  export type PackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    category?: SortOrder
    items?: SortOrder
  }

  export type PackageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    name?: StringFilter<"Package"> | string
    price?: FloatFilter<"Package"> | number
    category?: StringFilter<"Package"> | string
    items?: StringFilter<"Package"> | string
  }, "id">

  export type PackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    category?: SortOrder
    items?: SortOrder
    _count?: PackageCountOrderByAggregateInput
    _avg?: PackageAvgOrderByAggregateInput
    _max?: PackageMaxOrderByAggregateInput
    _min?: PackageMinOrderByAggregateInput
    _sum?: PackageSumOrderByAggregateInput
  }

  export type PackageScalarWhereWithAggregatesInput = {
    AND?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    OR?: PackageScalarWhereWithAggregatesInput[]
    NOT?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Package"> | number
    name?: StringWithAggregatesFilter<"Package"> | string
    price?: FloatWithAggregatesFilter<"Package"> | number
    category?: StringWithAggregatesFilter<"Package"> | string
    items?: StringWithAggregatesFilter<"Package"> | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    stripeSessionId?: StringFilter<"Order"> | string
    stripePaymentId?: StringNullableFilter<"Order"> | string | null
    email?: StringFilter<"Order"> | string
    amount?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    customerInfo?: JsonFilter<"Order">
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    stripePaymentId?: SortOrderInput | SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customerInfo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stripeSessionId?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    stripePaymentId?: StringNullableFilter<"Order"> | string | null
    email?: StringFilter<"Order"> | string
    amount?: IntFilter<"Order"> | number
    currency?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    customerInfo?: JsonFilter<"Order">
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
  }, "id" | "stripeSessionId">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    stripePaymentId?: SortOrderInput | SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customerInfo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    stripeSessionId?: StringWithAggregatesFilter<"Order"> | string
    stripePaymentId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    email?: StringWithAggregatesFilter<"Order"> | string
    amount?: IntWithAggregatesFilter<"Order"> | number
    currency?: StringWithAggregatesFilter<"Order"> | string
    status?: StringWithAggregatesFilter<"Order"> | string
    customerInfo?: JsonWithAggregatesFilter<"Order">
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: IntFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productCategory?: StringNullableFilter<"OrderItem"> | string | null
    tshirtSizes?: JsonNullableFilter<"OrderItem">
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrderInput | SortOrder
    tshirtSizes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId_productId?: OrderItemOrderIdProductIdCompoundUniqueInput
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: IntFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productCategory?: StringNullableFilter<"OrderItem"> | string | null
    tshirtSizes?: JsonNullableFilter<"OrderItem">
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id" | "orderId_productId">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrderInput | SortOrder
    tshirtSizes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    price?: IntWithAggregatesFilter<"OrderItem"> | number
    productName?: StringWithAggregatesFilter<"OrderItem"> | string
    productCategory?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    tshirtSizes?: JsonNullableWithAggregatesFilter<"OrderItem">
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
  }

  export type KiteuhApplicationWhereInput = {
    AND?: KiteuhApplicationWhereInput | KiteuhApplicationWhereInput[]
    OR?: KiteuhApplicationWhereInput[]
    NOT?: KiteuhApplicationWhereInput | KiteuhApplicationWhereInput[]
    id?: StringFilter<"KiteuhApplication"> | string
    applicationNumber?: StringFilter<"KiteuhApplication"> | string
    status?: EnumKiteuhStatusFilter<"KiteuhApplication"> | $Enums.KiteuhStatus
    chapter?: StringFilter<"KiteuhApplication"> | string
    memberFirstName?: StringFilter<"KiteuhApplication"> | string
    memberMiddleName?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberLastName?: StringFilter<"KiteuhApplication"> | string
    memberDateOfBirth?: DateTimeFilter<"KiteuhApplication"> | Date | string
    memberAddress?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberCity?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberState?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberZipCode?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberEmail?: StringFilter<"KiteuhApplication"> | string
    memberPhone?: StringFilter<"KiteuhApplication"> | string
    beneficiaryFirstName?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryMiddleName?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryLastName?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryEmail?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryPhone?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryAddress?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryCity?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryState?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryZipCode?: StringNullableFilter<"KiteuhApplication"> | string | null
    assignedMemberId?: StringNullableFilter<"KiteuhApplication"> | string | null
    assignedBy?: StringNullableFilter<"KiteuhApplication"> | string | null
    assignedAt?: DateTimeNullableFilter<"KiteuhApplication"> | Date | string | null
    notes?: StringNullableFilter<"KiteuhApplication"> | string | null
    createdAt?: DateTimeFilter<"KiteuhApplication"> | Date | string
    updatedAt?: DateTimeFilter<"KiteuhApplication"> | Date | string
    member?: XOR<KiteuhMemberNullableScalarRelationFilter, KiteuhMemberWhereInput> | null
  }

  export type KiteuhApplicationOrderByWithRelationInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    status?: SortOrder
    chapter?: SortOrder
    memberFirstName?: SortOrder
    memberMiddleName?: SortOrderInput | SortOrder
    memberLastName?: SortOrder
    memberDateOfBirth?: SortOrder
    memberAddress?: SortOrderInput | SortOrder
    memberCity?: SortOrderInput | SortOrder
    memberState?: SortOrderInput | SortOrder
    memberZipCode?: SortOrderInput | SortOrder
    memberEmail?: SortOrder
    memberPhone?: SortOrder
    beneficiaryFirstName?: SortOrderInput | SortOrder
    beneficiaryMiddleName?: SortOrderInput | SortOrder
    beneficiaryLastName?: SortOrderInput | SortOrder
    beneficiaryEmail?: SortOrderInput | SortOrder
    beneficiaryPhone?: SortOrderInput | SortOrder
    beneficiaryAddress?: SortOrderInput | SortOrder
    beneficiaryCity?: SortOrderInput | SortOrder
    beneficiaryState?: SortOrderInput | SortOrder
    beneficiaryZipCode?: SortOrderInput | SortOrder
    assignedMemberId?: SortOrderInput | SortOrder
    assignedBy?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    member?: KiteuhMemberOrderByWithRelationInput
  }

  export type KiteuhApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    applicationNumber?: string
    AND?: KiteuhApplicationWhereInput | KiteuhApplicationWhereInput[]
    OR?: KiteuhApplicationWhereInput[]
    NOT?: KiteuhApplicationWhereInput | KiteuhApplicationWhereInput[]
    status?: EnumKiteuhStatusFilter<"KiteuhApplication"> | $Enums.KiteuhStatus
    chapter?: StringFilter<"KiteuhApplication"> | string
    memberFirstName?: StringFilter<"KiteuhApplication"> | string
    memberMiddleName?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberLastName?: StringFilter<"KiteuhApplication"> | string
    memberDateOfBirth?: DateTimeFilter<"KiteuhApplication"> | Date | string
    memberAddress?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberCity?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberState?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberZipCode?: StringNullableFilter<"KiteuhApplication"> | string | null
    memberEmail?: StringFilter<"KiteuhApplication"> | string
    memberPhone?: StringFilter<"KiteuhApplication"> | string
    beneficiaryFirstName?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryMiddleName?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryLastName?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryEmail?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryPhone?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryAddress?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryCity?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryState?: StringNullableFilter<"KiteuhApplication"> | string | null
    beneficiaryZipCode?: StringNullableFilter<"KiteuhApplication"> | string | null
    assignedMemberId?: StringNullableFilter<"KiteuhApplication"> | string | null
    assignedBy?: StringNullableFilter<"KiteuhApplication"> | string | null
    assignedAt?: DateTimeNullableFilter<"KiteuhApplication"> | Date | string | null
    notes?: StringNullableFilter<"KiteuhApplication"> | string | null
    createdAt?: DateTimeFilter<"KiteuhApplication"> | Date | string
    updatedAt?: DateTimeFilter<"KiteuhApplication"> | Date | string
    member?: XOR<KiteuhMemberNullableScalarRelationFilter, KiteuhMemberWhereInput> | null
  }, "id" | "applicationNumber">

  export type KiteuhApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    status?: SortOrder
    chapter?: SortOrder
    memberFirstName?: SortOrder
    memberMiddleName?: SortOrderInput | SortOrder
    memberLastName?: SortOrder
    memberDateOfBirth?: SortOrder
    memberAddress?: SortOrderInput | SortOrder
    memberCity?: SortOrderInput | SortOrder
    memberState?: SortOrderInput | SortOrder
    memberZipCode?: SortOrderInput | SortOrder
    memberEmail?: SortOrder
    memberPhone?: SortOrder
    beneficiaryFirstName?: SortOrderInput | SortOrder
    beneficiaryMiddleName?: SortOrderInput | SortOrder
    beneficiaryLastName?: SortOrderInput | SortOrder
    beneficiaryEmail?: SortOrderInput | SortOrder
    beneficiaryPhone?: SortOrderInput | SortOrder
    beneficiaryAddress?: SortOrderInput | SortOrder
    beneficiaryCity?: SortOrderInput | SortOrder
    beneficiaryState?: SortOrderInput | SortOrder
    beneficiaryZipCode?: SortOrderInput | SortOrder
    assignedMemberId?: SortOrderInput | SortOrder
    assignedBy?: SortOrderInput | SortOrder
    assignedAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KiteuhApplicationCountOrderByAggregateInput
    _max?: KiteuhApplicationMaxOrderByAggregateInput
    _min?: KiteuhApplicationMinOrderByAggregateInput
  }

  export type KiteuhApplicationScalarWhereWithAggregatesInput = {
    AND?: KiteuhApplicationScalarWhereWithAggregatesInput | KiteuhApplicationScalarWhereWithAggregatesInput[]
    OR?: KiteuhApplicationScalarWhereWithAggregatesInput[]
    NOT?: KiteuhApplicationScalarWhereWithAggregatesInput | KiteuhApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KiteuhApplication"> | string
    applicationNumber?: StringWithAggregatesFilter<"KiteuhApplication"> | string
    status?: EnumKiteuhStatusWithAggregatesFilter<"KiteuhApplication"> | $Enums.KiteuhStatus
    chapter?: StringWithAggregatesFilter<"KiteuhApplication"> | string
    memberFirstName?: StringWithAggregatesFilter<"KiteuhApplication"> | string
    memberMiddleName?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    memberLastName?: StringWithAggregatesFilter<"KiteuhApplication"> | string
    memberDateOfBirth?: DateTimeWithAggregatesFilter<"KiteuhApplication"> | Date | string
    memberAddress?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    memberCity?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    memberState?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    memberZipCode?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    memberEmail?: StringWithAggregatesFilter<"KiteuhApplication"> | string
    memberPhone?: StringWithAggregatesFilter<"KiteuhApplication"> | string
    beneficiaryFirstName?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryMiddleName?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryLastName?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryEmail?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryPhone?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryAddress?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryCity?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryState?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    beneficiaryZipCode?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    assignedMemberId?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    assignedBy?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    assignedAt?: DateTimeNullableWithAggregatesFilter<"KiteuhApplication"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"KiteuhApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"KiteuhApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KiteuhApplication"> | Date | string
  }

  export type KiteuhMemberWhereInput = {
    AND?: KiteuhMemberWhereInput | KiteuhMemberWhereInput[]
    OR?: KiteuhMemberWhereInput[]
    NOT?: KiteuhMemberWhereInput | KiteuhMemberWhereInput[]
    id?: StringFilter<"KiteuhMember"> | string
    memberId?: StringFilter<"KiteuhMember"> | string
    fullName?: StringFilter<"KiteuhMember"> | string
    email?: StringFilter<"KiteuhMember"> | string
    phone?: StringFilter<"KiteuhMember"> | string
    chapter?: StringFilter<"KiteuhMember"> | string
    dateOfBirth?: DateTimeFilter<"KiteuhMember"> | Date | string
    address?: StringNullableFilter<"KiteuhMember"> | string | null
    city?: StringNullableFilter<"KiteuhMember"> | string | null
    state?: StringNullableFilter<"KiteuhMember"> | string | null
    zipCode?: StringNullableFilter<"KiteuhMember"> | string | null
    status?: EnumKiteuhStatusFilter<"KiteuhMember"> | $Enums.KiteuhStatus
    createdAt?: DateTimeFilter<"KiteuhMember"> | Date | string
    updatedAt?: DateTimeFilter<"KiteuhMember"> | Date | string
    applicationId?: StringNullableFilter<"KiteuhMember"> | string | null
    application?: XOR<KiteuhApplicationNullableScalarRelationFilter, KiteuhApplicationWhereInput> | null
  }

  export type KiteuhMemberOrderByWithRelationInput = {
    id?: SortOrder
    memberId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    chapter?: SortOrder
    dateOfBirth?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    applicationId?: SortOrderInput | SortOrder
    application?: KiteuhApplicationOrderByWithRelationInput
  }

  export type KiteuhMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    memberId?: string
    applicationId?: string
    AND?: KiteuhMemberWhereInput | KiteuhMemberWhereInput[]
    OR?: KiteuhMemberWhereInput[]
    NOT?: KiteuhMemberWhereInput | KiteuhMemberWhereInput[]
    fullName?: StringFilter<"KiteuhMember"> | string
    email?: StringFilter<"KiteuhMember"> | string
    phone?: StringFilter<"KiteuhMember"> | string
    chapter?: StringFilter<"KiteuhMember"> | string
    dateOfBirth?: DateTimeFilter<"KiteuhMember"> | Date | string
    address?: StringNullableFilter<"KiteuhMember"> | string | null
    city?: StringNullableFilter<"KiteuhMember"> | string | null
    state?: StringNullableFilter<"KiteuhMember"> | string | null
    zipCode?: StringNullableFilter<"KiteuhMember"> | string | null
    status?: EnumKiteuhStatusFilter<"KiteuhMember"> | $Enums.KiteuhStatus
    createdAt?: DateTimeFilter<"KiteuhMember"> | Date | string
    updatedAt?: DateTimeFilter<"KiteuhMember"> | Date | string
    application?: XOR<KiteuhApplicationNullableScalarRelationFilter, KiteuhApplicationWhereInput> | null
  }, "id" | "memberId" | "applicationId">

  export type KiteuhMemberOrderByWithAggregationInput = {
    id?: SortOrder
    memberId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    chapter?: SortOrder
    dateOfBirth?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    applicationId?: SortOrderInput | SortOrder
    _count?: KiteuhMemberCountOrderByAggregateInput
    _max?: KiteuhMemberMaxOrderByAggregateInput
    _min?: KiteuhMemberMinOrderByAggregateInput
  }

  export type KiteuhMemberScalarWhereWithAggregatesInput = {
    AND?: KiteuhMemberScalarWhereWithAggregatesInput | KiteuhMemberScalarWhereWithAggregatesInput[]
    OR?: KiteuhMemberScalarWhereWithAggregatesInput[]
    NOT?: KiteuhMemberScalarWhereWithAggregatesInput | KiteuhMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KiteuhMember"> | string
    memberId?: StringWithAggregatesFilter<"KiteuhMember"> | string
    fullName?: StringWithAggregatesFilter<"KiteuhMember"> | string
    email?: StringWithAggregatesFilter<"KiteuhMember"> | string
    phone?: StringWithAggregatesFilter<"KiteuhMember"> | string
    chapter?: StringWithAggregatesFilter<"KiteuhMember"> | string
    dateOfBirth?: DateTimeWithAggregatesFilter<"KiteuhMember"> | Date | string
    address?: StringNullableWithAggregatesFilter<"KiteuhMember"> | string | null
    city?: StringNullableWithAggregatesFilter<"KiteuhMember"> | string | null
    state?: StringNullableWithAggregatesFilter<"KiteuhMember"> | string | null
    zipCode?: StringNullableWithAggregatesFilter<"KiteuhMember"> | string | null
    status?: EnumKiteuhStatusWithAggregatesFilter<"KiteuhMember"> | $Enums.KiteuhStatus
    createdAt?: DateTimeWithAggregatesFilter<"KiteuhMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KiteuhMember"> | Date | string
    applicationId?: StringNullableWithAggregatesFilter<"KiteuhMember"> | string | null
  }

  export type PackageCreateInput = {
    name: string
    price: number
    category: string
    items: string
  }

  export type PackageUncheckedCreateInput = {
    id?: number
    name: string
    price: number
    category: string
    items: string
  }

  export type PackageUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
  }

  export type PackageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
  }

  export type PackageCreateManyInput = {
    id?: number
    name: string
    price: number
    category: string
    items: string
  }

  export type PackageUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
  }

  export type PackageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    items?: StringFieldUpdateOperationsInput | string
  }

  export type OrderCreateInput = {
    id?: string
    stripeSessionId: string
    stripePaymentId?: string | null
    email: string
    amount: number
    currency?: string
    status?: string
    customerInfo: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    stripeSessionId: string
    stripePaymentId?: string | null
    email: string
    amount: number
    currency?: string
    status?: string
    customerInfo: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerInfo?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerInfo?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    stripeSessionId: string
    stripePaymentId?: string | null
    email: string
    amount: number
    currency?: string
    status?: string
    customerInfo: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerInfo?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerInfo?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    productName: string
    productCategory?: string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    productName: string
    productCategory?: string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    productName: string
    productCategory?: string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhApplicationCreateInput = {
    id?: string
    applicationNumber: string
    status?: $Enums.KiteuhStatus
    chapter: string
    memberFirstName: string
    memberMiddleName?: string | null
    memberLastName: string
    memberDateOfBirth: Date | string
    memberAddress?: string | null
    memberCity?: string | null
    memberState?: string | null
    memberZipCode?: string | null
    memberEmail: string
    memberPhone: string
    beneficiaryFirstName?: string | null
    beneficiaryMiddleName?: string | null
    beneficiaryLastName?: string | null
    beneficiaryEmail?: string | null
    beneficiaryPhone?: string | null
    beneficiaryAddress?: string | null
    beneficiaryCity?: string | null
    beneficiaryState?: string | null
    beneficiaryZipCode?: string | null
    assignedMemberId?: string | null
    assignedBy?: string | null
    assignedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member?: KiteuhMemberCreateNestedOneWithoutApplicationInput
  }

  export type KiteuhApplicationUncheckedCreateInput = {
    id?: string
    applicationNumber: string
    status?: $Enums.KiteuhStatus
    chapter: string
    memberFirstName: string
    memberMiddleName?: string | null
    memberLastName: string
    memberDateOfBirth: Date | string
    memberAddress?: string | null
    memberCity?: string | null
    memberState?: string | null
    memberZipCode?: string | null
    memberEmail: string
    memberPhone: string
    beneficiaryFirstName?: string | null
    beneficiaryMiddleName?: string | null
    beneficiaryLastName?: string | null
    beneficiaryEmail?: string | null
    beneficiaryPhone?: string | null
    beneficiaryAddress?: string | null
    beneficiaryCity?: string | null
    beneficiaryState?: string | null
    beneficiaryZipCode?: string | null
    assignedMemberId?: string | null
    assignedBy?: string | null
    assignedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member?: KiteuhMemberUncheckedCreateNestedOneWithoutApplicationInput
  }

  export type KiteuhApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    chapter?: StringFieldUpdateOperationsInput | string
    memberFirstName?: StringFieldUpdateOperationsInput | string
    memberMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    memberLastName?: StringFieldUpdateOperationsInput | string
    memberDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null
    memberCity?: NullableStringFieldUpdateOperationsInput | string | null
    memberState?: NullableStringFieldUpdateOperationsInput | string | null
    memberZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    memberEmail?: StringFieldUpdateOperationsInput | string
    memberPhone?: StringFieldUpdateOperationsInput | string
    beneficiaryFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryLastName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryEmail?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryCity?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryState?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    assignedMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: KiteuhMemberUpdateOneWithoutApplicationNestedInput
  }

  export type KiteuhApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    chapter?: StringFieldUpdateOperationsInput | string
    memberFirstName?: StringFieldUpdateOperationsInput | string
    memberMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    memberLastName?: StringFieldUpdateOperationsInput | string
    memberDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null
    memberCity?: NullableStringFieldUpdateOperationsInput | string | null
    memberState?: NullableStringFieldUpdateOperationsInput | string | null
    memberZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    memberEmail?: StringFieldUpdateOperationsInput | string
    memberPhone?: StringFieldUpdateOperationsInput | string
    beneficiaryFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryLastName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryEmail?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryCity?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryState?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    assignedMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: KiteuhMemberUncheckedUpdateOneWithoutApplicationNestedInput
  }

  export type KiteuhApplicationCreateManyInput = {
    id?: string
    applicationNumber: string
    status?: $Enums.KiteuhStatus
    chapter: string
    memberFirstName: string
    memberMiddleName?: string | null
    memberLastName: string
    memberDateOfBirth: Date | string
    memberAddress?: string | null
    memberCity?: string | null
    memberState?: string | null
    memberZipCode?: string | null
    memberEmail: string
    memberPhone: string
    beneficiaryFirstName?: string | null
    beneficiaryMiddleName?: string | null
    beneficiaryLastName?: string | null
    beneficiaryEmail?: string | null
    beneficiaryPhone?: string | null
    beneficiaryAddress?: string | null
    beneficiaryCity?: string | null
    beneficiaryState?: string | null
    beneficiaryZipCode?: string | null
    assignedMemberId?: string | null
    assignedBy?: string | null
    assignedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KiteuhApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    chapter?: StringFieldUpdateOperationsInput | string
    memberFirstName?: StringFieldUpdateOperationsInput | string
    memberMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    memberLastName?: StringFieldUpdateOperationsInput | string
    memberDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null
    memberCity?: NullableStringFieldUpdateOperationsInput | string | null
    memberState?: NullableStringFieldUpdateOperationsInput | string | null
    memberZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    memberEmail?: StringFieldUpdateOperationsInput | string
    memberPhone?: StringFieldUpdateOperationsInput | string
    beneficiaryFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryLastName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryEmail?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryCity?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryState?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    assignedMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    chapter?: StringFieldUpdateOperationsInput | string
    memberFirstName?: StringFieldUpdateOperationsInput | string
    memberMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    memberLastName?: StringFieldUpdateOperationsInput | string
    memberDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null
    memberCity?: NullableStringFieldUpdateOperationsInput | string | null
    memberState?: NullableStringFieldUpdateOperationsInput | string | null
    memberZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    memberEmail?: StringFieldUpdateOperationsInput | string
    memberPhone?: StringFieldUpdateOperationsInput | string
    beneficiaryFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryLastName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryEmail?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryCity?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryState?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    assignedMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhMemberCreateInput = {
    id?: string
    memberId: string
    fullName: string
    email: string
    phone: string
    chapter: string
    dateOfBirth: Date | string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    status?: $Enums.KiteuhStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    application?: KiteuhApplicationCreateNestedOneWithoutMemberInput
  }

  export type KiteuhMemberUncheckedCreateInput = {
    id?: string
    memberId: string
    fullName: string
    email: string
    phone: string
    chapter: string
    dateOfBirth: Date | string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    status?: $Enums.KiteuhStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    applicationId?: string | null
  }

  export type KiteuhMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    chapter?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    application?: KiteuhApplicationUpdateOneWithoutMemberNestedInput
  }

  export type KiteuhMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    chapter?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applicationId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type KiteuhMemberCreateManyInput = {
    id?: string
    memberId: string
    fullName: string
    email: string
    phone: string
    chapter: string
    dateOfBirth: Date | string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    status?: $Enums.KiteuhStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    applicationId?: string | null
  }

  export type KiteuhMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    chapter?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    chapter?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applicationId?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type PackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    category?: SortOrder
    items?: SortOrder
  }

  export type PackageAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
  }

  export type PackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    category?: SortOrder
    items?: SortOrder
  }

  export type PackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    category?: SortOrder
    items?: SortOrder
  }

  export type PackageSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
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
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    stripePaymentId?: SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    customerInfo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    stripePaymentId?: SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    stripeSessionId?: SortOrder
    stripePaymentId?: SortOrder
    email?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    amount?: SortOrder
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
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemOrderIdProductIdCompoundUniqueInput = {
    orderId: string
    productId: string
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    tshirtSizes?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    productName?: SortOrder
    productCategory?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumKiteuhStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KiteuhStatus | EnumKiteuhStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKiteuhStatusFilter<$PrismaModel> | $Enums.KiteuhStatus
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

  export type KiteuhMemberNullableScalarRelationFilter = {
    is?: KiteuhMemberWhereInput | null
    isNot?: KiteuhMemberWhereInput | null
  }

  export type KiteuhApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    status?: SortOrder
    chapter?: SortOrder
    memberFirstName?: SortOrder
    memberMiddleName?: SortOrder
    memberLastName?: SortOrder
    memberDateOfBirth?: SortOrder
    memberAddress?: SortOrder
    memberCity?: SortOrder
    memberState?: SortOrder
    memberZipCode?: SortOrder
    memberEmail?: SortOrder
    memberPhone?: SortOrder
    beneficiaryFirstName?: SortOrder
    beneficiaryMiddleName?: SortOrder
    beneficiaryLastName?: SortOrder
    beneficiaryEmail?: SortOrder
    beneficiaryPhone?: SortOrder
    beneficiaryAddress?: SortOrder
    beneficiaryCity?: SortOrder
    beneficiaryState?: SortOrder
    beneficiaryZipCode?: SortOrder
    assignedMemberId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KiteuhApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    status?: SortOrder
    chapter?: SortOrder
    memberFirstName?: SortOrder
    memberMiddleName?: SortOrder
    memberLastName?: SortOrder
    memberDateOfBirth?: SortOrder
    memberAddress?: SortOrder
    memberCity?: SortOrder
    memberState?: SortOrder
    memberZipCode?: SortOrder
    memberEmail?: SortOrder
    memberPhone?: SortOrder
    beneficiaryFirstName?: SortOrder
    beneficiaryMiddleName?: SortOrder
    beneficiaryLastName?: SortOrder
    beneficiaryEmail?: SortOrder
    beneficiaryPhone?: SortOrder
    beneficiaryAddress?: SortOrder
    beneficiaryCity?: SortOrder
    beneficiaryState?: SortOrder
    beneficiaryZipCode?: SortOrder
    assignedMemberId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KiteuhApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    applicationNumber?: SortOrder
    status?: SortOrder
    chapter?: SortOrder
    memberFirstName?: SortOrder
    memberMiddleName?: SortOrder
    memberLastName?: SortOrder
    memberDateOfBirth?: SortOrder
    memberAddress?: SortOrder
    memberCity?: SortOrder
    memberState?: SortOrder
    memberZipCode?: SortOrder
    memberEmail?: SortOrder
    memberPhone?: SortOrder
    beneficiaryFirstName?: SortOrder
    beneficiaryMiddleName?: SortOrder
    beneficiaryLastName?: SortOrder
    beneficiaryEmail?: SortOrder
    beneficiaryPhone?: SortOrder
    beneficiaryAddress?: SortOrder
    beneficiaryCity?: SortOrder
    beneficiaryState?: SortOrder
    beneficiaryZipCode?: SortOrder
    assignedMemberId?: SortOrder
    assignedBy?: SortOrder
    assignedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumKiteuhStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KiteuhStatus | EnumKiteuhStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKiteuhStatusWithAggregatesFilter<$PrismaModel> | $Enums.KiteuhStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKiteuhStatusFilter<$PrismaModel>
    _max?: NestedEnumKiteuhStatusFilter<$PrismaModel>
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

  export type KiteuhApplicationNullableScalarRelationFilter = {
    is?: KiteuhApplicationWhereInput | null
    isNot?: KiteuhApplicationWhereInput | null
  }

  export type KiteuhMemberCountOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    chapter?: SortOrder
    dateOfBirth?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    applicationId?: SortOrder
  }

  export type KiteuhMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    chapter?: SortOrder
    dateOfBirth?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    applicationId?: SortOrder
  }

  export type KiteuhMemberMinOrderByAggregateInput = {
    id?: SortOrder
    memberId?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    chapter?: SortOrder
    dateOfBirth?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    applicationId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type KiteuhMemberCreateNestedOneWithoutApplicationInput = {
    create?: XOR<KiteuhMemberCreateWithoutApplicationInput, KiteuhMemberUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: KiteuhMemberCreateOrConnectWithoutApplicationInput
    connect?: KiteuhMemberWhereUniqueInput
  }

  export type KiteuhMemberUncheckedCreateNestedOneWithoutApplicationInput = {
    create?: XOR<KiteuhMemberCreateWithoutApplicationInput, KiteuhMemberUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: KiteuhMemberCreateOrConnectWithoutApplicationInput
    connect?: KiteuhMemberWhereUniqueInput
  }

  export type EnumKiteuhStatusFieldUpdateOperationsInput = {
    set?: $Enums.KiteuhStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type KiteuhMemberUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<KiteuhMemberCreateWithoutApplicationInput, KiteuhMemberUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: KiteuhMemberCreateOrConnectWithoutApplicationInput
    upsert?: KiteuhMemberUpsertWithoutApplicationInput
    disconnect?: KiteuhMemberWhereInput | boolean
    delete?: KiteuhMemberWhereInput | boolean
    connect?: KiteuhMemberWhereUniqueInput
    update?: XOR<XOR<KiteuhMemberUpdateToOneWithWhereWithoutApplicationInput, KiteuhMemberUpdateWithoutApplicationInput>, KiteuhMemberUncheckedUpdateWithoutApplicationInput>
  }

  export type KiteuhMemberUncheckedUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<KiteuhMemberCreateWithoutApplicationInput, KiteuhMemberUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: KiteuhMemberCreateOrConnectWithoutApplicationInput
    upsert?: KiteuhMemberUpsertWithoutApplicationInput
    disconnect?: KiteuhMemberWhereInput | boolean
    delete?: KiteuhMemberWhereInput | boolean
    connect?: KiteuhMemberWhereUniqueInput
    update?: XOR<XOR<KiteuhMemberUpdateToOneWithWhereWithoutApplicationInput, KiteuhMemberUpdateWithoutApplicationInput>, KiteuhMemberUncheckedUpdateWithoutApplicationInput>
  }

  export type KiteuhApplicationCreateNestedOneWithoutMemberInput = {
    create?: XOR<KiteuhApplicationCreateWithoutMemberInput, KiteuhApplicationUncheckedCreateWithoutMemberInput>
    connectOrCreate?: KiteuhApplicationCreateOrConnectWithoutMemberInput
    connect?: KiteuhApplicationWhereUniqueInput
  }

  export type KiteuhApplicationUpdateOneWithoutMemberNestedInput = {
    create?: XOR<KiteuhApplicationCreateWithoutMemberInput, KiteuhApplicationUncheckedCreateWithoutMemberInput>
    connectOrCreate?: KiteuhApplicationCreateOrConnectWithoutMemberInput
    upsert?: KiteuhApplicationUpsertWithoutMemberInput
    disconnect?: KiteuhApplicationWhereInput | boolean
    delete?: KiteuhApplicationWhereInput | boolean
    connect?: KiteuhApplicationWhereUniqueInput
    update?: XOR<XOR<KiteuhApplicationUpdateToOneWithWhereWithoutMemberInput, KiteuhApplicationUpdateWithoutMemberInput>, KiteuhApplicationUncheckedUpdateWithoutMemberInput>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
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
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumKiteuhStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KiteuhStatus | EnumKiteuhStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKiteuhStatusFilter<$PrismaModel> | $Enums.KiteuhStatus
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

  export type NestedEnumKiteuhStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KiteuhStatus | EnumKiteuhStatusFieldRefInput<$PrismaModel>
    in?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.KiteuhStatus[] | ListEnumKiteuhStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumKiteuhStatusWithAggregatesFilter<$PrismaModel> | $Enums.KiteuhStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKiteuhStatusFilter<$PrismaModel>
    _max?: NestedEnumKiteuhStatusFilter<$PrismaModel>
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

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    productName: string
    productCategory?: string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    productName: string
    productCategory?: string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: IntFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productCategory?: StringNullableFilter<"OrderItem"> | string | null
    tshirtSizes?: JsonNullableFilter<"OrderItem">
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    stripeSessionId: string
    stripePaymentId?: string | null
    email: string
    amount: number
    currency?: string
    status?: string
    customerInfo: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    stripeSessionId: string
    stripePaymentId?: string | null
    email: string
    amount: number
    currency?: string
    status?: string
    customerInfo: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerInfo?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    customerInfo?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhMemberCreateWithoutApplicationInput = {
    id?: string
    memberId: string
    fullName: string
    email: string
    phone: string
    chapter: string
    dateOfBirth: Date | string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    status?: $Enums.KiteuhStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KiteuhMemberUncheckedCreateWithoutApplicationInput = {
    id?: string
    memberId: string
    fullName: string
    email: string
    phone: string
    chapter: string
    dateOfBirth: Date | string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    status?: $Enums.KiteuhStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KiteuhMemberCreateOrConnectWithoutApplicationInput = {
    where: KiteuhMemberWhereUniqueInput
    create: XOR<KiteuhMemberCreateWithoutApplicationInput, KiteuhMemberUncheckedCreateWithoutApplicationInput>
  }

  export type KiteuhMemberUpsertWithoutApplicationInput = {
    update: XOR<KiteuhMemberUpdateWithoutApplicationInput, KiteuhMemberUncheckedUpdateWithoutApplicationInput>
    create: XOR<KiteuhMemberCreateWithoutApplicationInput, KiteuhMemberUncheckedCreateWithoutApplicationInput>
    where?: KiteuhMemberWhereInput
  }

  export type KiteuhMemberUpdateToOneWithWhereWithoutApplicationInput = {
    where?: KiteuhMemberWhereInput
    data: XOR<KiteuhMemberUpdateWithoutApplicationInput, KiteuhMemberUncheckedUpdateWithoutApplicationInput>
  }

  export type KiteuhMemberUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    chapter?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhMemberUncheckedUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    chapter?: StringFieldUpdateOperationsInput | string
    dateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhApplicationCreateWithoutMemberInput = {
    id?: string
    applicationNumber: string
    status?: $Enums.KiteuhStatus
    chapter: string
    memberFirstName: string
    memberMiddleName?: string | null
    memberLastName: string
    memberDateOfBirth: Date | string
    memberAddress?: string | null
    memberCity?: string | null
    memberState?: string | null
    memberZipCode?: string | null
    memberEmail: string
    memberPhone: string
    beneficiaryFirstName?: string | null
    beneficiaryMiddleName?: string | null
    beneficiaryLastName?: string | null
    beneficiaryEmail?: string | null
    beneficiaryPhone?: string | null
    beneficiaryAddress?: string | null
    beneficiaryCity?: string | null
    beneficiaryState?: string | null
    beneficiaryZipCode?: string | null
    assignedMemberId?: string | null
    assignedBy?: string | null
    assignedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KiteuhApplicationUncheckedCreateWithoutMemberInput = {
    id?: string
    applicationNumber: string
    status?: $Enums.KiteuhStatus
    chapter: string
    memberFirstName: string
    memberMiddleName?: string | null
    memberLastName: string
    memberDateOfBirth: Date | string
    memberAddress?: string | null
    memberCity?: string | null
    memberState?: string | null
    memberZipCode?: string | null
    memberEmail: string
    memberPhone: string
    beneficiaryFirstName?: string | null
    beneficiaryMiddleName?: string | null
    beneficiaryLastName?: string | null
    beneficiaryEmail?: string | null
    beneficiaryPhone?: string | null
    beneficiaryAddress?: string | null
    beneficiaryCity?: string | null
    beneficiaryState?: string | null
    beneficiaryZipCode?: string | null
    assignedMemberId?: string | null
    assignedBy?: string | null
    assignedAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KiteuhApplicationCreateOrConnectWithoutMemberInput = {
    where: KiteuhApplicationWhereUniqueInput
    create: XOR<KiteuhApplicationCreateWithoutMemberInput, KiteuhApplicationUncheckedCreateWithoutMemberInput>
  }

  export type KiteuhApplicationUpsertWithoutMemberInput = {
    update: XOR<KiteuhApplicationUpdateWithoutMemberInput, KiteuhApplicationUncheckedUpdateWithoutMemberInput>
    create: XOR<KiteuhApplicationCreateWithoutMemberInput, KiteuhApplicationUncheckedCreateWithoutMemberInput>
    where?: KiteuhApplicationWhereInput
  }

  export type KiteuhApplicationUpdateToOneWithWhereWithoutMemberInput = {
    where?: KiteuhApplicationWhereInput
    data: XOR<KiteuhApplicationUpdateWithoutMemberInput, KiteuhApplicationUncheckedUpdateWithoutMemberInput>
  }

  export type KiteuhApplicationUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    chapter?: StringFieldUpdateOperationsInput | string
    memberFirstName?: StringFieldUpdateOperationsInput | string
    memberMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    memberLastName?: StringFieldUpdateOperationsInput | string
    memberDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null
    memberCity?: NullableStringFieldUpdateOperationsInput | string | null
    memberState?: NullableStringFieldUpdateOperationsInput | string | null
    memberZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    memberEmail?: StringFieldUpdateOperationsInput | string
    memberPhone?: StringFieldUpdateOperationsInput | string
    beneficiaryFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryLastName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryEmail?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryCity?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryState?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    assignedMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KiteuhApplicationUncheckedUpdateWithoutMemberInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationNumber?: StringFieldUpdateOperationsInput | string
    status?: EnumKiteuhStatusFieldUpdateOperationsInput | $Enums.KiteuhStatus
    chapter?: StringFieldUpdateOperationsInput | string
    memberFirstName?: StringFieldUpdateOperationsInput | string
    memberMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    memberLastName?: StringFieldUpdateOperationsInput | string
    memberDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    memberAddress?: NullableStringFieldUpdateOperationsInput | string | null
    memberCity?: NullableStringFieldUpdateOperationsInput | string | null
    memberState?: NullableStringFieldUpdateOperationsInput | string | null
    memberZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    memberEmail?: StringFieldUpdateOperationsInput | string
    memberPhone?: StringFieldUpdateOperationsInput | string
    beneficiaryFirstName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryMiddleName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryLastName?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryEmail?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryPhone?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryAddress?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryCity?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryState?: NullableStringFieldUpdateOperationsInput | string | null
    beneficiaryZipCode?: NullableStringFieldUpdateOperationsInput | string | null
    assignedMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    assignedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    productName: string
    productCategory?: string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productCategory?: NullableStringFieldUpdateOperationsInput | string | null
    tshirtSizes?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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