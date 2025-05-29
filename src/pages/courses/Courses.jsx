import React from 'react';
import './courses.css';
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';

const Courses = () => {
  const { courses } = CourseData();

  return (
    <section className="courses-section">
      <header className="courses-header">
        <h2>Explore Our Courses</h2>
        <p>Unlock your potential with expert-led courses crafted just for you.</p>
      </header>

      <div className="courses-grid">
        {courses && courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p className="no-courses">No Courses Available Yet</p>
        )}
      </div>
    </section>
  );
};

export default Courses;
