import React, { useEffect } from "react";
import AddCourseModal from "./components/addCourseModal";
import { supabase } from "../../../../utils/supabase";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

export const Subjects = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [data, setData] = React.useState<CoursesDB[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      let { data: courses, error } = await supabase
        .from("courses")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        throw error.message;
      } else if (courses) {
        setData(courses);
        return courses;
      }
    } else {
      throw "User not found, please login again";
    }
  };

  return (
    <div className={styles.Wrapper}>
      <div>
        <h1>Courses</h1>
        <div className={styles.container}>
          {data.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/managecourses/${course.id}`)}
              className={styles.Individual}
            >
              {course.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Add a course</button>
        <AddCourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refresh={() => setRefresh(!refresh)}
        />
      </div>
    </div>
  );
};
