let notes = JSON.parse(localStorage.getItem('notes')) || [];

function add_note() {
  const new_note = document.getElementById('add_new_note');
  new_note.innerHTML = `
    <input type="text" id="new_title" class="w-full m-3 p-3 text-4xl font-bold outline-none" placeholder="Enter a Title...">
    <textarea id="new_body" class="outline-none border-none m-3 p-3 text-lg w-full h-[calc(100vh-200px)] resize-none" placeholder="Type your notes here..."></textarea>
    <button onclick="save_note()" class="m-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-700">Save</button>
  `;
}

function edit_note(index) {
    let note = notes[index];
    const note_preview = document.getElementById('add_new_note');
    note_preview.innerHTML = `
    <textarea id="new_title" class="outline-none border-none m-3 p-3 text-4xl font-bold w-full resize-none">${note[0]}</textarea>
    <textarea id="new_body" class="outline-none border-none m-3 p-3 text-lg w-full h-[calc(100vh-250px)] resize-none">${note[1]}</textarea>
    <button onclick="save_note(${index})" class="m-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-700">Save</button>
  `;
}

function delete_node(index) {
    notes.splice(index, 1);
    update_notes();
}

function list_notes() {
    if (notes.length === 0) {
        all_notes_preview = document.getElementById('all_notes_preview');
        all_notes_preview.innerHTML = '<p class="m-6 text-sm">No notes yet. Click "Add Note" to get started!</p>';
    }

    notes.forEach((note, index) => {
        const note_preview = document.createElement('div');
        note_preview.className = 'bg-gray-300 flex flex-col m-3 mx-6 p-3';
        note_preview.innerHTML =  `
            <div class="bg-gray-300 flex flex-row justify-between">
                <h3 class="text-md"> ${note[0]} </h3>
                <button onclick = "event.stopPropagation(); delete_node(${index})" class="hover:opacity-70"> 🗑️ </button>
            </div>
                <p class="text-xs mt-3"> ${note[1]} </p>
        `
        note_preview.addEventListener('click', () => edit_note(index));

        const all_notes_preview = document.getElementById('all_notes_preview');
        all_notes_preview.appendChild(note_preview);
    })
}

function save_note(index = null) {
  const newTitle = document.getElementById('new_title').value.trim();
  const newBody = document.getElementById('new_body').value.trim();

  if (newTitle || newBody) {
    if(index == null) {
        notes.unshift([newTitle, newBody]);
        update_notes();
    } else {
        notes[index] = [newTitle, newBody];
        update_notes();
    }
  }
}

function update_notes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    console.log(notes);

    document.getElementById('add_new_note').innerHTML = '';
    document.getElementById('all_notes_preview').innerHTML = '';
    
    list_notes();
}

window.onload = () => {
  list_notes();
};