import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../../../utils/supabase";
import AddModuleModal from "./addModuleModal";
import styles from "../index.module.css";
import { create } from "zustand";

type ModuleStoreType = {
  moduleID: number;
  setModuleID: (moduleID: number) => void;
  courseID: string;
  setCourseID: (courseID: string) => void;
  modules: CoursesDB["modules"];
  setModules: (modules: CoursesDB["modules"]) => void;
  module: any;
  setModule: (module: any) => void;
}

export const useModuleStore = create<ModuleStoreType>((set) => ({
  moduleID: 0,
  setModuleID: (moduleID) => set({ moduleID }),
  courseID: "",
  setCourseID: (courseID) => set({ courseID }),
  modules: [],
  setModules: (modules) => set({ modules }),
  module: {},
  setModule: (module) => set({ module }),
}));

export const IndividualSubjects = () => {
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<CoursesDB>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const moduleID = useModuleStore((state) => state.moduleID);
  const setModuleID = useModuleStore((state) => state.setModuleID);
  const setCourseID = useModuleStore((state) => state.setCourseID);
  const setModule = useModuleStore((state) => state.setModule);
  const setModules = useModuleStore((state) => state.setModules);
  const navigate = useNavigate();

  setCourseID(id!);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    let { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      throw error.message;
    } else if (courses) {
      setData(courses);
      return courses;
    }
  };
  return (
    <div>
      <div>
        <h1 className={styles.courseHeading}>{data?.name}</h1>
        <div className={styles.courseHeadingWrapper}>
          {data?.modules?.map((module) => (
            <div key={module.id} className={styles.Individual} onClick={() => {
              setModule(module);
              setModuleID(module.id);
              setModules(data?.modules!);
              navigate(`/managecourses/module`);
            }}>
              
              <button
                onClick={() => {
                  setIsEdit(true);
                  setModuleID(module.id);
                }}
              >
                Edit
              </button>
              <div className={styles.moduleInfo}>
                <h4>{module.name}</h4>
                <div className={styles.moduleLink}>
                  <h4>Link:- </h4>
                  <span>{module.yt_link}</span>
                </div>
                <p>{module.description}</p>
              </div>
            </div>
          ))}
          <AddModuleModal
            isOpen={isEdit}
            onClose={() => setIsEdit(false)}
            refresh={() => setRefresh(!refresh)}
            id={id!}
            moduleID={moduleID}
            modules={data?.modules!}
            isEdit={isEdit}
          />
        </div>
      </div>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Add a Module</button>
        <AddModuleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refresh={() => setRefresh(!refresh)}
          id={id!}
          modules={data?.modules!}
          isEdit={false}
        />
      </div>
    </div>
  );
};
