import { useNavigate } from "react-router-dom";
import { useModuleStore } from "./IndividualSubjects";
import { PdfReader } from "../../../../../Components/PdfReader";
import styles from './styles.module.css'
const ModalPage = () => {
  /* const moduleID = useModuleStore((state) => state.moduleID);
  const setModuleID = useModuleStore((state) => state.setModuleID);
  const setModule = useModuleStore((state) => state.setModule);
  const modules = useModuleStore((state) => state.modules);
  const setModules = useModuleStore((state) => state.setModules); */
  const courseID = useModuleStore((state) => state.courseID);
  const module = useModuleStore((state) => state.module);



  const navigate = useNavigate();

  if (courseID === "") {
    navigate("/managecourses");
  }

  return (
    <div className={styles.modalPage}>
      <h1>{module.name}</h1>
      <div>
        <p>{module.description}</p>
        <a href={module.yt_link} target="_blank">YT Link : {module.yt_link}</a>
      </div>
      <PdfReader />
    </div>
  );
}

export default ModalPage