let state = JSON.parse(localStorage.getItem("state")) || {
    program: null,
    equipment: {},
    assessment: {},
    progress: {}
};

function saveState() {
    localStorage.setItem("state", JSON.stringify(state));
}

function selectProgram(type) {
    state.program = type;
    saveState();
    window.location.href = "quiz1.html";
}

function saveEquipment() {
    state.equipment.dipBar = document.getElementById("dipBar").checked;
    state.equipment.pullUpBar = document.getElementById("pullUpBar").checked;
    saveState();
    window.location.href = "quiz2.html";
}

function saveAssessment() {
    state.assessment.pushups = parseInt(document.getElementById("pushups").value);
    state.assessment.pullups = parseInt(document.getElementById("pullups").value);
    state.assessment.plank = parseInt(document.getElementById("plank").value);
    generateWorkout();
    saveState();
    window.location.href = "workout.html";
}

function generateWorkout() {
    let workout = [];

    if (state.program === "ppl") {
        workout = [
            {name: "Dips", sets: 3, reps: 8},
            {name: "Decline Pushups", sets: 3, reps: 10},
            {name: "Archer Pushups", sets: 3, reps: 6}
        ];
    }

    state.currentWorkout = workout;
}

function renderWorkout() {
    let container = document.getElementById("workoutList");
    if (!container || !state.currentWorkout) return;

    container.innerHTML = "";

    state.currentWorkout.forEach(ex => {
        container.innerHTML += `
        <div class="card">
            <div>
                <strong>${ex.name}</strong><br>
                ${ex.sets} sets × ${ex.reps} reps
            </div>
        </div>
        `;
    });
}

function renderProgress() {
    let container = document.getElementById("progressList");
    if (!container) return;

    container.innerHTML = `
    <div class="card">
        Pushups: ${state.assessment.pushups}
    </div>
    <div class="card">
        Pullups: ${state.assessment.pullups}
    </div>
    <div class="card">
        Plank: ${state.assessment.plank} sec
    </div>
    `;
}

renderWorkout();
renderProgress();
