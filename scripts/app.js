const tbody = document.getElementById("tbody");

fetch("../instructions.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load JSON");
    }
    return response.json();
  })
  .then((data) => {
    renderTable(data);
  })
  .catch((err) => {
    console.error(err);
  });

function renderTable(instructions) {
  tbody.innerHTML = "";

  instructions.forEach((inst) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${inst.op_code ?? ""}</td>
        <td>${inst.mnemonic ?? ""}</td>
        <td>${inst.name ?? ""}</td>
        <td>${inst.format ?? ""}</td>
        <td>${inst.operands ?? ""}</td>
        <td>${renderFlags(inst)}</td>`;

    tbody.appendChild(tr);
  });
}

function renderFlags(inst) {
  const flags = [];

  if (inst.sets_conditionCode)
    flags.push(`<span class="flag-pill flag-cc" title="Sets Condition Code">CC</span>`);
  if (inst.is_privileged)
    flags.push(`<span class="flag-pill flag-priv" title="Privileged Instruction">P</span>`);
  if (inst.is_semiPrivileged)
    flags.push(`<span class="flag-pill flag-semi" title="Semi-Privileged Instruction">SP</span>`);
  if (inst.is_interruptible)
    flags.push(`<span class="flag-pill flag-int" title="Interruptible">INT</span>`);
  if (inst.is_interruptible)
    flags.push(`<span class="flag-pill flag-lCC" title="Loads New Condition Code">L-CC</span>`);

  return flags.join("");
}
