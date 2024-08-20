import { Handle } from "@xyflow/react";
import { useStore } from "../store";
import PropTypes from "prop-types";

Osc.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

// Selector function to get update functions for the specific node
const selector = (id) => (store) => ({
  setFrequency: (e) => store.updateNode(id, { frequency: +e.target.value }),
  setType: (e) => store.updateNode(id, { type: e.target.value }),
});

export default function Osc({ id, data }) {
  const { setFrequency, setType } = useStore(selector(id));

  return (
    <div>
      <div>
        <p>Oscillator Node</p>

        <label>
          <span>Frequency:</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={data.frequency}
            onChange={setFrequency}
          />
          <span>{data.frequency}Hz</span>
        </label>

        <label>
          <span>Waveform:</span>
          <select className="nodrag" value={data.type} onChange={setType}>
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label>
      </div>

      {/* Handle is used for connecting nodes */}
      <Handle type="source" position="bottom" />
    </div>
  );
}
