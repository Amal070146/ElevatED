import styles from "./Organisation.module.css";

type Props = {};

export const Organisation = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <h1>Pending Organizations</h1>
        <div>
          <button>Approve All</button>
          <button>Decline All</button>
        </div>
      </div>
      <div className={styles.Organisations}>
        <div className={styles.Individuals}>
          <div className={styles.Top}>
            <div>
              <h3>Acme Inc</h3>
              <p>acme@example.com</p>
            </div>
            <div className={styles.ButtonWrapper}>
              <button>Approve</button>
              <button>Decline</button>
            </div>
          </div>

          <div>
            <div>
              <h4>Contact Information</h4>
              <p>John Doe (123) 456-7890</p>
            </div>
            <div>
              <h4>Requested Permissions</h4>
              <p>For Organisation</p>
            </div>
          </div>
        </div>
        <div className={styles.Individuals}>
          <div className={styles.Top}>
            <div>
              <h3>Bolt Enterprises</h3>
              <p>bolt@example.com</p>
            </div>
            <div className={styles.ButtonWrapper}>
              <button>Approve</button>
              <button>Decline</button>
            </div>
          </div>

          <div>
            <div>
              <h4>Contact Information</h4>
              <p>Jane Smith (987) 654-3210</p>
            </div>
            <div>
              <h4>Requested Permissions</h4>
              <p>For Organisation</p>
            </div>
          </div>
        </div>
        <div className={styles.Individuals}>
          <div className={styles.Top}>
            <div>
              <h3>Cloud Co</h3>
              <p>cloudco@example.com</p>
            </div>
            <div className={styles.ButtonWrapper}>
              <button>Approve</button>
              <button>Decline</button>
            </div>
          </div>

          <div>
            <div>
              <h4>Contact Information</h4>
              <p>Jane Smith (987) 654-3210</p>
            </div>
            <div>
              <h4>Requested Permissions</h4>
              <p>For Organisation</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Header}>
        <h1>Accepted Organizations</h1>

        <button>Decline All</button>
      </div>
      <div className={styles.Organisations}>
        <div className={styles.Individuals}>
          <div className={styles.Top}>
            <div>
              <h3>Acme Inc</h3>
              <p>acme@example.com</p>
            </div>
            <button>Decline</button>
          </div>

          <div>
            <div>
              <h4>Contact Information</h4>
              <p>John Doe (123) 456-7890</p>
            </div>
            <div>
              <h4>Requested Permissions</h4>
              <p>For Organisation</p>
            </div>
          </div>
        </div>
        <div className={styles.Individuals}>
          <div className={styles.Top}>
            <div>
              <h3>Bolt Enterprises</h3>
              <p>bolt@example.com</p>
            </div>
            <button>Decline</button>
          </div>

          <div>
            <div>
              <h4>Contact Information</h4>
              <p>Jane Smith (987) 654-3210</p>
            </div>
            <div>
              <h4>Requested Permissions</h4>
              <p>For Organisation</p>
            </div>
          </div>
        </div>
        <div className={styles.Individuals}>
          <div className={styles.Top}>
            <div>
              <h3>Cloud Co</h3>
              <p>cloudco@example.com</p>
            </div>
            <button>Decline</button>
          </div>

          <div>
            <div>
              <h4>Contact Information</h4>
              <p>Jane Smith (987) 654-3210</p>
            </div>
            <div>
              <h4>Requested Permissions</h4>
              <p>For Organisation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
