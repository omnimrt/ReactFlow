import PropTypes from "prop-types";
import { Handle } from "@xyflow/react"; // Don't forget to import Handle if it's used.
import { useStore } from "../store";

// Prop types for the Amp component
Amp.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    gain: PropTypes.number.isRequired,
  }).isRequired,
};

// Selector function to get update functions for the specific node
const selector = (id) => (store) => ({
  setGain: (e) => store.updateNode(id, { gain: +e.target.value }),
});

export default function Amp({ id, data }) {
  const { setGain } = useStore(selector(id));

  return (
    <div>
      <div>
        <p>Amp Node</p>

        <label>
          <span>Gain:</span>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="100"
            value={data.gain}
            onChange={setGain}
          />
          <span>{data.gain}</span>
        </label>
      </div>

      {/* Handle is used for connecting nodes */}
      <Handle type="source" position="bottom" />
      <Handle type="target" position="top" />
    </div>
  );
}
