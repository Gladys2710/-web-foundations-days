-- ============================================
-- Day 6: School Database (SQLite)
-- Run me in a SQLite playground such as sqliteonline.com
-- ============================================

-- 1. CREATE TABLE statements
-- ---------------------------------------------

CREATE TABLE students (
    student_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name   TEXT NOT NULL,
    last_name    TEXT NOT NULL,
    email        TEXT NOT NULL UNIQUE
);

CREATE TABLE courses (
    course_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    credits     INTEGER NOT NULL CHECK (credits > 0)
);

-- The join table: links students to courses and holds the grade.
-- UNIQUE(student_id, course_id) prevents the same student
-- enrolling on the same course twice.
CREATE TABLE enrolments (
    enrolment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id   INTEGER NOT NULL,
    course_id    INTEGER NOT NULL,
    grade        TEXT,
    UNIQUE (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students (student_id),
    FOREIGN KEY (course_id) REFERENCES courses (course_id)
);

-- 2. Sample data
-- ---------------------------------------------

INSERT INTO students (first_name, last_name, email) VALUES
    ('Amina',   'Kariuki',   'amina@school.com'),
    ('Brian',   'Omondi',    'brian@school.com'),
    ('Clara',   'Wanjiru',   'clara@school.com'),
    ('David',   'Mwangi',    'david@school.com');

INSERT INTO courses (title, credits) VALUES
    ('Web Foundations', 3),
    ('Databases',       4),
    ('UI Design',       2);

INSERT INTO enrolments (student_id, course_id, grade) VALUES
    (1, 1, 'A'),
    (1, 2, 'B'),
    (2, 1, 'C'),
    (3, 2, 'A'),
    (3, 3, NULL);

-- David (student 4) is intentionally NOT enrolled on anything,
-- so the "students with no enrolments" query has a result.

-- 3. The five queries
-- ---------------------------------------------

-- Q1: All courses for one student (by name)
SELECT c.title, c.credits, e.grade
FROM students s
JOIN enrolments e ON e.student_id = s.student_id
JOIN courses c    ON c.course_id = e.course_id
WHERE s.first_name = 'Amina' AND s.last_name = 'Kariuki';

-- Q2: All students on one course
SELECT s.first_name, s.last_name, s.email
FROM courses c
JOIN enrolments e ON e.course_id = c.course_id
JOIN students s   ON s.student_id = e.student_id
WHERE c.title = 'Web Foundations';

-- Q3: Number of students per course
SELECT c.title, COUNT(e.student_id) AS student_count
FROM courses c
LEFT JOIN enrolments e ON e.course_id = c.course_id
GROUP BY c.course_id, c.title;

-- Q4: Students who have no enrolments
SELECT s.first_name, s.last_name
FROM students s
LEFT JOIN enrolments e ON e.student_id = s.student_id
WHERE e.enrolment_id IS NULL;

-- Q5: Update one enrolment's grade
UPDATE enrolments
SET grade = 'B+'
WHERE student_id = 2 AND course_id = 1;

-- Check the update worked
SELECT s.first_name, c.title, e.grade
FROM enrolments e
JOIN students s ON s.student_id = e.student_id
JOIN courses  c ON c.course_id  = e.course_id
WHERE s.student_id = 2;