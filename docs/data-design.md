# Data Design

## 1. Why MongoDB Instead of SQL?

This project uses MongoDB to store portfolio projects and user accounts as documents. MongoDB works well with Mongoose and allows project data, such as descriptions, technologies, and URLs, to be represented in a flexible document structure. A relational database such as PostgreSQL would also be a valid option, particularly if the application required complex relationships and joins.

## 2. What Would the Projects Table Look Like in PostgreSQL?

A PostgreSQL implementation could use a `projects` table with columns for an integer primary key, a unique custom project ID, name, description, technologies, image URL, GitHub URL, and live URL. Additional columns could store category, featured status, and like count if those features were implemented. Constraints could enforce required fields, unique IDs, and valid relationships.

## 3. How Are Arrays and Relationships Represented?

MongoDB supports arrays inside documents, making it possible to store a project's technologies as an array of strings. If project likes are implemented, the application could also store user identifiers in a `likedBy` array or use a separate collection to represent likes. The appropriate design depends on the implemented feature requirements and how the data needs to be queried.

## 4. Who Enforces Schema Rules?

Mongoose schemas define the structure and constraints for documents stored in MongoDB. Zod validation checks incoming request data before it reaches the database operations. Both layers help protect data integrity, while authorization middleware ensures that only permitted users can perform restricted operations.

## 5. Why Use Custom IDs?

Custom project IDs provide stable, readable identifiers for API routes and project references. They can use a format such as `PRJ-0001`, rather than exposing MongoDB's internal `_id` value. The assignment specifies a counter-based approach for generating these IDs; the implementation should use an atomic counter update to avoid generating duplicate IDs during concurrent requests.

## 6. Why Use Atomic Updates?

Atomic updates allow a database operation to complete as one indivisible change. For example, incrementing a counter with MongoDB's `$inc` operator helps prevent two simultaneous requests from receiving the same next counter value. Atomic updates are especially important when multiple users can create records or update shared values at the same time.

## 7. When Would a Transaction Be Needed?

A transaction is useful when multiple database changes must succeed or fail together. For example, if creating a project requires updating a counter and inserting a project document, a transaction can help keep those operations consistent if either operation fails. Whether a transaction is necessary depends on the actual implementation and database deployment configuration.

## 8. Why Deactivate an Account Instead of Deleting It?

Deactivating an account preserves the user record while preventing the account from accessing protected features. This can help maintain useful references to existing records and support administrative auditing. In this application, authentication middleware should reject inactive accounts; permanent deletion can be considered separately when appropriate.
