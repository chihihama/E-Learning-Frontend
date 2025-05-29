import React from 'react';
import "./dashbord.css";
import { CourseData } from '../../context/CourseContext';
import CourseCard from '../../components/coursecard/CourseCard';

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className='student-dashboard'>
      <h2>Purchased Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="no-courses">No courses yet</p>
        )}
      </div>
    </div>
  );
};

export default Dashbord;
