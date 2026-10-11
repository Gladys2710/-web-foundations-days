# School Database - Design Notes

## Tables

- **students** - stores each student: first name, last name and email. The email has a `UNIQUE` constraint because no two students should share an email address.
- **courses** - stores each course: its title and number of credits. Credits must be positive, enforced by a `CHECK` constraint.
- **enrolments** - the join table. Each row records that one student is enrolled on one course, and holds the grade for that enrolment. It has its own primary key plus foreign keys pointing at `students` and `courses`.

## Relationships

- **One-to-many:** one course can have many enrolments, and one student can have many enrolments. This is why `enrolments` holds `student_id` and `course_id` as foreign keys - the "many" side carries the keys of the "one" side.
- **Many-to-many:** students and courses relate many-to-many - one student takes many courses, and one course has many students. A single foreign key cannot represent this, so a **join table** (`enrolments`) is needed to break the relationship into two one-to-many relationships. The join table also gives us a natural home for the **grade**, which belongs to the enrolment itself, not to the student or the course.
- **Preventing duplicate enrolments:** the constraint `UNIQUE (student_id, course_id)` stops the same student from enrolling on the same course twice.

## Index

I would add an index on the `email` column of `students`. Logins and searches are likely to look students up by email, so an index avoids scanning the whole table. In SQLite the `UNIQUE` constraint on email already creates this index automatically, which is an added benefit of declaring it.

## SQL or NoSQL?

I would choose **SQL** for this system. The data is highly structured (students, courses, enrolments) with clear relationships between entities, and the queries we need - joins, grouping, counting - are exactly what relational databases are optimised for. SQL also guarantees consistency through constraints: foreign keys prevent orphaned enrolments, `UNIQUE` protects the email and stops duplicate enrolments, and transactions keep grades safe if two people update at once. A NoSQL document store would make enrolment lookups and cross-entity reporting awkward, since related data would be split across documents with no built-in join or constraint support. SQL fits this problem naturally and keeps the data valid by default.
