import styles from "./Landing.module.css";
import Logo from "../../../Logo.png";
import { useNavigate } from "react-router-dom";
import  functionImgs  from "../assets/landingPgImgs/quizFunctionImg.png";

type Props = {};

export const Landing = (_props: Props) => {
  const navigate = useNavigate();
  const handleSignUP = async () => {
    navigate("/signup");
  };
  const handleLogin = async () => {
    navigate("/login");
  };

const Functionss =[
  {
    name:"Quiz",
    description:"A platform to check your knowledge and grabbing skills",
    image: <img src={functionImgs} alt="" />
  },
  {
    name:"Explore Subject",
    description:"Same course by different mentors",
    image: <img src={functionImgs} alt="" />
  }
]

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TopNavbar}>
        <img src={Logo} alt="" />
        <div className={styles.Registration}>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUP}>SignUp</button>
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        <h1>ElevatED an Educational platform</h1>
          <div className={styles.functionWrapper}>
         <h3>Functions</h3> 
         <div className={styles.functionWrapWrapper}>
         {Functionss.map(({image,name,description}) =>{
         return(
         <div className={styles.eachFunctionWrapper}>
            <h4>{name}</h4>
            <h5>{description}</h5>
         </div>
         );
         
         })
        }
        </div>

        </div>
        
      </div>
    </div>
  );
};
