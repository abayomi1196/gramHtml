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
const { getValue: getIngestion, setValue: setIngestion } = useState([]);
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
        function edit(editedIngestion) {
            console.log("editing");
            const selectedIngestion = getIngestion().find((item) => item.id === ingestion.id);
            const newIngestions = getIngestion().map((item) => {
                if (item.id === selectedIngestion.id) {
                    return { ...selectedIngestion, ...editedIngestion };
                }
                else {
                    return item;
                }
            });
            setIngestion(newIngestions);
        }
        return `
      <div key="${ingestion.id}" class="ingest-container grid gap-4 py-1 mb-2">
        <input 
          type="text"
          id="offset" 
          placeholder="0m" 
          value="${ingestion.offset}"
          onchange="${function handleChange(event) {
            console.log((event?.target).value);
            // edit({ offset: (event?.target as HTMLInputElement).value });
        }}
          handleChange(event)
          "
          required
        />

        <input
          type="text"
          id="drug-name"
          list="known-drugs"
          style="border-width: 3px"
          placeholder="Caffeine"
          value="${ingestion.drugName}"
          onchange="${function handleChange(e) {
            const knownHalfLife = knownDrugs[e.target.value];
            // edit({
            //   halfLife: knownHalfLife ? knownHalfLife : ingestion.halfLife,
            //   drugName: (e.target as HTMLInputElement).value
            // });
        }}
          handleChange(e)
          "
          required
        />

        <input
          type="text"
          value="${ingestion.dosage}"
          placeholder="0mg"
          id="dosage"
          onchange="${function handleChange(e) {
            // edit({ dosage: (e.target as HTMLInputElement).value });
        }}
          handleChange(e)
          "
          required
        />

        <input
          type="text"
          id="half-life"
          placeholder="4.5h"
          value="${ingestion.halfLife}"
          onchange="${function (e) {
            // edit({ halfLife: (e.target as HTMLInputElement).value });
        }}
          handleChange(e)
          "
          required
        />

        <button
          class="trash"
          tabindex="-1"
          onclick="${function handleClick(index) {
            const copy = [...getIngestion()];
            copy.splice(index, 1);
            setIngestion(copy);
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
        console.log("editing");
        const selectedIngestion = getIngestion().find((item) => item.id === ingestion.id);
        const newIngestions = getIngestion().map((item) => {
            if (item.id === selectedIngestion.id) {
                return { ...selectedIngestion, ...editedIngestion };
            }
            else {
                return item;
            }
        });
        setIngestion(newIngestions);
    }
    return `
      <div key="${ingestion.id}" class="ingest-container grid gap-4 py-1">
        <input 
          type="text"
          id="offset" 
          placeholder="0m" 
          value="${ingestion.offset}"
          onchange="${function handleChange(event) {
        console.log((event?.target).value);
        // edit({ offset: (event?.target as HTMLInputElement).value });
    }}
          handleChange(event)
          "
          required
        />

        <input
          type="text"
          id="drug-name"
          list="known-drugs"
          style="border-width: 3px"
          placeholder="Caffeine"
          value="${ingestion.drugName}"
          onchange="${function handleChange(event) {
        const knownHalfLife = knownDrugs[event.target.value];
        // edit({
        //   halfLife: knownHalfLife ? knownHalfLife : ingestion.halfLife,
        //   drugName: (event.target as HTMLInputElement).value
        // });
    }}
          handleChange(event)
          "
          required
        />

        <input
          type="text"
          value="${ingestion.dosage}"
          placeholder="0mg"
          id="dosage"
          onchange="${function handleChange(e) {
        // edit({ dosage: (e.target as HTMLInputElement).value });
    }}
          handleChange(event)
          "
          required
        />

        <input
          type="text"
          id="half-life"
          placeholder="4.5h"
          value="${ingestion.halfLife}"
          onchange="${function handleChange(e) {
        // edit({ halfLife: (e.target as HTMLInputElement).value });
    }}
          handleChange(event)
          "
          required
        />

        <button
          class="trash"
          tabindex="-1"
          onclick="${function handleClick(index) {
        const copy = [...getIngestion()];
        copy.splice(index, 1);
        setIngestion(copy);
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
