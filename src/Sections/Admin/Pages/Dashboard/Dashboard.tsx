import styles from "./Dashboard.module.css";

export const AdminDashboard = () => {
  return (
    <div className={styles.Wrapper}>
      <div>
        <h1>Pending Organizations</h1>
        <div>
          <button>Approve</button>
          <button>Decline</button>
        </div>
      </div>
      <div>
        <div data-v0-t="card">
          <div>
            <div>
              <h3>Acme Inc</h3>
              <p>acme@example.com</p>
            </div>
            <div>
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
              <ul>
                <li>Read</li>
                <li>Write</li>
                <li>Delete</li>
              </ul>
            </div>
          </div>
        </div>
        <div data-v0-t="card">
          <div>
            <div>
              <h3>Bolt Enterprises</h3>
              <p>bolt@example.com</p>
            </div>
            <div>
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
              <ul>
                <li>Read</li>
                <li>Write</li>
              </ul>
            </div>
          </div>
        </div>
        <div data-v0-t="card">
          <div>
            <div>
              <h3>Cloud Co</h3>
              <p>cloudco@example.com</p>
            </div>
            <div>
              <button>Approve</button>
              <button>Decline</button>
            </div>
          </div>

          <div>
            <h4>Contact Information</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
