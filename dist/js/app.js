"use strict";
// import ColorHash from "color-hash";
// custom functions
const emptyIngestion = () => {
    return {
        offset: "0min",
        drugName: "",
        halfLife: "",
        dosage: "",
        id: Math.random().toString()
    };
};
// custom hooks
function useState(defaultValue) {
    let value = defaultValue;
    function getValue() {
        return value;
    }
    function setValue(newValue) {
        value = newValue;
        customRender();
    }
    return { getValue, setValue };
}
// constants
// const drugColor = new ColorHash({ lightness: 0.5 });
const knownDrugs = {
    Amphetamine: "10h",
    Caffeine: "5h",
    LSD: "5.1h",
    Alprazolam: "12h",
    Atorvastatin: "7h",
    Hydrocodone: "3.8h",
    Metaprolol: "3.5h",
    Gabapentin: "6h",
    Sertraline: "26h"
};
// "state"
const { getValue: getIngestion, setValue: setIngestion } = useState([emptyIngestion()]);
// elements
const knownDrugsEl = document.getElementById("known-drugs");
const ingestionsWrappersEl = document.getElementById("ingestions-wrapper");
const knownDrugsHTML = Object.keys(knownDrugs)
    .map((key) => {
    return `
    <option key={${key}} value={${key}}>
    ${knownDrugs[key]}
    </option>
  `;
})
    .join("");
knownDrugsEl.innerHTML = knownDrugsHTML;
function customRender() {
    ingestionsWrappersEl.innerHTML = getIngestion()
        .map((ingestion, index) => {
        console.log(index);
        function edit(editedIngestion) {
            const newIngestions = [...getIngestion()];
            newIngestions[index] = {
                ...ingestion,
                ...editedIngestion
            };
            setIngestion(newIngestions);
        }
        return `
      <div key="${ingestion.id}" class="ingest-container grid gap-4 py-1 mb-2">
        <input 
          type="text"
          id="offset" 
          placeholder="0m" 
          value="${ingestion.offset}"
          onchange="${(e) => {
            edit({ offset: e.target.value });
        }}" 
          required
        />

        <input
          type="text"
          id="drug-name"
          list="known-drugs"
          style="border-width: 3px"
          placeholder="Caffeine"
          value="${ingestion.drugName}"
          onchange="${(e) => {
            const knownHalfLife = knownDrugs[e.target.value];
            edit({
                halfLife: knownHalfLife ? knownHalfLife : ingestion.halfLife,
                drugName: e.target.value
            });
        }}"
          required
        />

        <input
          type="text"
          value="${ingestion.dosage}"
          placeholder="0mg"
          id="dosage"
          onchange="${(e) => edit({ dosage: e.target.value })}"
          required
        />

        <input
          type="text"
          id="half-life"
          placeholder="4.5h"
          value="${ingestion.halfLife}"
          onchange="${(e) => edit({ halfLife: e.target.value })}"
          required
        />

        <button
          class="trash"
          tabindex="-1"
          onclick="${function handleClick(index) {
            const copy = [...getIngestion()];
            copy.splice(index, 1);
            console.log(JSON.stringify(getIngestion()), JSON.stringify(copy));
            setIngestion([]);
        }}
          handleClick(${index})
          "
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
    })
        .join("");
}
const ingestionsHTML = getIngestion()
    .map((ingestion, index) => {
    function edit(editedIngestion) {
        const newIngestions = [...getIngestion()];
        newIngestions[index] = {
            ...ingestion,
            ...editedIngestion
        };
        setIngestion(newIngestions);
    }
    return `
      <div key="${ingestion.id}" class="ingest-container grid gap-4 py-1">
        <input 
          type="text"
          id="offset" 
          placeholder="0m" 
          value="${ingestion.offset}"
          onchange="${(e) => {
        edit({ offset: e.target.value });
    }}" 
          required
        />

        <input
          type="text"
          id="drug-name"
          list="known-drugs"
          style="border-width: 3px"
          placeholder="Caffeine"
          value="${ingestion.drugName}"
          onchange="${(e) => {
        const knownHalfLife = knownDrugs[e.target.value];
        edit({
            halfLife: knownHalfLife ? knownHalfLife : ingestion.halfLife,
            drugName: e.target.value
        });
    }}"
          required
        />

        <input
          type="text"
          value="${ingestion.dosage}"
          placeholder="0mg"
          id="dosage"
          onchange="${(e) => edit({ dosage: e.target.value })}"
          required
        />

        <input
          type="text"
          id="half-life"
          placeholder="4.5h"
          value="${ingestion.halfLife}"
          onchange="${(e) => edit({ halfLife: e.target.value })}"
          required
        />

        <button
          class="trash"
          tabindex="-1"
          onclick="${function handleClick(index) {
        const copy = [...getIngestion()];
        copy.splice(index, 1);
        console.log(JSON.stringify(getIngestion()), JSON.stringify(copy));
        setIngestion([]);
    }}
          handleClick(${index})
          "
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;
})
    .join("");
ingestionsWrappersEl.innerHTML = ingestionsHTML;
