import { Handle } from "@xyflow/react";
import { useStore } from "../store";
import PropTypes from "prop-types";

Out.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

const selector = (store) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

// eslint-disable-next-line no-unused-vars
export default function Out({ id, data }) {
  const { isRunning, toggleAudio } = useStore(selector);

  return (
    <div>
      <Handle type="target" position="top" />

      <div>
        <p>Output Node</p>

        <button onClick={toggleAudio}>
          {isRunning ? (
            <span role="img" aria-label="mute">
              🔇
            </span>
          ) : (
            <span role="img" aria-label="unmute">
              🔈
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
