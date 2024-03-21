import styles from "./index.module.css";
import { VideoSvg } from "./svg";

type Props = {};

export const DetailCourse = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
      <h1>DataBase Management System</h1>
      <div>
        <div>
          <h3>By Antony Davis</h3>
          <p>
            Pre-requisites : <button>MongoDB Query Language</button>{" "}
          </p>
        </div>
        <button>Join</button>
      </div>
      <div>
        <div>
          <p>All</p>
          <p>Created : 23 Oct 2024</p>
        </div>
        <div>
          {" "}
          <div>
            <button>
              <h3>Module 1</h3>
              <div>
                <p>PDF</p>
                <p>Quiz</p>
              </div>
            </button>{" "}
            <button>
              <h3>Module 2</h3>
              <div>
                <p>Videos</p>
                <p>Quiz</p>
              </div>
            </button>{" "}
            <button>
              <h3>Module 3</h3>
              <div>
                <p>PDF</p>
              </div>
            </button>{" "}
            <button>
              <h3>Module 4</h3>
              <div>
                <p>PDF</p>
                <p>Videos</p>
              </div>
            </button>
            <button>
              <h3>Module 5</h3>
              <div>
                <p>PDF</p>
                <p>Quiz</p>
              </div>
            </button>
          </div>
          <div>
            <div>
              <h2>Module 1</h2>
              <div>
                <p>Edit</p>
                <button>+</button>
              </div>
            </div>
            <div>
              <button>
                <VideoSvg />
                <p>Video 1</p>
              </button>
              <button>
                {" "}
                <VideoSvg />
                <p>Video 2</p>
              </button>
              <button>
                <VideoSvg />
                <p>Video 3</p>
              </button>
              <button>
                {" "}
                <VideoSvg />
                <p>Video 4</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
